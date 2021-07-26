// Query helper functions return promises that query the database
const generateQueryHelpers = (connection) => {

  const fetchExpensesByUserId = (userId) => {
    return new Promise(function(resolve, reject) {
      return connection.query(`SELECT * FROM expenses
                          WHERE expenses.user_id = ?`,
        [userId], (err, results) => {
          if (err) return reject(err);
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

  const insertExpense = (input) => {
    const { name, cost, category, userId } = input;
    return new Promise(function(resolve, reject) {
      return connection.query(`INSERT INTO expenses (name, cost, category, user_id)
                          VALUES (?, ?, ?, ?)`,
      [name, cost * 100, category, userId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    })
  };

  return {
    fetchExpensesByUserId,
    fetchUserId,
    insertExpense
  };
};

module.exports = generateQueryHelpers;
