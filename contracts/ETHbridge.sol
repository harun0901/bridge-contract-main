pragma solidity ^0.8.0;
import "./Bridgebase.sol";
import "hardhat/console.sol";

contract ETHBridge is BridgeBase {
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
            "ETHBridge: transfer already processed"
        );
        processedNonces[msg.sender][nonce] = true;
        uint256 AmountwithFees = amount ;
        //token.transferOwnership(address(this));
        console.log("MSG.SENDER ethBridge => ", msg.sender);
        token.burn(msg.sender, AmountwithFees);
        emit TokenDeposit(
            msg.sender,
            recipient,
            AmountwithFees,
            nonce,
            _transactionID
        );
        // console.log("MSG.SENDER ethBridge => ", msg.sender);
    }

    function withdrawTokens(
        address from,
        address to,
        uint256 amount,
        uint256 nonce,
        bytes[] memory signatures
    ) external override {
        uint256 signCount;
        address signAddress;
        bytes32 message = prefixed(
            keccak256(abi.encodePacked(from, to, amount, nonce))
        );
        for (uint256 i = 0; i < signatures.length; i++) {
            signAddress = recoverSigner(message, signatures[i]);

            console.log("SIGNER ADDRESS  ", signAddress);
            require(admins[signAddress] == true, "ETHBridge: wrong signature");
            require(
                verifiedSigns[signatures[i]] == false,
                "ETHBridge: Sign is not verified"
            );
            verifiedSigns[signatures[i]] = true;
            signCount++;
        }
    console.log("From => ",from);
        //require(processedNonces[from][nonce] == false, 'ETHbridge: transfer already processed');
        // processedNonces[from][nonce] = true;
        require(signCount == 5, "ETHBridge: All signers must be matched");
        //token.transferOwnership(address(this));
        token.mint(to, amount);
    }
}
