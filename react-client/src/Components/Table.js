import axios from 'axios';
import { XGrid } from '@material-ui/x-grid';
import Button from '@material-ui/core/Button';

const flex = 1;

const columns = [
  { field: 'id',
    headerName: 'ID',
    flex: flex / 2,
    description: "ID number in the database",
  },
  {
    field: 'name',
    headerName: 'Expense',
    flex,
    description: "Name/Description of the expense",
  },
  {
    field: 'cost',
    headerName: 'Cost',
    flex,
    description: "The cost of the expense in dollars",
    // Convert pennies to dollars
    valueFormatter: (params) => {
      const valueFormatted = Number(params.value / 100).toLocaleString();
      return `$${valueFormatted} `;
    },
  },
  {
    field: 'category',
    headerName: 'Category',
    flex,
    description: "The category of the expense",
  },
  {
    field: 'timestamp',
    headerName: 'Timestamp',
    flex,
    description: "Timestamp of the expense",
  },
];

export default function DataTable(props) {

  const { rows, selectedRows, setSelectedRows } = props;

  const deleteRows = async () => {

    for (let row of selectedRows) {
      try {
        const res = await axios.delete(`/api/expenses/${row}`);
        console.log("DATA: ", res.data);
      } catch (err) {
        return console.log("ERROR: ", err);
      }
    }
  
  }

  // Change to XGrid for multiple selection
  return (
    <div style={{ height: 400, width: '100%', backgroundColor: 'white', borderRadius: '4px' }}>
      <XGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
        selectionModel={selectedRows}
      />
      <Button variant="contained" color="secondary" onClick={deleteRows}>Delete</Button>
    </div>
  );
}