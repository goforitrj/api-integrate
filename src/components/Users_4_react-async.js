import React, { useState } from 'react';
import axios from 'axios';
// import useAsync from '../hook/useAsync';
import { useAsync } from 'react-async';
import User from './User_2_react-async';

async function getUsers() {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
}

function Users() {
    const [userId, setUserId] = useState(null);

    // const { data: users, isLoading, error, reload } = useAsync({
    //     promiseFn: getUsers
    // });
    const { data: users, isLoading, error, run } = useAsync({
        deferFn: getUsers
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;
    if (!users) return <button onClick={run}>Fetch users data</button>;
    return (
        <>
            <ul>
                {users.map(user => (
                    <li
                        key={user.id}
                        onClick={() => {
                            setUserId(user.id);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={run}>Fetch users data </button>
            {userId && <User id={userId} />}
        </>
    );
}

export default Users;
