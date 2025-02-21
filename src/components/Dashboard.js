// src/components/Dashboard.js
import React from 'react';

const Dashboard = ({ referrals, points }) => {
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Total Referrals: {referrals.length}</p>
            <p>Points Balance: {points}</p>
            {/* Add more statistics as needed */}
        </div>
    );
};

export default Dashboard;