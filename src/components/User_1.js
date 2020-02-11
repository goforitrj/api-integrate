import React from 'react';
import axios from 'axios';
import useAsync from '../hook/useAsync';

async function getUser(id) {
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
}
function User({ id }) {
    // set [id] as second parameter of useAsync
    // for recalling api only when [id] is changed (function of useEffet)
    // if you click same user then there is no api call
    // but if you click another user then there is a api call
    const [state] = useAsync(() => getUser(id), [id], false);
    const { loading, data: user, error } = state;

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
