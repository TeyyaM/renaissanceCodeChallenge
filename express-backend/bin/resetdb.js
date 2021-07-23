// load .env data into process.env
const dotenv = require('dotenv');
dotenv.config();

// Setup database for queries
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Create database tables
const createTables = () => {
  try {
    connection.query('DROP TABLE IF EXISTS users;');
    connection.query('DROP TABLE IF EXISTS expenses;');
    connection.query('CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(255))');
    connection.query('CREATE TABLE expenses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, cost INT NOT NULL, category VARCHAR(255) NOT NULL, timestamp TIMESTAMP NOT NULL DEFAULT NOW())');
  } catch (err) {
    return console.log("ERROR: ", err);
  }

};

// Seed with test account(s) and expense(s)
const seedTables = () => {
  try {
    connection.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', ['example@example.com', 'password', 'Fake User']);
    connection.query('INSERT INTO expenses (name, cost, category) VALUES (?, ?, ?)', ['Electricity', 300, 'Bills']);
    connection.query('SELECT * FROM users', function(err, results) {
      if (err) throw err;
      console.log("users table", results);
    });
    connection.query('SELECT * FROM expenses', function(err, results) {
      if (err) throw err;
      console.log("expenses table", results);
    });
  } catch (err) {
    return console.log("ERROR: ", err);
  }
};

// Create connection and reset database
connection.connect((err) => {
  if (err) throw err;
  console.log('Successful connection!');
  createTables();
  // Comment out 'seedTables();' once in production
  seedTables();
  connection.end();
});
