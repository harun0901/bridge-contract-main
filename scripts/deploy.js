// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const [deployer] = await ethers.getSigners();

  let ADMIN1 = "0x611485C1990cd77A7D67e46AA6D6e7F8359dF4ee";
  let admin1 = ADMIN1.toLowerCase();
  // console.log("AFTER LOWER CASE CONVERSION A1 ==>" , admin1);

 let ADMIN2 = "0x3Ab20b6375B5c8E791E9b62635ff2bfF85F8595D";
 let admin2 = ADMIN2.toLowerCase();
//  console.log("AFTER LOWER CASE CONVERSION A2 ==>" , admin2);

 let ADMIN3 = "0xC6989d5d295A28CCD898Ec09d5D44Fc7dE1d08fA";
 let admin3 = ADMIN3.toLowerCase();
//  console.log("AFTER LOWER CASE CONVERSION A3 ==>" , admin3);

 let ADMIN4 = "0x5257411fB1eF1BaF690E4947CF92501296f6A1Af";
 let admin4 = ADMIN4.toLowerCase();
//  console.log("AFTER LOWER CASE CONVERSION A4 ==>" , admin4);

 let ADMIN5 = "0x71A311EDB7423815Fc71421428E47aF57543bce3";
 let admin5 = ADMIN5.toLowerCase();
//  console.log("AFTER LOWER CASE CONVERSION A5 ==>" , admin5);


  // // We get the contract to deploy
  // const ERC20 = await hre.ethers.getContractFactory("ERC20");
  // const ERC20token = await ERC20.deploy("Shahbaz Token" ,"ST");
  // await ERC20token.deployed();
  // console.log("ERC 20 deployed to:", ERC20token.address);

  // BEP20 Contract
  // const BEP20 = await hre.ethers.getContractFactory("BEP20");
  // const BEP20token = await BEP20.deploy("BEP Shahbaz" ,"BST");
  // await BEP20token.deployed();
  // console.log("BEP 20 deployed to:", BEP20token.address);

  //Bridgebase contract
  // const Bridgebase = await hre.ethers.getContractFactory("BridgeBase");
  // const BridgeBasetoken = await Bridgebase.deploy(
  // "0x1B696aA057F1654B4Ae0ab558D804CF8c5D6E2aa",
  // [admin1 ,admin2 , admin3 , admin4 , admin5]);
  
  // await BridgeBasetoken.deployed();
  // console.log("BridgeBase deployed to:", BridgeBasetoken.address);

  //Bridgebsc contract
  // const Bridgebsc = await hre.ethers.getContractFactory("BSCBridge");
  // const BridgeBsctoken = await Bridgebsc.deploy("0x3fB170043a30cAD8A0DeFc0507b376685233634a",
  // [admin1 ,admin2 , admin3 , admin4 , admin5]);
   
  // await BridgeBsctoken.deployed();
  
  //  console.log("BridgeBsc deployed to:", BridgeBsctoken.address);

  // //Bridgeeth contract
  const Bridgeeth = await hre.ethers.getContractFactory("ETHBridge");
  const BridgeETHtoken = await Bridgeeth.deploy("0x17858bBEf3006E6A5A6fD37b5B0CCFDF1Ea147cf",
  [admin1 ,admin2 , admin3 , admin4 , admin5]);
   
  await BridgeETHtoken.deployed();
  console.log("BridgeETH deployed to:", BridgeETHtoken.address);

  
  // //ePING contract
  // const ePING = await hre.ethers.getContractFactory("ePING");
  // const ePINGtoken = await ePING.deploy();
   
  // await ePINGtoken.deployed();
  // console.log("ePING Token deployed to:", ePINGtoken.address);

  //PING contract
  //let accs = await ethers.getSigners();
  //console.log(accs[0].address)
//   const PING = await hre.ethers.getContractFactory("PING");
//   const PINGtoken = await PING.deploy();
  
//   await PINGtoken.deployed();
//   console.log("PING deployed to:", PINGtoken.address);


  }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
