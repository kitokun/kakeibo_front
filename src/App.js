import './App.css';
import DataTable from './components/TransactionsTable';
import TransactionsDialog from './common/TransactionsDialog';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DataTable />
        <TransactionsDialog />
      </header>
    </div>
  );
}

export default App;
