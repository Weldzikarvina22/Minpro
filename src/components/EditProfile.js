import React from "react";
import { UploadProfilePhoto } from "./UploadProfilePhoto";

const EditProfile = () => {
    return (
        <div>
            <h2>Update Profile Info</h2>
            <form>
                <div>
                    <label>Name: </label>
                    <input type="text" placeholder="Your name" />
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" placeholder="Your email" />
                </div>
                {/* Upload Profile Photo */}
                <UploadProfilePhoto />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;