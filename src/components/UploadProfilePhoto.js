import React, { useState } from "react";

const UploadProfilePhoto = () => {
    const [photo, setPhoto] = useState(null); // Selected photo
    const [message, setMessage] = useState(""); // Success/Error message
    const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(""); // Uploaded photo URL

    const handlePhotoUpload = async (e) => {
        e.preventDefault();

        // Ensure a photo is selected
        if (!photo) {
            setMessage("No photo selected. Please choose a file.");
            return;
        }

        const formData = new FormData();
        formData.append("photo", photo);

        try {
            const response = await fetch("http://localhost:3000/profile/upload-photo", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token
                },
                body: formData,
            });

            const data = await response.json(); // Get JSON response
            if (response.ok) {
                setMessage("Photo uploaded successfully!"); // Success message
                setUploadedPhotoUrl(data.photoUrl); // Save photo URL from the response
            } else {
                setMessage(data.message || "Failed to upload photo."); // Error from server
            }
        } catch (error) {
            console.error("Error uploading photo:", error);
            setMessage("An error occurred while uploading. Please try again.");
        }
    };

    return (
        <div>
            <h2>Upload Profile Photo</h2>
            <form onSubmit={handlePhotoUpload}>
                {/* File input */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                />
                <button type="submit">Upload Photo</button>
            </form>

            {/* Display success or error message */}
            {message && <p>{message}</p>}

            {/* Display the uploaded photo */}
            {uploadedPhotoUrl && (
                <div>
                    <h3>Uploaded Photo:</h3>
                    <img
                        src={uploadedPhotoUrl}
                        alt="Profile"
                        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                    />
                </div>
            )}
        </div>
    );
};

export default UploadProfilePhoto;