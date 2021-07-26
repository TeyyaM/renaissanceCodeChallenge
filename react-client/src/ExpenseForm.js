import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


export default function Form() {

  const [expense, setExpense] = useState({ name: "", cost: "", category: "" });
  const [issue, setIssue] = useState(false);

  const formStyling = {
    backgroundColor: 'white', 
    padding: '1rem', 
    borderRadius: '4px', 
    display: 'flex',
    alignContent: 'space-around',
    justifyContent: 'space-around',
    width: '80%'
  };

  const submitExpense = (event) => {
    event.preventDefault();
    // Check there is an expense and the cost is a number
    (expense.name && /^\d+$/.test(expense.cost))
    ? axios.post('/api/expenses', expense) 
      .then(res => {
        console.log("POST", res.data)
        setExpense(prev => ({ ...prev, name: "", cost: "", category: "" }))
      })
      .catch(err => console.log("ERROR", err))
    : console.log('not valid');
    // : setIssue(true);
  };

  // const submitExpense = (event) => {
  //   event.preventDefault();
  //   console.log('I tried to send a message')
  //   axios.post('/api/expenses', { name: "Lost wallet", cost: 1000, category: null }) 
  //     .then(res => console.log("POST", res.data))
  //     .catch(err => console.log("ERROR", err));
  // }

  function nameHandler(event) {
    setExpense(prev => ({ ...prev, name: event.target.value }))
  };

  function costHandler(event) {
    setExpense((prev) => ({ ...prev, cost: event.target.value }))
  };

  function categoryHandler(event) {
    setExpense((prev) => ({ ...prev, category: event.target.value }))
  };

  return (
    <form noValidate autoComplete="off" onSubmit={submitExpense} style={ formStyling }>

        <TextField
          id="outlined-basic"
          label="Expense"
          variant="outlined"
          value={expense.name}
          onInput={nameHandler}
          />

        <TextField
          id="outlined-basic"
          label="Cost ($)"
          variant="outlined"
          value={expense.cost}
          onInput={costHandler}
          />

        <TextField
          id="outlined-basic"
          label="Category"
          variant="outlined"
          value={expense.category}
          onInput={categoryHandler}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit" >
            Submit Expense
          </Button>

    </form>

  );
}

