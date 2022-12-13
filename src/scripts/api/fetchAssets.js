import axios from "axios";

export default async function fetchAssets() {
    const res = await axios.get('http://0.0.0.0:8080/asset');
    return new Array(res.data);
}