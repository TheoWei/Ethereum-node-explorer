const express = require('express');
const router = express.Router();
const tokenAuth = require('../middlewares/tokenAuth');
const Controller = require('../controller/api');

router.route('/v1/node').get(tokenAuth, Controller.getNodeInformation);
router.route('/v1/address').get(tokenAuth, Controller.getAddressStatus);
router.route('/v1/transaction').get(tokenAuth, Controller.getTxStatus);
router.route('/v1/transactionReceipt').get(tokenAuth, Controller.getTxReceiptStatus);
router.route('/v1/block').get(tokenAuth, Controller.getBlock);


module.exports = router;