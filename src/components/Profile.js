// Profile.js
import songImage from '../assets/song-1.png'; // Ruta relativa

import React from 'react';

function Profile() {
    return (
        <div class="profile">
            <i class='bx bxs-bell'></i>
            <i class='bx bxs-cog'></i>
            <div class="user">
                <div class="left">
                    <img src="assets/profile.png" />
                </div>
                <div class="right">
                    <h5>Jhon Doe</h5>
                </div>
            </div>
        </div>
    );
}

export default Profile;
