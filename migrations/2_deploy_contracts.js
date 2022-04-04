const TokenFarm = artifacts.require("TokenFarm");
const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");

module.exports = async function(deployer, network, accounts) {
  // deploy mock DAI token
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  // deploy mock Dapp token
  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

  // deploy token farm
  await deployer.deploy(TokenFarm, daiToken.address, dappToken.address);
  const tokenFarm = await TokenFarm.deployed();

  // Transfer all tokens to token farm
  await dappToken.transfer(tokenFarm.address, "1000000000000000000000000");

  // Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[1], "100000000000000000000");
};
