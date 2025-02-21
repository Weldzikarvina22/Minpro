// src/components/PasswordReset.js
import React, { useState } from 'react';
import axios from 'axios';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordReset = async () => {
        try {
            const response = await axios.post('http://localhost:3000/password-reset', { email });
            setMessage('Password reset link sent to your email!');
        } catch (error) {
            setMessage('Error sending password reset link: ' + (error.response?.data || 'Unknown error'));
        }
    };

    return (
        <div>
            <h2>Password Reset</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handlePasswordReset}>Send Reset Link</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PasswordReset;