// Query helper functions return promises that query the database
const generateQueryHelpers = (connection) => {

  const fetchExpensesByUserId = (userId) => {
    return new Promise(function(resolve, reject) {
      return connection.query(`SELECT * FROM expenses
                          WHERE expenses.user_id = ?`,
        [userId], (err, results) => {
          if (err) return reject(err);
          console.log("user #1's expenses", results);
          resolve(results);
      })
    })
  };
   
  const fetchUserId = (input) => {
    return new Promise(function(resolve, reject) {

      return connection.query(`SELECT id FROM users
                          WHERE email = ? AND password = ?`,
        [input.email, input.password], (err, results) => {
          if (err) return reject(err);
          resolve(results[0].id);
        })
    })
  };

  const insertExpense = () => {
    return new Promise(function(resolve, reject) {
      return connection.query(`INSERT INTO expenses (name, cost, category, user_id)
                          VALUES (?, ?, ?, ?)`,
      ['Water', 600, 'Bills', 1], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    })
  };
insertExpense()
  return {
    fetchExpensesByUserId,
    fetchUserId,
    insertExpense
  };
};

module.exports = generateQueryHelpers;
