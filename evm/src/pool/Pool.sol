// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import { LendingPoolCore } from './LendingPoolCore.sol';
import { MockPriceOracle } from './PriceOracle.sol';

contract Pool {
  LendingPoolCore public core;
  MockPriceOracle public oracle;

  // user => token => borrowed amount
  mapping(address => mapping(address => uint256)) public userBorrows;

  uint256 public constant COLLATERAL_FACTOR = 7500; // 75% in basis points
  uint256 public constant LIQUIDATION_BONUS = 10500; // 5% bonus
  uint256 public constant LIQUIDATION_THRESHOLD =8000; // 80% in basis points

  event Deposit(address indexed user, address indexed token, uint256 amount);
  event Borrow(address indexed user, address indexed token, uint256 amount);
  event Repay(address indexed user, address indexed token, uint256 amount);
  event Withdraw(address indexed user, address indexed token, uint256 amount);
  event Liquidate(
      address indexed liquidator,
      address indexed user,
      address indexed token,
      uint256 repaidAmount,
      uint256 collateralSeized
  );

   modifier validToken(address _token) {
    require(_token == core.XRP_ADDRESS() || _token == core.cbxToken(), 'Invalid token');
    _;
  }

  constructor(address _core, address _oracle) {
    core = LendingPoolCore(payable(_core));
    oracle = MockPriceOracle(_oracle);
  }

  function getOppositeToken(address _token) internal view returns (address) {
    return _token == core.XRP_ADDRESS() ? core.cbxToken() : core.XRP_ADDRESS();
  }

    function validateXrpAmount(address _token, uint256 _amount) internal view {
      if (_token == core.XRP_ADDRESS()) {
        require(msg.value == _amount, 'XRP amount mismatch');
      } else {
        require(msg.value == 0, 'XRP not accepted for token operations');
      }
  }

    function deposit(address _token, uint256 _amount, address _from) external payable validToken(_token) {
      validateXrpAmount(_token, _amount);
      core.deposit{value: msg.value}(_token, _amount, _from);
      emit Deposit(_from, _token, _amount);
    }

    function borrow(address _token, uint256 _amount) external validToken(_token) {
      address collateralToken = getOppositeToken(_token);
      uint256 collateral = core.getUserDeposit(collateralToken, msg.sender);
      
      uint256 collateralPrice = oracle.getAssetPrice(collateralToken);
      uint256 borrowPrice = oracle.getAssetPrice(_token);
      
      uint256 collateralValue = (collateral * collateralPrice) / 1e18;
      uint256 maxBorrow = (collateralValue * COLLATERAL_FACTOR) / 10000;
      
      uint256 newBorrow = userBorrows[msg.sender][_token] + _amount;
      uint256 newBorrowValue = (newBorrow * borrowPrice) / 1e18;
      
      require(newBorrowValue <= maxBorrow, 'Exceeds collateral factor');
      
      userBorrows[msg.sender][_token] = newBorrow;
      core.transferToken(_token, msg.sender, _amount);
      
      emit Borrow(msg.sender, _token, _amount);
    }

    function repay(address _token, uint256 _amount) external payable validToken(_token) {
      require(userBorrows[msg.sender][_token] >= _amount, 'Too much');
      core.transferTokenFrom{value: msg.value}(_token, msg.sender, address(core), _amount);
      userBorrows[msg.sender][_token] -= _amount;
      emit Repay(msg.sender, _token, _amount);
    }

    function withdraw(address _token, uint256 _amount) external validToken(_token) {
      address borrowToken = getOppositeToken(_token);
      uint256 borrowed = userBorrows[msg.sender][borrowToken];
      uint256 remaining = core.getUserDeposit(_token, msg.sender) - _amount;
      
      uint256 tokenPrice = oracle.getAssetPrice(_token);
      uint256 borrowPrice = oracle.getAssetPrice(borrowToken);
      
      uint256 collateralValue = (remaining * tokenPrice) / 1e18;
      uint256 borrowValue = (borrowed * borrowPrice) / 1e18;
      
      require(collateralValue * COLLATERAL_FACTOR / 10000 >= borrowValue, 'Would undercollateralize');
      
      core.withdraw(_token, _amount);
      emit Withdraw(msg.sender, _token, _amount);
    }

    function getHealthFactor(address _user, address _token) public view validToken(_token) returns (uint256) {
      address collateralToken = getOppositeToken(_token);
      uint256 collateral = core.getUserDeposit(collateralToken, _user);
      uint256 debt = userBorrows[_user][_token];
      
      if (debt == 0) return type(uint256).max;
      
      uint256 collateralPrice = oracle.getAssetPrice(collateralToken);
      uint256 debtPrice = oracle.getAssetPrice(_token);
      
      uint256 collateralValue = (collateral * collateralPrice) / 1e18;
      uint256 debtValue = (debt * debtPrice) / 1e18;
      
      return (collateralValue * COLLATERAL_FACTOR) / debtValue;
    }

    function liquidate(address _user, address _token, uint256 _repayAmount) external payable validToken(_token) {
      require(getHealthFactor(_user, _token) < 1e18, 'Health factor ok');
      
      uint256 debt = userBorrows[_user][_token];
      require(_repayAmount <= debt, 'Too much');
      
      core.transferTokenFrom{value: msg.value}(_token, msg.sender, address(core), _repayAmount);
      
      uint256 price = oracle.getAssetPrice(_token);
      uint256 repayValue = (_repayAmount * price) / 1e18;
      
      address collateralToken = getOppositeToken(_token);
      uint256 collateralToSeize = (repayValue * LIQUIDATION_BONUS) / price;
      
      userBorrows[_user][_token] -= _repayAmount;
      core.reduceUserDeposit(collateralToken, _user, collateralToSeize);
      core.transferToken(collateralToken, msg.sender, collateralToSeize);
      
      emit Liquidate(msg.sender, _user, _token, _repayAmount, collateralToSeize);
    }

  // Allow contract to receive XRP
  receive() external payable {}
}
