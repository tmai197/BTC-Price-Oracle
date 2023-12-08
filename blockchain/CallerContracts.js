import Web3 from 'web3'

const provider = new Web3.providers.HttpProvider(
    "https://sepolia.infura.io/v3/9fba35c33cd54cf4935209dd620e2427"
)

const web3 = new Web3(provider)

const abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"ethPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"PriceUpdatedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"ReceivedNewRequestIdEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oracleAddress","type":"address"}],"name":"newOracleAddressEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"_ethPrice","type":"uint256"},{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"callback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_oracleInstanceAddress","type":"address"}],"name":"setOracleInstanceAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateEthPrice","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const vmContract = new web3.eth.Contract(abi, "0x57a8c48f10F25472627B88ceC7Ac9ae83bE43492")

export default vmContract