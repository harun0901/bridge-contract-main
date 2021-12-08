// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import "./Bridgebase.sol";

contract BSCBridge is BridgeBase {
    mapping(bytes => bool) private verifiedSigns;
    constructor(address token, address[] memory admins)
        BridgeBase(token, admins)
    {}

    function depositTokens(
        uint256 amount,
        address recipient,
        uint256 nonce,
        string memory _transactionID
    ) external override {
        require(
            processedNonces[msg.sender][nonce] == false,
            "BSC Bridge: transfer already processed"
        );
        processedNonces[msg.sender][nonce] = true;
        uint256 balBeforeTrans = token.balanceOf(address(this));
        //console.log("Balance Before transfer => " , balBeforeTrans);
        token.transferFrom(msg.sender, address(this), amount);

        uint256 balAfterTrans = token.balanceOf(address(this));
        //console.log("Balance After transfer => " , balAfterTrans);
        
        uint256 transAmount = balAfterTrans - balBeforeTrans ;
       // console.log("Transfered Amount => " , transAmount);

        emit TokenDeposit(msg.sender, recipient, transAmount, nonce, _transactionID);

        ///console.log("MSG.SENDER bscBridge => ", msg.sender);
    }

    function withdrawTokens(
        address from,
        address to,
        uint256 amount,
        uint256 nonce,
        bytes[] calldata signatures
    ) external override {
        address signAddress;
        uint256 signCount;
        bytes32 message = prefixed(
            keccak256(abi.encodePacked(from, to, amount, nonce))
        );

        for (uint256 i = 0; i < signatures.length; i++) {
            signAddress = recoverSigner(message, signatures[i]);
            require(admins[signAddress] == true, "BSC Bridge: wrong signature");
            require(
                verifiedSigns[signatures[i]] == false,
                "Sign is not verified"
            );
            verifiedSigns[signatures[i]] = true;
            signCount++;
        }
     
        uint256 adminBal = token.balanceOf(address(this));
        require(
            adminBal >= amount,
            "BSC Bridge: insuffient funds in admin account."
        );
        // require(processedNonces[from][nonce] == false, 'transfer already processed');
        // processedNonces[from][nonce] = true;
        require(signCount == 5, "BSC Bridge: All signers must be matched");
        token.transfer(to, amount);
    }
}
