import './App.css';
import Form from './Components/ExpenseForm';
import List from './Components/ExpensesList';
import DataTable from './Components/Table';
const App = () => {



  return (
    <div className="App">
        <Form />
        <List />
        <DataTable />
    </div>
  );
}

export default App;
