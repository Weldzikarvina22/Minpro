import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import Referrals from './components/Referral';
import UploadProfilePhoto from './components/UploadProfilePhoto'; // Import the UploadProfilePhoto
import Profile from './components/Profile';
import './App.css';

const App = () => {
    const [token, setToken] = React.useState(localStorage.getItem('token') || '');

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <div className="App">
                <h1>User Authentication System</h1>
                <Routes>
                    {/* Home route */}
                    <Route
                        path="/"
                        element={!token ? (
                            <>
                                <Register />
                                <Login setToken={setToken} />
                            </>
                        ) : (
                            <Navigate to="/dashboard" replace />
                        )}
                    />

                    {/* Dashboard with referral and profile upload */}
                    <Route
                        path="/dashboard"
                        element={
                            token ? (
                                <>
                                    <h2>Welcome!</h2>
                                    <Admin token={token} />
                                    <Referrals token={token} />
                                    {/* Directly include component */}
                                    <UploadProfilePhoto />
                                    <button onClick={handleLogout}>Logout</button>
                                </>
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            token ? ( // Check if the user is authenticated to view this page
                                <Profile />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />

                    {/* Separate route for profile photo upload */}
                    <Route
                        path="/upload-profile-photo"
                        element={
                            token ? (
                                <>
                                    <h2>Upload Your Profile Photo</h2>
                                    <UploadProfilePhoto />
                                    <button onClick={handleLogout}>Logout</button>
                                </>
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />

                    {/* Fallback for undefined routes */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;