const express = require('express');
const router = express.Router();

const Controller = require('../controller/index');
const UserController = require('../controller/user');

router.route('/').get(Controller.main);
router.route('/user').get(Controller.user);
router.route('/block').get(Controller.block);
router.route('/address').get(Controller.address);
router.route('/transaction').get(Controller.transaction);

router.route('/search').post(Controller.search);

router.route('/login')
    .get(Controller.login)
    .post(UserController.login);
    
router.route('/logout').post(Controller.logout);

router.route('/signup')
    .get(Controller.signup)
    .post(UserController.signup);

module.exports = router;