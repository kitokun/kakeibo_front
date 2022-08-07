import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import fetchTransactions from '../scripts/api/fetchTransactions';
import { useState, useEffect } from 'react';

const columns = [
    { field: 'id', headerName: 'ID', width: 70},
    { field: 'nominal', headerName: '名目', width: 80},
    { field: 'amount', headerName: '金額', width: 70},
    { field: 'destination', headerName: '支払先', width: 100},
    { field: 'source', headerName: '支払元', width: 100},
    { field: 'description', headerName: '説明', width: 200, flex: 0.3},
];

export default function DataTable() {
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        const get = async() => {
            const data = await fetchTransactions();

            setRows(data);
        };
        get();
    }, [])
    
    return (
        <div style={{ height: 400, width: '60%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
            />
        </div>
    );
}