import axios from 'axios';

export default async function submitTransaction(amount, nominal, destination, source, description) {
    let data = {
        amount: amount,
        nominal: nominal,
        destination: destination,
        source: source,
        description: description,
    };
    const res = await axios.post('http://0.0.0.0:8080/money_transaction/create', data);
    console.log(res);
}