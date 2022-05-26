require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraRinkebyKey = "https://rinkeby.infura.io/v3/77c7915da3da48159574da3eebedf275";
const infuraMainKey = "https://mainnet.infura.io/v3/77c7915da3da48159574da3eebedf275";
const infuraRinkebyKeyws = "wss://rinkeby.infura.io/ws/v3/77c7915da3da48159574da3eebedf275"
//
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      networkCheckTimeout: 1000000,
      from: "0xa202e5309C7779D3884287355744385956809742",
      provider: () => new HDWalletProvider(mnemonic, infuraRinkebyKeyws),
      network_id: 4,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    main: {
      provider: () => new HDWalletProvider(mnemonic, infuraMainKey),
      network_id: 1,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    testnet: {
      networkCheckTimeout: 1000000,
      from: "0xa202e5309C7779D3884287355744385956809742",
      provider: () => new HDWalletProvider(mnemonic, `wss://data-seed-prebsc-1-s2.binance.org:8545`),
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc: {
      provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "^0.8.4",
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}
