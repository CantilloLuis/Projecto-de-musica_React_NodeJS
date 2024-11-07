import React from 'react';
import trend from '../assets/trend.png'; // Ruta relativa


function Trending() {
    return (
        <div className="trending">
            <div className="left">
                <h5>Trending New Song</h5>
                <div className="info">
                    <h2>Lost Emotions</h2>
                    <h4>Rion Clarke</h4>
                    <h5>63 Million Plays</h5>
                    <div className="buttons">
                        <button>Listen Now</button>
                        <i className="bx bxs-heart"></i>
                    </div>
                </div>
            </div>
            <img src={trend} alt="Trending" />
        </div>
    );
}

export default Trending;
