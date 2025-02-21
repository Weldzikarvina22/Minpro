import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        referralCode: '',
        role: 'user',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [referralCode, setReferralCode] = useState(''); // Add state for referral code

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        try {
            // Make the POST request to your backend API
            const response = await axios.post('http://localhost:3000/register', formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('Response from backend:', response.data);


            // Handle success response and extract referral
            const { message, referralCode } = response.data; // Destructure response
            setSuccessMessage(message); // Update success message
            setReferralCode(referralCode); // Update referral code state
        } catch (error) {
            // Handle error response
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Failed to register user.');
            } else {
                setError('An unexpected error occurred.');
            }
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && (
                <div>
                    <p style={{ color: 'green' }}>{successMessage}</p>
                    {referralCode && (
                        <p>Your referral code: <strong>{referralCode}</strong></p>
                    )}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                {/* Username */}
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Email */}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Password */}
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Referral */}
                <div>
                    <label>Referralcode:</label>
                    <input
                        type="text"
                        name="referralCode"
                        value={formData.referralCode}
                        onChange={handleChange}
                    />
                </div>
                {/* Role */}
                <div>
                    <label>Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};


export default Register;