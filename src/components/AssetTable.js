import * as React from 'react';
import fetchAssets from '../scripts/api/fetchAssets';
import { useState, useEffect } from 'react';

export default function AssetTable() {
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        const get = async() => {
            const data = await fetchAssets();
            console.log(data)
            setRows(data);
        };
        get();
    }, [])
    
    const amount = rows.map((t) => t.amount);

    return (
        <div style={{ height: 200, width: 300}}>
            <span style={{color: "black"}}>
                資産金額：{amount}
            </span>
        </div>
    );
}