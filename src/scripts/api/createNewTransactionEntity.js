import axios from 'axios';

export default async function submitNewTransactionEntity(transactionEntity, transactionEntityType) {
    let data = {
        transaction_entity: transactionEntity,
        transaction_entity_type: transactionEntityType,
    };
    const res = await axios.post('http://0.0.0.0:8080/transaction_entity', data);
    console.log(res);
}