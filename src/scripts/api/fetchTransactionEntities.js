import axios from "axios";

export default async function fetchTransactionEntities() {
    const res = await axios.get('http://0.0.0.0:8080/transaction_entity');
    console.log(res.data);
    return res.data;
}