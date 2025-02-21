import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Profile = () => {
    const [photoUrl, setPhotoUrl] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [points, setpoints] = useState("");
    const [role, setrole] = useState("");
    const navigate = useNavigate(); // Using React Router's navigation hook

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setMessage("No token found. Please log in.");
                    navigate("/"); // Redirect to login if no token
                    return;
                }

                const response = await fetch("http://localhost:3000/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                console.log("Full API Response:", data); // Debugging

                if (response.ok && data.success) {
                    const photoUrl = data.user.photoUrl;// Access photoUrl inside user object
                    const userName = data.user.username;
                    const points = data.user.points;
                    const role = data.user.role;
                    if (photoUrl) {
                        setPhotoUrl(photoUrl);// Set photo URL in state
                        setUsername(userName)
                        setrole(role)
                        setpoints(points)
                        setMessage("Welcome to your profile!");
                    }
                } else {
                    setMessage(data.message || "Failed to fetch profile.");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                setMessage("An error occurred while loading the profile.");
            }
        };

        fetchProfile();
    }, [navigate]);

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove authentication token
        navigate("/"); // Redirect to login page
    };

    return (
        <div>
            <h2>{username}</h2>
            {message && <p>{message}</p>}
            <h3>{role} {points}</h3>

            {/* Display profile photo */}
            {photoUrl ? (
                <div>
                    <img
                        src={photoUrl}
                        alt="Profile"
                        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                    />
                </div>
            ) : (
                <p>No profile photo available.</p>
            )}

            {/* Logout Button */}
            <br />
            <button
                onClick={handleLogout}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Profile;