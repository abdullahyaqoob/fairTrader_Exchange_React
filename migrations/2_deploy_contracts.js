// const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

module.exports = async function(deployer) {
  // Deploy Token
  // await deployer.deploy(Token);
  // const token = await Token.deployed()

  // Deploy EthSwap
  // Rinkeby
  // await deployer.deploy(EthSwap, '0x8226b3c67C60637ed2869727Ca3e1f890745D6C0');
  
  // Binance
  await deployer.deploy(EthSwap, '0x30C1d16E0B07653D312C9A74Cbf91c774d67b26A');

  const ethSwap = await EthSwap.deployed()

  // Transfer all tokens to EthSwap (1 hundred million)
  // await token.transfer(ethSwap.address, '1000000000000000000000000')
};
