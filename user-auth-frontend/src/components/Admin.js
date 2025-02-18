import React from 'react';
import axios from 'axios';

const Admin = ({ token }) => {
    const [message, setMessage] = React.useState('');

    const accessAdmin = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admin', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(response.data);
        } catch (error) {
            setMessage('Access denied');
        }
    };

    return (
        <div>
            <h2>Admin Area</h2>
            <button onClick={accessAdmin}>Access Admin Area</button>
            <p>{message}</p>
        </div>
    );
};

export default Admin;