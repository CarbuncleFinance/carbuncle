// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import { ERC20 } from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import { Math } from "lib/openzeppelin-contracts/contracts/utils/math/Math.sol";
import { ReflectionMath } from "./libs/ReflectionMath.sol";
import { ReflectionCalculator } from "./libs/ReflectionCalculator.sol";
import { IrCBX } from "./interfaces/IrCBX.sol";

/**
BOOTING... [rCBX_CORE]

[ OK ] Loading Solidity Engine
[ OK ] Initializing Carbuncle Reflector
[ OK ] Syncing XRPL EVM
[ OK ] Reflection Layer: ENABLED
[ OK ] Token Distribution Queue: ACTIVE

█▀▀ █▀█ █▀▀ █▄▄ █   █ █▀▀ █░█ █░░ █░░  
█▄▄ █▄█ ██▄ █▄█ █▄▄ █ ██▄ █▄█ █▄▄ █▄▄  

rCBX Token Ready.
Power Level: ✦✦✦✦✦
Emit Sparkles. Execute Brilliance.
*/
contract rCBX is ERC20, Ownable, IrCBX {
    using Math for uint256;
    using ReflectionMath for uint256;
    using ReflectionCalculator for uint256;

    // ==============================
    // Token basic information
    // ==============================
    string private constant TOKEN_NAME = 'rCBX';
    string private constant TOKEN_SYMBOL = 'rCBX';
    uint8 private constant DECIMALS = 18;
    uint256 private constant MAX = ~uint256(0);
    uint256 private constant FEE_LIMIT = 10;
    uint256 private constant PERCENT_DIVISOR = 100;

    // ==============================
    // Reflection storage
    // ==============================
    uint256 private _totalSupply = 10**9 * (10 ** DECIMALS); // Total supply
    uint256 private _reflectedSupply = (MAX - (MAX % _totalSupply)); // Reflected supply for reflection mechanism
    uint256 private _totalFeeCollected; // Cumulative fee collected

    // ==============================
    // Balance management per address
    // ==============================
    mapping(address => uint256) private _reflectedBalances; // Reflected balances
    mapping(address => uint256) private _actualBalances;    // Actual balances (for excluded addresses)

    // ==============================
    // Fee, limit, and exclusion management
    // ==============================
    uint8 private _taxFeePercent = 5; // Fee rate (%)
    uint8 private _previousTaxFeePercent = _taxFeePercent; // For temporary storage
    uint256 private _maxTxAmount = _totalSupply / PERCENT_DIVISOR; // Max transaction amount

    address[] private _excludedFromReward; // List of addresses excluded from reward
    mapping (address => bool) private _isExcludedFromReward; // Exclusion flag for reward
    mapping (address => bool) private _isExcludedFromFee;    // Exclusion flag for fee

    constructor () ERC20(TOKEN_NAME, TOKEN_SYMBOL) Ownable(msg.sender) {
        _reflectedBalances[_msgSender()] = _reflectedSupply;

        // Exclude owner and contract itself from fee
        _isExcludedFromFee[owner()] = true;
        _isExcludedFromFee[address(this)] = true;

        // _mint is only called here in ERC20
        _mint(owner(), _totalSupply);
    }

    // ==============================
    // Owner-only functions
    // ==============================

    function setTaxFeePercent(uint8 taxFeePercent) external onlyOwner() {
        require(taxFeePercent <= FEE_LIMIT, "Fees are too high");
        _taxFeePercent = taxFeePercent;
    }

    function setMaxTxPercent(uint256 maxTxPercent) external onlyOwner() {
        _maxTxAmount = (_totalSupply * maxTxPercent) / PERCENT_DIVISOR;
    }

    function excludeFromReward(address account) external onlyOwner() {
        require(!_isExcludedFromReward[account], "Account is already excluded");
        if(_reflectedBalances[account] > 0) {
            _actualBalances[account] = tokenFromReflection(_reflectedBalances[account]);
        }
        _isExcludedFromReward[account] = true;
        _excludedFromReward.push(account);
    }

    function includeInReward(address account) public onlyOwner() {
        require(_isExcludedFromReward[account], "Account is not excluded");
        for (uint256 i = 0; i < _excludedFromReward.length; i++) {
            if (_excludedFromReward[i] == account) {
                _excludedFromReward[i] = _excludedFromReward[_excludedFromReward.length - 1];
                _actualBalances[account] = 0;
                _isExcludedFromReward[account] = false;
                _excludedFromReward.pop();
                break;
            }
        }
    }

    function excludeFromFee(address account) external onlyOwner() {
        _isExcludedFromFee[account] = true;
    }
    
    function includeInFee(address account) external onlyOwner() {
        _isExcludedFromFee[account] = false;
    }

    // ==============================
    // Public functions
    // ==============================

    function decimals() public pure override returns (uint8) {
        return DECIMALS;
    }

    function balanceOf(address account) public view override(ERC20, IrCBX) returns (uint256) {
        if (_isExcludedFromReward[account]) return _actualBalances[account];
        return tokenFromReflection(_reflectedBalances[account]);
    }

    function totalFees() public view returns (uint256) {
        return _totalFeeCollected;
    }

    function deliver(uint256 tAmount) public {
        address sender = _msgSender();
        require(!_isExcludedFromReward[sender], "Excluded addresses cannot call this function");

        (uint256 rAmount,,,,) = _getValues(tAmount);

        _reflectedBalances[sender] = _reflectedBalances[sender] - rAmount;
        _reflectedSupply = _reflectedSupply - rAmount;
        _totalFeeCollected = _totalFeeCollected + tAmount;
    }

    function isRewardExcluded(address account) public view returns (bool) {
        return _isExcludedFromReward[account];
    }

    function tokenFromReflection(uint256 rAmount) public view returns(uint256) {
        require(rAmount <= _reflectedSupply, "Amount must be less than total reflections");
        uint256 currentRate =  _getRate();
        return rAmount / currentRate;
    }

    function reflectionFromToken(uint256 tAmount, bool deductTransferFee) public view returns(uint256) {
        require(tAmount <= _totalSupply, "Amount must be less than supply");

        if (!deductTransferFee) {
            (uint256 rAmount,,,,) = _getValues(tAmount);
            return rAmount;
        } else {
            (,uint256 rTransferAmount,,,) = _getValues(tAmount);
            return rTransferAmount;
        }
    }

    // ==============================
    // Internal logic
    // ==============================

    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20) {
        if (from == address(0)) {
        // ── mint 専用処理 ───────────────────
        _totalSupply += amount;
        uint256 rAmount = amount * _getRate();   // 現在の反射レート
        _reflectedBalances[to] += rAmount;
        if (_isExcludedFromReward[to]) {
            _actualBalances[to] += amount;
        }
        emit Transfer(address(0), to, amount);
        return;
       }

        // ゼロアドレスチェック
        if (from == address(0)) {
            // ミント時は特別な処理
            require(to != address(0), "ERC20: mint to the zero address");
        } else {
            // 通常の転送時
            require(to != address(0), "ERC20: transfer to the zero address");
        }
        
        require(amount > 0, "Transfer amount must be greater than zero");

        if (from != owner() && to != owner()) {
            require(amount <= _maxTxAmount, "Transfer amount exceeds the maxTxAmount.");
        }

        uint256 contractTokenBalance = balanceOf(address(this));
        if (contractTokenBalance >= _maxTxAmount) {
            contractTokenBalance = _maxTxAmount;
        }

        bool takeFee = true;
        if (_isExcludedFromFee[from] || _isExcludedFromFee[to]) {
            takeFee = false;
        }

        _tokenTransfer(from, to, amount, takeFee);
    }

    // ==============================
    // Token transfer logic
    // ==============================
    function _tokenTransfer(
        address sender,
        address recipient,
        uint256 amount,
        bool takeFee
    ) private {
        if(!takeFee) _removeAllFee();
        
        // Branch by exclusion status of sender and recipient
        if (_isExcludedFromReward[sender] && !_isExcludedFromReward[recipient]) {
            _transferFromExcluded(sender, recipient, amount);
        } else if (!_isExcludedFromReward[sender] && _isExcludedFromReward[recipient]) {
            _transferToExcluded(sender, recipient, amount);
        } else if (!_isExcludedFromReward[sender] && !_isExcludedFromReward[recipient]) {
            _transferStandard(sender, recipient, amount);
        } else if (_isExcludedFromReward[sender] && _isExcludedFromReward[recipient]) {
            _transferBothExcluded(sender, recipient, amount);
        } else {
            _transferStandard(sender, recipient, amount);
        }
        
        if(!takeFee) _restoreAllFee();
    }

    // ==============================
    // Transfer processing for each pattern
    // ==============================
    function _transferStandard(address sender, address recipient, uint256 tAmount) private {
        (uint256 rAmount, uint256 rTransferAmount, uint256 rFee, uint256 tTransferAmount, uint256 tFee) = _getValues(tAmount);
        _reflectedBalances[sender] = _reflectedBalances[sender] - rAmount;
        _reflectedBalances[recipient] = _reflectedBalances[recipient] + rTransferAmount;
        _reflectFee(rFee, tFee);
        emit Transfer(sender, recipient, tTransferAmount);
    }

    function _transferToExcluded(address sender, address recipient, uint256 tAmount) private {
        (uint256 rAmount, uint256 rTransferAmount, uint256 rFee, uint256 tTransferAmount, uint256 tFee) = _getValues(tAmount);
        _reflectedBalances[sender] = _reflectedBalances[sender] - rAmount;
        _actualBalances[recipient] = _actualBalances[recipient] + tTransferAmount;
        _reflectedBalances[recipient] = _reflectedBalances[recipient] + rTransferAmount;
        _reflectFee(rFee, tFee);
        emit Transfer(sender, recipient, tTransferAmount);
    }

    function _transferFromExcluded(address sender, address recipient, uint256 tAmount) private {
        (uint256 rAmount, uint256 rTransferAmount, uint256 rFee, uint256 tTransferAmount, uint256 tFee) = _getValues(tAmount);
        _actualBalances[sender] = _actualBalances[sender] - tAmount;
        _reflectedBalances[sender] = _reflectedBalances[sender] - rAmount;
        _reflectedBalances[recipient] = _reflectedBalances[recipient] + rTransferAmount;   
        _reflectFee(rFee, tFee);
        emit Transfer(sender, recipient, tTransferAmount);
    }

    function _transferBothExcluded(address sender, address recipient, uint256 tAmount) private {
        (uint256 rAmount, uint256 rTransferAmount, uint256 rFee, uint256 tTransferAmount, uint256 tFee) = _getValues(tAmount);
        _actualBalances[sender] = _actualBalances[sender] - tAmount;
        _reflectedBalances[sender] = _reflectedBalances[sender] - rAmount;
        _actualBalances[recipient] = _actualBalances[recipient] + tTransferAmount;
        _reflectedBalances[recipient] = _reflectedBalances[recipient] + rTransferAmount;
        _reflectFee(rFee, tFee);
        emit Transfer(sender, recipient, tTransferAmount);
    }

    // ==============================
    // Fee control
    // ==============================
    function _removeAllFee() private {
        if (_taxFeePercent == 0) return;
        _previousTaxFeePercent = _taxFeePercent;
        _taxFeePercent = 0;
    }
    
    function _restoreAllFee() private {
        _taxFeePercent = _previousTaxFeePercent;
    }

    // ==============================
    // Reflection fee application
    // ==============================
    function _reflectFee(uint256 rFee, uint256 tFee) private {
        _reflectedSupply = _reflectedSupply - rFee;
        _totalFeeCollected = _totalFeeCollected + tFee;
    }

    // ==============================
    // Reflection calculation
    // ==============================
    function _getValues(uint256 tAmount) private view returns (uint256, uint256, uint256, uint256, uint256) {
        ReflectionCalculator.Values memory values = tAmount.getValues(_taxFeePercent, _getRate());
        return (
            values.rAmount,
            values.rTransferAmount,
            values.rFee,
            values.tTransferAmount,
            values.tFee
        );
    }

    function _getRate() private view returns(uint256) {
        (uint256 rSupply, uint256 tSupply) = _getCurrentSupply();
        return rSupply / tSupply;
    }

    function _getCurrentSupply() private view returns (uint256, uint256) {
        uint256 rSupply = _reflectedSupply;
        uint256 tSupply = _totalSupply;

        for (uint256 i = 0; i < _excludedFromReward.length; i++) {
            if (_reflectedBalances[_excludedFromReward[i]] > rSupply || _actualBalances[_excludedFromReward[i]] > tSupply)
                return (_reflectedSupply, _totalSupply);

            rSupply = rSupply - _reflectedBalances[_excludedFromReward[i]];
            tSupply = tSupply - _actualBalances[_excludedFromReward[i]];
        }

        if (rSupply < _reflectedSupply / _totalSupply)
            return (_reflectedSupply, _totalSupply);

        return (rSupply, tSupply);
    }
}
