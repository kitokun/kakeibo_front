import './App.css';
import DataTable from './components/TransactionsTable';
import TransactionsDialog from './components/TransactionsDialog';
import AssetTable from './components/AssetTable';

function App() {
  return (
    <div className="App">
      <body className='App-body'>
        <AssetTable />
        <DataTable />
        <TransactionsDialog />
      </body>
    </div>
  );
}

export default App;
