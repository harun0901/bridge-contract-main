// const Web3 = require('web3');
// const artifacts = require("../artifacts/contracts/PingToken.sol/PING.json");

// let deployedHardhatAddress = "0x774a632Ed4C5bf458313aa71C8c576d53c0FE844";


// web3 = new Web3(new Web3.providers.HttpProvider('https://SONAAR21:1695_Pak@apis.ankr.com/6e0e622d8970467ea26ee7a96edf18d9/5a8ad758d6efb2e63a414c559253b5b2/binance/full/test'));
// instance = new web3.eth.Contract(artifacts["abi"], deployedHardhatAddress);

// const express = require('express');
// const app = express();
// app.use(express.json());


// app.post('/api/' , async(req , res) =>
// {
//     try{
//     let accounts = await web3.eth.getAccounts();
//     let myADDr = "0x611485C1990cd77A7D67e46AA6D6e7F8359dF4ee";
//     let sender = "0x3Ab20b6375B5c8E791E9b62635ff2bfF85F8595D"
//     let re = await instance.methods.transfer(myADDr , 25000).send({'from': sender});;
//     let rV = await re.events.Transfer.returnValues;
//     //let re = await instance.methods.createIdentity(accounts[0],[accounts[0]],[accounts[0]]).send({'from':accounts[0]});
//     //let rV = await re.events.IdentityCreated.returnValues;
//     //res.json(rV.recoveryAddress);
// }
//     catch(err){
//         console.log(err);
//     }
// } );



import Web3 from 'web3';


let web3;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // we check if metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // set up provider through infura
  const provider = new Web3.providers.HttpProvider(
    // pass url of remote node
    'https://SONAAR21:1695_Pak@apis.ankr.com/6e0e622d8970467ea26ee7a96edf18d9/5a8ad758d6efb2e63a414c559253b5b2/binance/full/test'
  );
  web3 = new Web3(provider);

}

export default web3;