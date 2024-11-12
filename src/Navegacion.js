// Navegacion.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import App from './App';

const Navegacion = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserLogin />} />
                <Route path="/home" element={<App />} />
            </Routes>
        </Router>
    );
};

export default Navegacion;
