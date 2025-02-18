import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Default role
    const [referrer, setReferrer] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:3000/register', {
                username,
                password,
                role,
                referrer,
            });
            setSuccessMessage('Registration successful!'); // Handle success
        } catch (error) {
            setErrorMessage('Error registering user: ' + error.response.data);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {errorMessage && <strong>{errorMessage}</strong>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="customer">Customer</option>
                        <option value="event_organizer">Event Organizer</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="referrer">Referrer (optional)</label>
                    <input
                        id="referrer"
                        type="text"
                        name="referrer"
                        value={referrer}
                        onChange={(e) => setReferrer(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default Register;