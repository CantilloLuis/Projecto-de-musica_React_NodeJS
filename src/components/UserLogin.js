import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../login.css';
import { useNavigate } from 'react-router-dom';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2';



function UserLogin() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Inicializamos el hook
    const [AlertState, setAlertState] = useState(false)


    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    useEffect(() => {
        let timer;
        if (AlertState) {
            timer = setTimeout(() => {
                setAlertState(false);
            }, 20000);
        }

        return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }, [AlertState]);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/user/login', {
                username,
                password,
            });
            //SweetAlert para que salga despues de iniciar sesion
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Inicio de sesión exitoso",
                showConfirmButton: false,
                timer: 10000
            });

            // Guardar el token en localStorage o contexto global
            localStorage.setItem('token', response.data.token);
            // Pasar el token a la siguiente ruta usando 'state' en navigate
            navigate('/home', { state: { token: response.data.token, username: response.data.user.username } });
        } catch (err) {
            setError('Usuario o contraseña incorrectos');
        }
    };

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/user/signup', {
                username,
                email,
                password,
            });
            //Cambiando estado de la alerta a true para que cuando se registre el usuarios le aparezca
            setAlertState(true)

            //Limpieza de campos despues de registrar
            setEmail('');
            setUsername('');
            setPassword('');
            setPassword('');
            setConfirmPassword('');

        } catch (err) {
            setError('Error al registrar la cuenta');
        }
    };

    return (
        <div className="contenedor">
            <div className="form-box">
                {/* Formulario de Login */}
                {isLogin ? (
                    <div className=" login-form">
                        <h2>Login</h2>
                        {error && <div className="error">{error}</div>}
                        <div className="input-box">
                            <i className='bx bxs-user'></i>
                            <input
                                type="text"
                                id="loginUsername"
                                placeholder="Usuario"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <i className='bx bxs-lock-alt'></i>
                            <input
                                type="password"
                                id="loginPassword"
                                placeholder="Contraseña"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="action-btn" onClick={handleLogin}>Iniciar sesión</button>
                        <p>No tienes una cuenta? <a href="#" className='showSignup' onClick={toggleForm}>Registrarse</a></p>
                    </div>
                ) : (
                    // Formulario de Registro
                    <div className="signup-form">
                        <h2>Registrarse</h2>
                        {error && <div className="error">{error}</div>}
                        <div className="input-box">
                            <i className='bx bxs-user'></i>
                            <input
                                type="text"
                                id="signupUsername"
                                placeholder="Usuario"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <i className='bx bxs-envelope'></i>
                            <input
                                type="email"
                                id="signupEmail"
                                placeholder="Correo electrónico"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <i className='bx bxs-lock-alt'></i>
                            <input
                                type="password"
                                id="signupPassword"
                                placeholder="Contraseña"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <i className='bx bxs-lock-alt'></i>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirmar Contraseña"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button className="action-btn" onClick={handleSignup}>Registrar</button>
                        <p>Ya tienes una cuenta? <a href="#" className="showLogin" onClick={toggleForm}>Iniciar sesión</a></p>
                        {AlertState && (
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="success">
                                    <AlertTitle>Success</AlertTitle>
                                    Usuario registrado exitosamente!
                                </Alert>
                            </Stack>
                        )}
                    </div>
                )}

                {/* Panel derecho */}
                <div className="right">
                    <h1>¡Bienvenido!</h1>
                    <p>Espero y disfrutes de este maravilloso sitio web de musica</p>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
