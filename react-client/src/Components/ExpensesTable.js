import axios from 'axios';
import { useState, useEffect } from 'react';
import DataTable from './Table';



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
      <DataTable rows={expenses}/>
    </div>
  );
}

