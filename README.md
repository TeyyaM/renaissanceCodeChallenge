# Instructions

- Built in node v14.16.0
- Using MySQL v8.42

!["Expense Tracker"](https://github.com/TeyyaM/renaissanceCodeChallenge/blob/master/docs/expense-tracker.png)

Run and sign in to _MySQL_ on the terminal as a user with permissions to create databases. Run the command `CREATE DATABASE renaissance_challenge_expenses;`. Optionally, `renaissance_challenge_expenses` can be substituted for another name.

Rename the `example.env` file to `.env`. _Afterwards_, fill in the missing keys with a user with permissions to Create, Drop, and Insert into tables. The username for `DB_USER` and password for `DB_PASS`. If `renaissance_challenge_expenses` was not used for the Database's name, update the `DB_NAME` key. If not using MySQL's default port of `3306`, update the `DB_PORT` key.

In the root directory folder of the project, run `npm install`. Open another terminal in the same directory. Run `npm run express` in one, and `npm run react` in the other. The backend will run on `http://localhost:8080`. If changing the port, update both express-backend/.env and the proxy value in react-client/package.json. React will run on [http://localhost:3000](http://localhost:3000), click the link to view it in the browser.
