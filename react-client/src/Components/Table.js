import { DataGrid } from '@material-ui/data-grid';

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
  const { rows } = props;

  return (
    <div style={{ height: 400, width: '100%', backgroundColor: 'white', borderRadius: '4px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
      />
    </div>
  );
}