const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const User = require('../models/User');

module.exports = {
    signup: (req, res, next) => {
        const { email, username, password, confirm } = req.body;
        if (password !== confirm) res.status(500).json({ message: 'password not match!' });
        else {
            User.find({ email })
                .exec()
                .then(result => {
                    if (result.length >= 1) res.status(400).json({ message: 'email is exist!' });
                    else {
                        bcrypt.hash(password, 10)
                            .then(hash => {
                                const user = new User({ email, username, password: hash });
                                user.save()
                                    .then(() => {
                                        console.log('new user!');
                                        return res.redirect('/login');
                                    })
                                    .catch(err => res.status(500).json({ message: 'store data failed!', error: err }));
                            })
                            .catch(err => res.status(500).json({ message: 'password encrpyt failed!', error: err }));
                    }
                })
                .catch(err => res.status(500).json({ message: 'check user exist failed!', error: err }));
        }
    },

    login: (req, res, next) => {
        const { email, password } = req.body;
        User.find({ email })
            .exec()
            .then(result => {
                bcrypt.compare(password, result[0].password)
                    .then(status => {
                        if (!status) res.status(500).json({ message: '' });
                        else {
                            const token = jwt.sign({ email: result[0].email, username: result[0].username }, config.secret, { expiresIn: '30 days' });
                            // redis.store(token);                            
                            res.cookie('username', result[0].username, {path:'/user', maxAge: 300*1000});
                            res.cookie('username', result[0].username, {path:'/', maxAge: 300*1000});
                            res.cookie('token', token, {path: '/user', maxAge: 300*1000});                           
                            return res.redirect('user'); 
                        }
                    })
                    .catch(err => res.status(500).json({ message: 'wrong password!', error: err }));
            })
            .catch(err => res.status(500).json({ message: 'user isn\'t exist!', error: err }));

    },


}