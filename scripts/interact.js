// import web3 from './pingToken';
// const artifacts = require("../artifacts/contracts/PingToken.sol/PING.json");
// const address = '"0x774a632Ed4C5bf458313aa71C8c576d53c0FE844"';  // use quotes! 

// const abi = [artifacts]; 
// // contract abi doesn't have quotes an will be something like [{a lot of code}, {a lot of code}, … ];  REMEMBER to add ; or it won't work 
// export default new web3.eth.Contract(abi, address);

const  { Contract, ContractFactory } = require( "ethers");
// const RouterInteraction = require( "../artifacts/contracts/ePING.sol/ePING.json");
const RouterInteraction = require( "../artifacts/contracts/PingToken.sol/PING.json");

const { ethers } = require ( "hardhat");
//../artifacts/contracts/phxStake.sol/PHXStake.json
//allowance


async function main()
{
  const [signer] = await ethers.getSigners()
  const PhxStake = new ContractFactory(RouterInteraction.abi, RouterInteraction.bytecode,signer );
  const phx = PhxStake.attach("0x3fB170043a30cAD8A0DeFc0507b376685233634a");

  // let tx =await phx.transferOwnership("0xdD96297456E90106eD7d437f5AdA8Fc740e19B0D");
  // tx = await tx.wait();
  // console.log(tx);

  let tx =await phx.balanceOf("0x71A311EDB7423815Fc71421428E47aF57543bce3");
  console.log(tx.toString());
// // let tx =await BSCBridgeInstance.toggleWhiteListOnly({gasPrice: "0x2E90EDD000"});
// // console.log(tx)
// // await tx.wait(1)

   
      // let tx =await phx.approve("0xc18f48Ce9395eCAc55fc46b3A16221B9aF476470" ,40000000);
      // tx = await tx.wait();
      // console.log(tx)
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

