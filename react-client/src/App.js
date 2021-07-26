import './App.css';
import Form from './Components/ExpenseForm';
import Table from './Components/ExpensesTable';

const App = () => {



  return (
    <div className="App">
        <header>
          Expenses tracker! Keep track of what you're spending on :)
        </header>
        <Form />
        <Table />
    </div>
  );
}

export default App;
