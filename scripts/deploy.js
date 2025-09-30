const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Identity = await hre.ethers.getContractFactory("Identity");
  const identity = await Identity.deploy();
  await identity.deployed();

  console.log("Identity deployed to:", identity.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
