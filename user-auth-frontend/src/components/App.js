import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import Referrals from './components/Referrals';

const App = () => {
    const [token, setToken] = useState('');

    return (
        <div className="App">
            <h1>User Authentication System</h1>
            {!token ? (
                <>
                    <Register />
                    <Login setToken={setToken} />
                </>
            ) : (
                <>
                    <h2>Welcome!</h2>
                    <Admin token={token} />
                    <Referrals token={token} />
                </>
            )}
        </div>
    );
};

export default App;