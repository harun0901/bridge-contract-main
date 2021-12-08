const { expect } = require("chai");
const { ethers , waffle} = require("hardhat");
const Web3 = require('web3-utils');
//const web3 = require('web3');
var RLP = require("rlp");
const { ecsign } = require("ethereumjs-util");
const provider = waffle.provider;
describe("BRIDGE", function () {

 let BSC_BRIDGE;
 let BSC_BRIDGE_TOKEN;
 let ETH_BRIDGE;
 let ETH_BRIDGE_TOKEN;
 let Owner;
let addr1;
let addr2;
let addr3;
let addr4;
let addr5;
let addr6;
let c0; 
let c1;
let sig; 
let sig3;
let c3; 
let c4;
let _transactionID;
let ePing;
let ePingTOKEN;
let Ping;
let PingTOKEN;
let amount;
let approvedAmt;
let  BEP20;
let BEP20token;
let ERC20;
let ERC20token;


before(async function(){

    Ping = await ethers.getContractFactory("PING");
    PingTOKEN =  await Ping.deploy();

    ePing = await ethers.getContractFactory("ePING");
    ePingTOKEN =  await ePing.deploy();
    BEP20 = await ethers.getContractFactory("BEP20");
    BEP20token = await BEP20.deploy("BEP20","bT");
    
    ERC20 = await ethers.getContractFactory("ERC20");
    ERC20token = await ERC20.deploy("STok","eT");
    

    ETH_BRIDGE = await ethers.getContractFactory("ETHBridge");
    [Owner , addr1 , addr2 , addr3 , addr4 , addr5 , addr6] = await provider.getWallets();
    // console.log("OWNER  ", Owner.address);
    
    ETH_BRIDGE_TOKEN =  await ETH_BRIDGE.deploy(ePingTOKEN.address,
         ["0x611485C1990cd77A7D67e46AA6D6e7F8359dF4ee" ,
         "0x3Ab20b6375B5c8E791E9b62635ff2bfF85F8595D" , 
         "0xC6989d5d295A28CCD898Ec09d5D44Fc7dE1d08fA", 
         "0x5257411fB1eF1BaF690E4947CF92501296f6A1Af",
         "0x71A311EDB7423815Fc71421428E47aF57543bce3"] );
    //ETH_BRIDGE_TOKEN =  await ETH_BRIDGE.deploy(ERC20token.address, ["0x611485C1990cd77A7D67e46AA6D6e7F8359dF4ee" ,"0x3Ab20b6375B5c8E791E9b62635ff2bfF85F8595D" , "0xC6989d5d295A28CCD898Ec09d5D44Fc7dE1d08fA", "0x5257411fB1eF1BaF690E4947CF92501296f6A1Af","0x71A311EDB7423815Fc71421428E47aF57543bce3"] );

    BSC_BRIDGE = await ethers.getContractFactory("BSCBridge");
   // BSC_BRIDGE_TOKEN = await BSC_BRIDGE.deploy(BEP20token.address, ["0x611485C1990cd77A7D67e46AA6D6e7F8359dF4ee" ,"0x3Ab20b6375B5c8E791E9b62635ff2bfF85F8595D" , "0xC6989d5d295A28CCD898Ec09d5D44Fc7dE1d08fA", "0x5257411fB1eF1BaF690E4947CF92501296f6A1Af","0x71A311EDB7423815Fc71421428E47aF57543bce3"] );
    BSC_BRIDGE_TOKEN = await BSC_BRIDGE.deploy(PingTOKEN.address, 
    ["0x611485C1990cd77A7D67e46AA6D6e7F8359dF4ee" ,
    "0x3Ab20b6375B5c8E791E9b62635ff2bfF85F8595D" , 
    "0xC6989d5d295A28CCD898Ec09d5D44Fc7dE1d08fA", 
    "0x5257411fB1eF1BaF690E4947CF92501296f6A1Af",
    "0x71A311EDB7423815Fc71421428E47aF57543bce3"]);

});




     it("Should lock the Tokens in BSC Bridge", async function (){

        c0 = await ethers.utils.arrayify(ethers.utils.id("Hello How are you?"));
        sig = await Owner.signMessage(c0); 
        _transactionID = "Xord";
        amount = "50";
        //console.log("WEB 3" , Web3);
        amount = Web3.toWei(amount, 'gwei');

        approvedAmt = "25000";
        approvedAmt = Web3.toWei(approvedAmt, 'gwei');
        await PingTOKEN.approve(BSC_BRIDGE_TOKEN.address ,approvedAmt );
        console.log("OWNER => ",Owner.address);
        let bal = await PingTOKEN.balanceOf(Owner.address);
        console.log("BALof Owner ",bal.toString());
        expect( await  BSC_BRIDGE_TOKEN.depositTokens(amount,addr5.address,  1241 , _transactionID)).to.emit(BSC_BRIDGE_TOKEN , "TokenDeposit").withArgs(Owner.addrress,  addr5.address,  amount ,  1241 , _transactionID);

     });



    
      it("Should mint the eth (ePING) tokens", async function (){

        amount = "50";
        amount = Web3.toWei(amount, 'gwei');
        //console.log()
        // c0 = await ethers.utils.keccak256(ethers.utils.solidityPack(["address" ,"address" ,"uint" , "uint"] ,[ addr4.address,  addr5.address ,  300 ,  1241]));
        // c0 = await ethers.utils.keccak256(ethers.utils.solidityPack(["address" ,"address" ,"uint" , "uint"] ,[Owner.address,  Owner.address,  amount ,  1241]));
        c0 = await ethers.utils.keccak256(ethers.utils.solidityPack(["address" ,"address" ,"uint" , "uint"] ,[Owner.address,  addr5.address , amount ,  1241]));
       // c1 = await ethers.utils.keccak256(ethers.utils.solidityPack(["address" ,"address" ,"uint" , "uint"] ,[ addr4.address,  addr5.address ,  300 ,  1]));
        let sTr = '\x19Ethereum Signed Message:\n32';
        // let c3 = '\x19Ethereum Signed Message:\n32' +c0;
        //console.log('\\x19Ethereum Signed Message:\\n32');
        c4 = await ethers.utils.keccak256(ethers.utils.solidityPack(["string" ,"bytes32"] ,[sTr,c0]));
        
 
        // console.log("OUR HASH (C4)               =>" , c4);
        // sig = await addr3.signMessage(c0);
        // sig1 = await addr3.signMessage(c1);
        //console.log(Owner);
        //Admins Pvt keys
        //  let a1pkey = "0x5da45c9023c9c54495fbd29df3af6ca2a6427e28ae74d5379e055fcd1d957512";
        let a1pkey = "0x5da45c9023c9c54495fbd29df3af6ca2a6427e28ae74d5379e055fcd1d957512";
         //const a1pkeybuf = Buffer.from(a1pkey, 'hex')
         let a2pkey = "0xa04ada81cd00e68a2669b5aa380617c87636a56ba50cce4ba11e6ca3bfdb2e75";
        // const a2pkeybuf = Buffer.from(a2pkey, 'hex')
         let a3pkey = "0x1e247abcc4695f1e5ca8e7bffd20b6a9722548f4d151dada490cd634f3f80243";
         //const a3pkeybuf = Buffer.from(a3pkey, 'hex')
         let a4pkey = "0xe150b07c12e1cbf6494501ff1f8fd518dab5beb80472eb1d29483e8c03b03af5";
         //const a4pkeybuf = Buffer.from(a4pkey, 'hex')
         let a5pkey = "0x62b4c9d040bcc65102e45bfb031217d1ac342177bb3cba83b9bc33d636cd0d71";
         //const a5pkeybuf = Buffer.from(a5pkey, 'hex')

        //Sign of Admin 1
         let { v, r, s} = ecsign(Buffer.from(c4.slice(2), "hex"), Buffer.from(a1pkey.slice(2), "hex"));
        //  console.log("V ==> ",v);
         let SIG1 = '0x'+r.toString('hex')+s.toString('hex')+v.toString(16);
        //  console.log("R ==> ",r);
        //  console.log("S ==> ",s);
         
         console.log("Admin 01 Sign ==> ",SIG1);

         //Sign of Admin 2
          let sig2= ecsign(Buffer.from(c4.slice(2), "hex"), Buffer.from(a2pkey.slice(2), "hex"));
          console.log("OPK  ", Owner.privateKey);
    
         let SIG2 = '0x'+sig2.r.toString('hex')+sig2.s.toString('hex')+sig2.v.toString(16);
         console.log("Admin 02 Sign ==> ",SIG2);

        //   //Sign of Admin 3
        let sig3 = ecsign(Buffer.from(c4.slice(2), "hex"), Buffer.from(a3pkey.slice(2), "hex"));
          let SIG3 = '0x'+sig3.r.toString('hex')+sig3.s.toString('hex')+sig3.v.toString(16);
          console.log("Admin 03 Sign ==> ",SIG3);

        //    //Sign of Admin 4
        let sig4  = ecsign(Buffer.from(c4.slice(2), "hex"), Buffer.from(a4pkey.slice(2), "hex"));
         let SIG4 = '0x'+sig4.r.toString('hex')+sig4.s.toString('hex')+sig4.v.toString(16);
         console.log("Admin 04 Sign ==> ",SIG4);

        //   //Sign of Admin 5
        let sig5  = ecsign(Buffer.from(c4.slice(2), "hex"), Buffer.from(a5pkey.slice(2), "hex"));
          let SIG5 = '0x'+sig5.r.toString('hex')+sig5.s.toString('hex')+sig5.v.toString(16);
          console.log("Admin 05 Sign ==> ",SIG5);
 

 



        // console.log("V<R<S" , v,r,s);
         let SIG = '0x'+r.toString('hex')+s.toString('hex')+v.toString(16);
        // let SIG12 = '\x19Ethereum Signed Message:\n32'+'0x'+r.toString('hex')+s.toString('hex')+v.toString(16);
         //console.log("SIG" , SIG12);
        //let c3 = "\x19Ethereum signed message:\n" +c0;
        //sig3 = await ethers.utils.splitSignature(sig);
       // let addr1 = ecrecover(c4, sig3.v, sig3.r, sig3.s);
        //  let addr1 = ethers.utils.verifyMessage(c4, SIG1);
         // console.log("Add1 ==> ", addr1);
        //  let addr2 = ethers.utils.verifyMessage(c4, SIG2);
        //  console.log("Add2 ==> ", addr2);
        //  let addr3 = ethers.utils.verifyMessage(c4, SIG3);
        //  console.log("Add3 ==> ", addr3);
        //  let addr4 = ethers.utils.verifyMessage(c4, SIG4);
        //  console.log("Add4 ==> ", addr4);
        //  let addr5 = ethers.utils.verifyMessage(c4, SIG5);
        //  console.log("Add5 ==> ", addr5);
        let addr1 = ethers.utils.recoverAddress(c4, SIG1);
        console.log("Add1 ==> ", addr1);
        //let addr = await ETH_BRIDGE_TOKEN.recoverSigner(c0 , sig);
       // console.log("ETHERS " , ethers.utils);
       
        // let ENCODED =  RLP.encode(Owner.address ,addr4.address , 0 ,1);
        // c0 = await web3.keccak256(ENCODED);
       
        // console.log("C0 => ", c0);
        // console.log("C1 => ", c1);
    // console.log("GENRATED HASH in ETH-BRIDGE =>" ,await ETH_BRIDGE_TOKEN.MSG("0x51a73C48c8A9Ef78323ae8dc0bc1908A1C49b6c6",  "0x51a73C48c8A9Ef78323ae8dc0bc1908A1C49b6c6",  300 ,  1241));
     console.log("OUR HASH (C4)               =>" , c4);
     // console.log("ECRECOVER => " , addr);
        //console.log("ETH contract=> ",ETH_BRIDGE_TOKEN.address);

       // await ERC20token.approve(ETH_BRIDGE_TOKEN.address , 25000);
       
        // expect(await ETH_BRIDGE_TOKEN.withdrawTokens(addr4.address, addr5.address , 300 ,1241 ,[ SIG1,SIG2 , SIG3 ,SIG4 , SIG5]));
        await ePingTOKEN.addAdmin(ETH_BRIDGE_TOKEN.address);
        expect(await ETH_BRIDGE_TOKEN.withdrawTokens(Owner.address,  addr5.address, amount ,  1241,[ SIG1,SIG2 , SIG3 ,SIG4 , SIG5]));
       let bal = await ePingTOKEN.balanceOf(addr5.address);
       console.log("BALof Addr5 ",bal.toString());
       let bal2 = await PingTOKEN.balanceOf(Owner.address);
        console.log("BALof Owner After transfer",bal2.toString());
    });



    it("Should burn the eth (ePING) tokens", async function ()
    {
        // c0 = await ethers.utils.arrayify(ethers.utils.id("Hello How are you?"));
        // sig = await Owner.signMessage(c0);
        //await ERC20token.approve(ETH_BRIDGE_TOKEN.address , 15000);
        // console.log("OWNER ",ETH_BRIDGE_TOKEN.address);
        // console.log("ADDR1", addr1.address );
        _transactionID = "Xord";
        amount = "48";
        //console.log("WEB 3" , Web3);
        amount = Web3.toWei(amount, 'gwei');
        console.log("Ammount => ",amount);

        approvedAmt = "25000";
        approvedAmt = Web3.toWei(approvedAmt, 'gwei');
        await PingTOKEN.approve(BSC_BRIDGE_TOKEN.address ,approvedAmt );
        await ePingTOKEN.addAdmin(ETH_BRIDGE_TOKEN.address);
        console.log("addr5 => ",addr5.address);
       // expect(await ETH_BRIDGE_TOKEN.despositTokens(addr5.address ,300 , 1 ).to.emit(ETH_BRIDGE_TOKEN , "deposit").withArgs(addr4.address , addr5.address , 300 , 1));
       expect( await  ETH_BRIDGE_TOKEN.connect(addr5).depositTokens(amount,Owner.address,  1241 , _transactionID)).to.emit(ETH_BRIDGE_TOKEN, "TokenDeposit").withArgs(addr5.address,  Owner.address,  amount ,  1241 , _transactionID)
       //expect( await  ETH_BRIDGE_TOKEN.despositTokens("0x51a73C48c8A9Ef78323ae8dc0bc1908A1C49b6c6",  300 ,  1241 )).to.emit(ETH_BRIDGE_TOKEN , "deposit").withArgs("0x51a73C48c8A9Ef78323ae8dc0bc1908A1C49b6c6",  "0x51a73C48c8A9Ef78323ae8dc0bc1908A1C49b6c6",  300 ,  1241);
     //   let bal = await ePingTOKEN.balanceOf(addr5.address);
     //   console.log("BALof Addr5 after transfer ",bal.toString());
     }); 


   it("Should unlock the Tokens in BSC Bridge", async function (){
// // //     // // // // //     c3 = await ethers.utils.arrayify(ethers.utils.id("Hello How are you?"));
// // //     // // // // //     sig = await Owner.signMessage(c3); 
// // //     // // // // //     await ERC20token.approve(BSC_BRIDGE_TOKEN.address , 25000);
// // //     // // // // //    // expect(await BSC_BRIDGE_TOKEN.connect(addr1).despositTokens(Owner.address ,100 , 1 , sig )).to.emit(BSC_BRIDGE_TOKEN , "Lock").withArgs(addr1.address , Owner.address , 100);
// // //     // // // // //     expect( await  BSC_BRIDGE_TOKEN. despositTokens(Owner.address ,300 , 1 , sig )).to.emit(BSC_BRIDGE_TOKEN , "Lock").withArgs(addr1.address , Owner.address , 300);







        amount = "48";
        amount = Web3.toWei(amount, 'gwei');
        // c0 = await ethers.utils.keccak256(ethers.utils.solidityPack(["address" ,"address" ,"uint" , "uint"] ,[ addr5.address,  addr4.address ,  300 ,  1]));
        c0 = await ethers.utils.keccak256(ethers.utils.solidityPack(["address" ,"address" ,"uint" , "uint"] ,[ addr5.address,  Owner.address,  amount ,  1241]));
        //c1 = await ethers.utils.keccak256(ethers.utils.solidityPack(["address" ,"address" ,"uint" , "uint"] ,[ addr5.address,  addr4.address ,  300 ,  1]));
        // sig = await addr3.signMessage(c0);
        // sig1 = await addr3.signMessage(c1);
        //console.log(Owner);
        let sTr = '\x19Ethereum Signed Message:\n32';
        c4 = await ethers.utils.keccak256(ethers.utils.solidityPack(["string" ,"bytes32"] ,[sTr,c0]));
        //  const { v, r, s } = ecsign(Buffer.from(c4.slice(2), "hex"), Buffer.from(addr6.privateKey.slice(2), "hex"));
        // // console.log("V<R<S" , v,r,s);
        //  let SIG = '0x'+r.toString('hex')+s.toString('hex')+v.toString(16);
        // console.log("SIG" , SIG);
        //let c3 = "\x19Ethereum signed message:\n" +c0;
        //sig3 = await ethers.utils.splitSignature(sig);
        //let addr = ecrecover(c0, sig3.v, sig3.r, sig3.s);
        // let addr = ethers.utils.verifyMessage(c4, SIG);
        //let addr = ethers.utils.recoverAddress(c0, sig);
        //let addr = await ETH_BRIDGE_TOKEN.recoverSigner(c0 , sig);
       // console.log("ETHERS " , ethers.utils);
       
        // let ENCODED =  RLP.encode(Owner.address ,addr4.address , 0 ,1);
        // c0 = await web3.keccak256(ENCODED);
       
        // console.log("C0 => ", c0);
        // console.log("C1 => ", c1);
        // console.log("GENRATED HASH in ETH-BRIDGE =>" ,await ETH_BRIDGE_TOKEN.MSG(addr1.address ,addr4.address , 0 ,1));
        // console.log("ECRECOVER => " , addr);
        //console.log("ETH contract=> ",ETH_BRIDGE_TOKEN.address);
        let a1pkey = "0x5da45c9023c9c54495fbd29df3af6ca2a6427e28ae74d5379e055fcd1d957512";
         //const a1pkeybuf = Buffer.from(a1pkey, 'hex')
         let a2pkey = "0xa04ada81cd00e68a2669b5aa380617c87636a56ba50cce4ba11e6ca3bfdb2e75";
        // const a2pkeybuf = Buffer.from(a2pkey, 'hex')
         let a3pkey = "0x1e247abcc4695f1e5ca8e7bffd20b6a9722548f4d151dada490cd634f3f80243";
         //const a3pkeybuf = Buffer.from(a3pkey, 'hex')
         let a4pkey = "0xe150b07c12e1cbf6494501ff1f8fd518dab5beb80472eb1d29483e8c03b03af5";
         //const a4pkeybuf = Buffer.from(a4pkey, 'hex')
         let a5pkey = "0x62b4c9d040bcc65102e45bfb031217d1ac342177bb3cba83b9bc33d636cd0d71";
         //const a5pkeybuf = Buffer.from(a5pkey, 'hex')

        //Sign of Admin 1
         let { v, r, s} = ecsign(Buffer.from(c4.slice(2), "hex"), Buffer.from(a1pkey.slice(2), "hex"));
        //  console.log("V ==> ",v);
         let SIG1 = '0x'+r.toString('hex')+s.toString('hex')+v.toString(16);
        //  console.log("R ==> ",r);
        //  console.log("S ==> ",s);
         
         console.log("Admin 01 Sign ==> ",SIG1);

         //Sign of Admin 2
          let sig2= ecsign(Buffer.from(c4.slice(2), "hex"), Buffer.from(a2pkey.slice(2), "hex"));
          console.log("OPK  ", Owner.privateKey);
    
         let SIG2 = '0x'+sig2.r.toString('hex')+sig2.s.toString('hex')+sig2.v.toString(16);
         console.log("Admin 02 Sign ==> ",SIG2);

        //   //Sign of Admin 3
        let sig3 = ecsign(Buffer.from(c4.slice(2), "hex"), Buffer.from(a3pkey.slice(2), "hex"));
          let SIG3 = '0x'+sig3.r.toString('hex')+sig3.s.toString('hex')+sig3.v.toString(16);
          console.log("Admin 03 Sign ==> ",SIG3);

        //    //Sign of Admin 4
        let sig4  = ecsign(Buffer.from(c4.slice(2), "hex"), Buffer.from(a4pkey.slice(2), "hex"));
         let SIG4 = '0x'+sig4.r.toString('hex')+sig4.s.toString('hex')+sig4.v.toString(16);
         console.log("Admin 04 Sign ==> ",SIG4);

        //   //Sign of Admin 5
        let sig5  = ecsign(Buffer.from(c4.slice(2), "hex"), Buffer.from(a5pkey.slice(2), "hex"));
          let SIG5 = '0x'+sig5.r.toString('hex')+sig5.s.toString('hex')+sig5.v.toString(16);
          console.log("Admin 05 Sign ==> ",SIG5);
 


        await BEP20token.approve(BSC_BRIDGE_TOKEN.address , 35000);
        //expect(await BSC_BRIDGE_TOKEN.withdrawTokens(addr5.address, addr4.address , 300 ,1 ,[SIG ]))
        expect(await BSC_BRIDGE_TOKEN.withdrawTokens(addr5.address,  Owner.address,  amount ,  1241,[ SIG1,SIG2 , SIG3 ,SIG4 , SIG5]));
        let bal = await PingTOKEN.balanceOf(Owner.address);
        console.log("BALof Owner ",bal.toString());


    });







  });
