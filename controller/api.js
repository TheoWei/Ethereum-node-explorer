const { web3_rpc } = require('../config/config');
const blockchain = require('../models/Blockchain');
const blockchains = new blockchain(web3_rpc);

module.exports = {
    getBlock: async (req, res, next) => {
        try {
            const { id } = req.query;
            const blockData = await blockchains.blockInformation(id);
            //token check 
            return res.status(200).json({ message: 'GET Block Information!', blockData });
        } catch (err) {
            return res.status(500).json({ message: 'GET Block Failed!', error: err });
        }
    },

    getNodeInformation: async (req, res, next) => {
        try {
            const nodeData = await blockchains.nodeInformation();
            //token check 
            return res.status(200).json({ message: 'GET Node Information!', nodeData });
        } catch (err) {
            return res.status(500).json({ message: 'GET Node Failed!', error: err });
        }

    },

    getAddressStatus: async (req, res, next) => {
        try {
            const { address } = req.query;
            const addressData = await blockchains.addressStatus(address);
            //token check 
            return res.status(200).json({ message: 'GET Address Status!', addressData });
        } catch (err) {
            return res.status(500).json({ message: 'GET Address Failed!', error: err });
        }

    },

    getTxStatus: async (req, res, next) => {
        try {
            const { hash } = req.query;
            console.log(hash);
            const txData = await blockchains.txStatus(hash);
            //token check 
            return res.status(200).json({ message: 'GET Tx Status!', txData });
        } catch (err) {
            return res.status(500).json({ message: 'GET Tx Failed!', error: err });
        }
    },

    getTxReceiptStatus: async (req, res, next) => {
        try {
            const { hash } = req.query;
            const txData = await blockchains.txReceiptStatus(hash);
            //token check 
            return res.status(200).json({ message: 'GET Tx Receipt Status!', txData });
        } catch (err) {
            return res.status(500).json({ message: 'GET Tx Receipt Failed!', error: err });
        }
    }
}