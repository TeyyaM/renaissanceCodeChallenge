// load .env data into process.env
const dotenv = require('dotenv')
dotenv.config();

// Setup database for queries
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

// Create and seed database with test data
const updateEntry = async () => {
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')

  try { 
    connection.query('DROP TABLE IF EXISTS users;')
    connection.query('CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(255))')
    connection.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', ['example@example.com', 'password', 'Fake User'])
    connection.query('SELECT * FROM users', function(err, results) {
      if (err) throw err
      console.log(results[0].id)
      console.log(results[0].email)
      console.log(results[0].password)
      console.log(results[0].name)
    })
  } catch (err) {
    return console.log("ERROR: ", err);
  }})
};

updateEntry();
