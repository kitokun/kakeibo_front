import axios from "axios";

export default async function fetchTransactions() {
    const res = await axios.get('http://0.0.0.0:8080/money_transaction');
    console.log(res.data);
    return res.data;
}