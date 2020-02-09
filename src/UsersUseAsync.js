import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUsers() {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
}

function Users() {
    const [state, refetch] = useAsync(getUsers, []);

    const { loading, error, data: users } = state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;
    if (!users) return null;
    return (
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={refetch}>Fetch users data </button>
        </>
    );
}

export default Users;
