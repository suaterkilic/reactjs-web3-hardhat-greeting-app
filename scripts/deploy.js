// scripts/deploy.js
async function main() {
  const hre = require("hardhat");

  await hre.run("compile");

  const MyContract = await hre.ethers.getContractFactory("Greeter");
  const myContract = await MyContract.deploy("Hello Friend22222");

  await myContract.deployed();

  console.log("Contract deployed to:", myContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
