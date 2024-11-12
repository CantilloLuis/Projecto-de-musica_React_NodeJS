import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


function Profile() {

    const [getUsername, setUsername] = useState("");
    const location = useLocation();

    useEffect(() => {
        const { username } = location.state || "";
        if (username) {
            try {
                //Capturamos el username
                setUsername(username);
            } catch (error) {
                console.error("Error al obtener el username:", error);
            }
        }
    }, [location.state]);



    return (
        <div class="profile">
            <i class='bx bxs-bell'></i>
            <i class='bx bxs-cog'></i>
            <div class="user">
                <div class="left">
                    <img src="assets/profile.png" />
                </div>
                <div class="right">
                    <h5>{getUsername}</h5>
                </div>
            </div>
        </div>
    );
}

export default Profile;
