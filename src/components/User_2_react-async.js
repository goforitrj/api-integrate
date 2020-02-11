import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';

async function getUser({ id }) {
    // need to use {id} with braces
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
}

function User({ id }) {
    const { loading, data: user, error } = useAsync({
        promiseFn: getUser,
        id,
        watch: id //whenever id is changed call promiseFn again
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;
    if (!user) return null;

    return (
        <div>
            <h2>{user.username}</h2>
            <p>
                <b>Email:</b> {user.email}
            </p>
        </div>
    );
}

export default User;
