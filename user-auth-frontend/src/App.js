import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import Referrals from './components/Referral';
import './App.css';

const App = () => {
    const [token, setToken] = useState('');

    const handleLogout = () => {
        setToken('');
        // Optionally, clear token from local storage if you are using it
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <div className="App">
                <h1>User Authentication System</h1>
                <Routes>
                    <Route path="/" element={!token ? (
                        <>
                            <Register />
                            <Login setToken={setToken} />
                        </>
                    ) : (
                        <Navigate to="/dashboard" />
                    )} />
                    <Route path="/dashboard" element={token ? (
                        <>
                            <h2>Welcome!</h2>
                            <Admin token={token} />
                            <Referrals token={token} />
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <Navigate to="/" />
                    )} />
                    {/* Add more routes as needed */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;