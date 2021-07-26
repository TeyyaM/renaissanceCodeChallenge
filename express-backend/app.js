// load .env data into process.env
const dotenv = require('dotenv');
dotenv.config();

const createError = require('http-errors');
const express = require('express');

const app = express();

// Setup database for queries
const mysql = require('mysql');
const generateQueryHelpers = require("./bin/dbHelpers.js");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to the database');
});

const {
  fetchExpensesByUserId,
  fetchUserId,
  insertExpense } = generateQueryHelpers(connection);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// returns JSON of user's expenses
app.get('/api/expenses', (req, res) => {

  // Hardcoded user for development
  fetchUserId({ email: 'example@example.com', password: 'password' })
    .then((userId) => {
      return fetchExpensesByUserId(userId);
    })
    .then((expenses) => res.json(expenses));
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
