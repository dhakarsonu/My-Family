require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const isAuthenticated = require('./services/auth.service');
const errorHandler = require('./common/errorHandler');

//Routs
const login = require('./routes/login');
const signup = require('./routes/signup');
const dashboard = require('./routes/dashboard');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// dashboard routes with authentication
app.use('/api',isAuthenticated,dashboard)

// api routes
app.use('/login', login);
app.use('/signup', signup);

// error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});