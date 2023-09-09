/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-etherscan')
require('dotenv').config()

const ALCHEMY_URL = process.env.ALCHEMY_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY


module.exports = {
  solidity: "0.8.19",
  defaultNetwork: 'mumbai',
  networks: {
      hardhat: {},
      mumbai: {
        url: ALCHEMY_URL,
        accounts: [ PRIVATE_KEY ],
     }
  },
  etherscan: {
     apiKey: POLYGONSCAN_API_KEY,
  },
};