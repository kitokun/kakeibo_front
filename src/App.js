import './App.css';
import DataTable from './components/TransactionsTable';
import TransactionsDialog from './components/TransactionsDialog';

function App() {
  return (
    <div className="App">
      <body className='App-body'>
        <DataTable />
        <TransactionsDialog />
      </body>
    </div>
  );
}

export default App;
