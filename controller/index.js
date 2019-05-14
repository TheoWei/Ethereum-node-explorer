const { web3_rpc } = require('../config/config');
const blockchain = require('../models/Blockchain');
const blockchains = new blockchain(web3_rpc);

module.exports = {
    main: async (req, res, next) => {
        try {
            const nodeData = await blockchains.nodeInformation();
            const { username } = req.cookies;
            //token check 
            const output = Object.keys(nodeData).map((item, i) => {
                return [item, Object.values(nodeData)[i]];
            })            
            res.render('index', { output, username });
            
        } catch (err) {
            res.status(500).json({ message: 'GET Node Failed!', error: err });
        }
    },

    login: (req, res, next) => {
        res.render('login');
    },

    logout: (req, res, next) => {
        res.clearCookie('token', '/user');
        res.clearCookie('username', '/user');
        res.redirect('/');
    },

    user: (req, res, next) => {
        const { username, token } = req.cookies;
        res.render('user', { token, username });
    },

    signup: (req, res, next) => {
        res.render('signup');
    },

    search: (req, res, next) => {
        const { condition, keyword } = req.body;
        let require = { path: '', maxAge: 300 * 1000 };
        if (condition === 'block') require.path = '/block';
        else if (condition === 'address') require.path = '/address';
        else if (condition === 'transaction') require.path = '/transaction';
        else res.status(500).json({ message: 'search failed!' });
        res.cookie('keyword', keyword, require);
        res.redirect(require.path.slice(1));
    },

    block: async (req, res, next) => {
        try {
            const { keyword, username } = req.cookies;
            const blockData = await blockchains.blockInformation(keyword);
            //token check             
            const output = Object.keys(blockData).map((item, i) => {
                return [item, Object.values(blockData)[i]];
            })
            res.render('block', { output,username });
        } catch (err) {
            res.status(500).json({ message: 'GET Block Failed!', error: err });
        }
    },

    address: async (req, res, next) => {
        try {
            const { keyword,username } = req.cookies;
            const addressData = await blockchains.addressStatus(keyword);
            //token check 
            const output = Object.keys(addressData).map((item, i) => {
                return [item, Object.values(addressData)[i]];
            })
            res.render('address', { output,username });
        } catch (err) {
            res.status(500).json({ message: 'GET Address Failed!', error: err });
        }
    },

    transaction: async (req, res, next) => {
        try {
            const { keyword,username } = req.cookies;
            const txData = await blockchains.txStatus(keyword);
            //token check 
            const output = Object.keys(txData).map((item, i) => {
                return [item, Object.values(txData)[i]];
            })
            res.render('transaction', { output,username });
        } catch (err) {
            res.status(500).json({ message: 'GET Tx Failed!', error: err });
        }
    },

}