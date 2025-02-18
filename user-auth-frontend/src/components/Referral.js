import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Referrals = ({ token }) => {
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getReferrals = async () => {
        setLoading(true);
        setError(''); // Clear previous errors

        try {
            const response = await axios.get('http://localhost:3000/referrals', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReferrals(response.data);
        } catch (error) {
            setError('Error fetching referrals: ' + (error.response?.data || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    // Fetch referrals automatically when the component mounts
    useEffect(() => {
        getReferrals();
    }, []);

    return (
        <div>
            <h2>Your Referrals</h2>
            {loading && <p>Loading referrals...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {referrals.length === 0 && !loading && <p>You have no referrals yet.</p>}
            <ul>
                {referrals.map((referral, index) => (
                    <li key={index}>{referral.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default Referrals;