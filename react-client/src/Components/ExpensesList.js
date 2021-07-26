import axios from 'axios';
import { useState, useEffect } from 'react';



export default function List() {

  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    axios.get('/api/expenses')
      .then((res) => {
        setExpenses(res.data);
      })
  }, [])

  return (
    <div style={{width: "80%"}}>
      <ul>
        {expenses.map(expense=> (
          <li key={expense.id} >
            {expense.name}
            {expense.cost / 100}
            {expense.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

