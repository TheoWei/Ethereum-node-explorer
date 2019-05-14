const Web3 = require('web3');
class Node {
    constructor(web3_rpc) {
        this.web3 = new Web3(web3_rpc);
    }
    nodeInformation() {
        let obj = {};
        return this.web3.eth.net.getNetworkType()
            .then(res => { obj.NetworkType = res; return this.web3.eth.net.isListening(); })
            .then(res => { obj.isListening = res; return this.web3.eth.net.getPeerCount(); })
            .then(res => { obj.PeerCount = res; return this.web3.eth.net.getId(); })
            .then(res => { obj.Id = res; return this.web3.eth.getCoinbase(); })
            .then(res => { obj.Coinbase = res; return this.web3.eth.getGasPrice(); })
            .then(res => { obj.GasPrice = res; return this.web3.eth.isMining(); })
            .then(res => { obj.isMining = res; return this.web3.eth.getBlockNumber(); })
            .then(res => { obj.BlockNumber = res; return this.web3.eth.getAccounts(); })
            .then(res => { obj.Accounts = res; return obj; })
            .catch(err => Promise.reject(err))
    }

    addressStatus(address) {
        let obj = {};
        return this.web3.eth.getBalance(address)
            .then(res => { obj.Balance = res; return this.web3.eth.getTransactionCount(address) })
            .then(res => { obj.TransactionCount = res; return this.web3.eth.getCode(address); })
            .then(res => { obj.Code = res; return this.web3.eth.getStorageAt(address); })
            .then(res => { obj.StorageAt = res; return obj; })
            .catch(err => Promise.reject(err))
    }

    txStatus(txHash) {
        return this.web3.eth.getTransaction(txHash)
            .then(res => { return res;})
            .catch(err => Promise.reject(err))
    }

    txReceiptStatus(txHash) {
        return this.web3.eth.getTransactionReceipt(txHash)
            .then(res => { return res;})
            .catch(err => Promise.reject(err))
    }

    blockInformation(blockHashOrNumber) {
        let obj = {};
        return this.web3.eth.getBlock(blockHashOrNumber)
            .then(res => { return res;})
            .catch(err => Promise.reject(err))
    }
}

module.exports = Node;