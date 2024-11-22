import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Profile() {

    const [getUsername, setUsername] = useState("");
    const location = useLocation();
    const navigate = useNavigate(); // Inicializamos el hook


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


    const cerrar_sesion = () => {
        navigate('/');
    }


    return (
        <div className="profile">
            <i className='bx bxs-bell'></i>
            <i className='bx bxs-cog'></i>
            <i className='bx bx-log-out' onClick={cerrar_sesion}> Cerrar sesion</i>

            <div className="user">
                <div className="left">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
                </div>
                <div className="right">
                    <h5>{getUsername}</h5>
                </div>
            </div>
        </div>
    );
}

export default Profile;
