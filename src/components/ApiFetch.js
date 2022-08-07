import React, { useState, useEffect } from "react";
import axios from "axios";

const ApiFetch = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('http://0.0.0.0:8080/money_transaction/get')
        .then(res => {
            setPosts(res.data)
            console.log(res.data)
        })
    }, [])


    return (
        <div>
            <ul>
                {
                    posts.map(post => <li key={post.id}>{post.amount}</li>)
                }
            </ul>
        </div>
    )
}

export default ApiFetch