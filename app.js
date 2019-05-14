const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
// Config
const config = require('./config/config');

// Mongoose
mongoose.connect(config.mongodb, { useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', () => console.error('mongo connection error!'));
db.once('open', () => console.log('mongo connecting!'));

// Middleware 
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views','./view');
app.set('view engine','ejs');

// Route
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

// Router
app.use('/', indexRoutes);
app.use('/api', apiRoutes);


// // Error Hnadler
// app.use((err, req, res, next) => {
//     res.status(500).json({
//         message:'error handle',
//         error: err
//     });
// });

app.listen(config.port, console.log('server listening!'));
