import React, { useState } from 'react';
import axios from 'axios';
import '../login.css';
import { useNavigate } from 'react-router-dom';


function UserLogin() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Inicializamos el hook


    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');  // Reset error on toggle
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/user/login', {
                username,
                password,
            });
            alert('Inicio de sesión exitoso');
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
            alert('Cuenta registrada exitosamente');
            // Redirigir al login o hacer otra acción después del registro
            // setIsLogin(true);
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
                    </div>
                )}

                {/* Panel derecho */}
                <div className="right">
                    <h1>¡Bienvenido!</h1>
                    <p>Espero y disfrutes de este maravilloso sitio web</p>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
