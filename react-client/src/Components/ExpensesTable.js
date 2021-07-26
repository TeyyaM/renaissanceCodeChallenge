import axios from 'axios';
import { useState, useEffect } from 'react';
import DataTable from './Table';



export default function List() {

  const [expenses, setExpenses] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios.get('/api/expenses')
      .then((res) => {
        setExpenses(res.data);
      })
  }, [expenses])



  return (
    <div style={{width: "80%"}}>
      <DataTable rows={expenses} 
      selectedRows= {selectedRows}
      setSelectedRows={setSelectedRows} />
    </div>
  );
}

