require('dotenv').config({ path: 'variables.env' });

const express = require('express');
// const session = require('express-session');
const path = require('path');
// const flash = require('connect-flash');
// const bodyParser = require('body-parser');
const webpack = require('webpack');
// const helpers = require('./utils/helpers');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 8080;

// Template Engine
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve static files
app.use('/static', express.static(path.resolve(__dirname, '../static')));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Express Session
// app.use(session({
//   secret: process.env.APP_SECRET_KEY,
//   resave: false,
//   saveUninitialized: false,
// }));

// Flash Messages
// app.use(flash());

// Router middleware
// app.use((req, res, next) => {
//   res.locals.h = helpers;
//   res.locals.flashes = req.flash();
//   next();
// });

// App Routes
app.use(routes)

// Start app
app.listen(port,
	() => console.log(`Listening on ${port}`)
);