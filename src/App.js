import React from 'react';
import Users from './components/Users';
import { UsersProvider } from './components/UsersContext';

function App() {
    return (
        <div className="App">
            <UsersProvider>
                <Users />
            </UsersProvider>
        </div>
    );
}

export default App;
