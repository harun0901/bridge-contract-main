// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
// import '@OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol';
import "./IToken.sol";
import "./IERC20.sol";
import "hardhat/console.sol";

abstract contract BridgeBase {
    address public owner;
    IToken public token;
    uint256 internal fees;

    mapping(address => bool) admins;

    mapping(address => mapping(uint256 => bool)) public processedNonces;

    // enum Step { Burn, Mint }

    // event Transfer(
    //   address from,
    //   address to,
    //   uint amount,
    //   uint date,
    //   uint nonce,
    //   bytes signature,
    //   Step indexed step
    // );

    event TokenDeposit(
        address from,
        address to,
        uint256 amount,
        uint256 nonce,
        string transactionID
    );

    constructor(address _token, address[] memory _admins) {
        owner = msg.sender;
        token = IToken(_token);
        fees = 1;
        for (uint256 i = 0; i < _admins.length; i++) {
            //console.log("I =>" , i,_admins[i]);
            admins[_admins[i]] = true;
           // console.log("AUTHORIZED =>", _admins[i]);
            // console.log("AUTHORIZED =>" ,_admins[i]);
            // address PvtKeyAddr1 = _admins[i];
            // console.log("PVT KEYS =>" , PvtKeyAddr1);
        }
    }

    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
            );
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        internal
        pure
        returns (address)
    {
        uint8 v;
        bytes32 r;
        bytes32 s;

        (v, r, s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (
            uint8,
            bytes32,
            bytes32
        )
    {
        require(sig.length == 65);

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function depositTokens(
        uint256 amount,
        address recipient,
        uint256 nonce,
        string memory _transactionID
    ) external virtual;

    function withdrawTokens(
        address from,
        address to,
        uint256 amount,
        uint256 nonce,
        bytes[] calldata signatures
    ) external virtual;
}
