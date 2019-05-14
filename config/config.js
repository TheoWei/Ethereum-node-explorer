module.exports = {
    port: process.env.PORT || 3000,
    web3_rpc: process.env.WEB3_RPC_URL || 'http://localhost:8545',
    mongodb: process.env.MONGODB_URL || 'mongodb://localhost:27017/explorer',
    secret: process.env.SECRET || 'secret',
}