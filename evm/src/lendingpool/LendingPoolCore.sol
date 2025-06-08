// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import { Ownable } from '../../lib/openzeppelin-contracts/contracts/access/Ownable.sol';
import { IERC20 } from '../../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol';

contract LendingPoolCore is Ownable {
  address public constant XRP_ADDRESS = address(0);
  address public immutable cbxToken;

  mapping(address => bool) public isWhitelisted;

  struct ReserveData {
    uint256 totalLiquidity;
    uint256 totalBorrows;
    uint256 liquidityRate; // fixed interest rate in basis points (e.g. 500 = 5%)
    mapping(address => uint256) userDeposits;
  }

  mapping(address => ReserveData) public reserves; // token => reserve data

  event Deposit(address indexed user, address indexed token, uint256 amount);
  event Withdraw(address indexed user, address indexed token, uint256 amount);
  event AddressWhitelisted(address indexed account);
  event AddressRemovedFromWhitelist(address indexed account);

  modifier validToken(address _token) {
    require(_token == XRP_ADDRESS || _token == cbxToken, 'Invalid token');
    _;
  }

  modifier onlyWhitelisted() {
    require(isWhitelisted[msg.sender] || msg.sender == owner(), 'Caller is not whitelisted');
    _;
  }

  constructor(address _cbxToken) Ownable(msg.sender) {
    cbxToken = _cbxToken;

    // Initialize reserves for both XRP and CBX
    ReserveData storage xrpReserve = reserves[XRP_ADDRESS];
    xrpReserve.totalLiquidity = 0;
    xrpReserve.totalBorrows = 0;
    xrpReserve.liquidityRate = 500; // 5% default rate

    ReserveData storage cbxReserve = reserves[cbxToken];
    cbxReserve.totalLiquidity = 0;
    cbxReserve.totalBorrows = 0;
    cbxReserve.liquidityRate = 500; // 5% default rate

    // Whitelist the owner by default
    isWhitelisted[msg.sender] = true;
    emit AddressWhitelisted(msg.sender);
  }

  /**
   * @dev Add an address to the whitelist
   * @param _address The address to add to the whitelist
   */
  function addToWhitelist(address _address) external onlyOwner {
    require(!isWhitelisted[_address], 'Address already whitelisted');
    isWhitelisted[_address] = true;
    emit AddressWhitelisted(_address);
  }

  /**
   * @dev Remove an address from the whitelist
   * @param _address The address to remove from the whitelist
   */
  function removeFromWhitelist(address _address) external onlyOwner {
    require(isWhitelisted[_address], 'Address is not whitelisted');
    require(_address != owner(), 'Cannot remove owner from whitelist');
    isWhitelisted[_address] = false;
    emit AddressRemovedFromWhitelist(_address);
  }

  /**
   * @dev Transfer tokens from the reserve to a recipient
   * @param _token The token to transfer
   * @param _to The recipient address
   * @param _amount The amount of tokens to transfer
   */
  function transferToken(address _token, address _to, uint256 _amount) external validToken(_token) payable onlyWhitelisted {
    require(_amount > 0, 'Amount must be greater than 0');
    ReserveData storage reserve = reserves[_token];
    require(reserve.totalLiquidity >= _amount, 'Insufficient liquidity');

    reserve.totalLiquidity -= _amount;

    if (_token == XRP_ADDRESS) {
      (bool success, ) = _to.call{ value: _amount }('');
      require(success, 'Transfer failed');
    } else {
      IERC20(_token).transfer(_to, _amount);
    }
  }

  /**
   * @dev Transfer tokens from a user's account to a recipient
   * @param _token The token to transfer
   * @param _from The address to transfer from
   * @param _to The recipient address
   * @param _amount The amount of tokens to transfer
   */
  function transferTokenFrom(address _token, address _from, address _to, uint256 _amount) external validToken(_token) payable onlyWhitelisted {
    require(_amount > 0, 'Amount must be greater than 0');

    if (_token == XRP_ADDRESS) {
      require(msg.value == _amount, 'Invalid amount');
    } else {
      require(msg.value == 0, 'XRP transfer not allowed');
      IERC20(_token).transferFrom(_from, _to, _amount);
    }

    ReserveData storage reserve = reserves[_token];
    reserve.totalLiquidity -= _amount;
  }

  /**
   * @dev Deposit tokens into the reserve
   * @param _token The token to deposit
   * @param _amount The amount of tokens to deposit
   * @param _from The address to deposit from
   */
  function deposit(address _token, uint256 _amount, address _from) external payable validToken(_token) onlyWhitelisted {
        require(_amount > 0, 'Amount must be > 0');
        
        ReserveData storage reserve = reserves[_token];

        if (_token == XRP_ADDRESS) {
            require(msg.value == _amount, 'XRP amount mismatch');
        } else {
            require(msg.value == 0, 'XRP not accepted for token deposits');
            IERC20(_token).transferFrom(_from, address(this), _amount);
        }

        reserve.totalLiquidity += _amount;
        reserve.userDeposits[_from] += _amount;

        emit Deposit(_from, _token, _amount);
    }

  /**
   * @dev Withdraw tokens from the reserve
   * @param _token The token to withdraw
   * @param _amount The amount of tokens to withdraw
   */
    function withdraw(address _token, uint256 _amount) external validToken(_token) onlyWhitelisted {
        ReserveData storage reserve = reserves[_token];
        uint256 userBalance = reserve.userDeposits[tx.origin];

        require(_amount > 0 && _amount <= userBalance, 'Invalid amount');

        reserve.totalLiquidity -= _amount;
        reserve.userDeposits[tx.origin] -= _amount;

        if (_token == XRP_ADDRESS) {
            (bool success, ) = tx.origin.call{value: _amount}('');
            require(success, 'XRP transfer failed');
        } else {
            IERC20(_token).transfer(tx.origin, _amount);
        }

        emit Withdraw(tx.origin, _token, _amount);
    }

    /**
     * @dev Get the user's deposit for a specific token
     * @param _token The token to check
     * @param _user The user to check
     */
    function getUserDeposit(address _token, address _user) external view validToken(_token) returns (uint256) {
        return reserves[_token].userDeposits[_user];
    }

    /**
     * @dev Set the liquidity rate for a specific token
     * @param _token The token to set the liquidity rate for
     * @param _rate The new liquidity rate
     */
    function setLiquidityRate(address _token, uint256 _rate) external validToken(_token) {
        reserves[_token].liquidityRate = _rate;
    }

    /**
     * @dev Reduce a user's deposit for a specific token
     * @param _token The token to reduce the deposit for
     * @param _user The user to reduce the deposit for
     * @param _amount The amount to reduce the deposit by
     */
    function reduceUserDeposit(address _token, address _user, uint256 _amount) external validToken(_token) onlyWhitelisted {
        ReserveData storage reserve = reserves[_token];
        require(reserve.userDeposits[_user] >= _amount, 'Insufficient deposit');
        
        reserve.totalLiquidity -= _amount;
        reserve.userDeposits[_user] -= _amount;
    }

    // Allow contract to receive ETH
    receive() external payable {}
}
