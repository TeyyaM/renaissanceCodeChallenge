import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from './Alert';
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
    justifyContent: 'space-between',
    marginTop: '3rem',
    marginBottom: '3rem'

  };

  const submitExpense = (event) => {
    event.preventDefault();
    // Check there is an expense and the cost is a number
    (expense.name && /^\d+$/.test(expense.cost))
    ? axios.post('/api/expenses', expense) 
      .then(() => {
        setIssue(false);
        setExpense(prev => ({ ...prev, name: "", cost: "", category: "" }));
      })
      .catch(err => console.log("ERROR", err))
    : setIssue(true);
  };

  function nameHandler(event) {
    setExpense(prev => ({ ...prev, name: event.target.value }));
  };

  function costHandler(event) {
    setExpense((prev) => ({ ...prev, cost: event.target.value }));
  };

  function categoryHandler(event) {
    setExpense((prev) => ({ ...prev, category: event.target.value }));
  };

  return (
    <div style={{width: "80%"}}>
      <Alert
        severity="error"
        message="Input is invalid! Please make sure there is an expense and the cost is a number!"
        open={issue}
      />
      <form noValidate autoComplete="off" onSubmit={submitExpense} style={ formStyling }>

        <TextField
          id="name"
          label="Expense"
          variant="outlined"
          value={expense.name}
          onInput={nameHandler}
          />
        <TextField
          id="cost"
          label="Cost ($)"
          variant="outlined"
          value={expense.cost}
          onInput={costHandler}
          />
        <TextField
          id="category"
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
    </div>
  );
}

