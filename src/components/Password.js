// src/components/Profile.js
import React, { useState } from 'react';
import axios from 'axios';

const Profile = ({ token }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdateProfile = async () => {
        try {
            const response = await axios.put('http://localhost:3000/profile', {
                username,
                email,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage('Error updating profile: ' + (error.response?.data || 'Unknown error'));
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleUpdateProfile}>Update Profile</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Profile;