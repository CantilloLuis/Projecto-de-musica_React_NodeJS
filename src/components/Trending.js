import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Trending() {

    const [getImg, setImg] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/music/consultarMusic")
            .then(response => {
                setImg(response.data);
            })
    }, []);

    return (
        <div className="trending">
            <div className="left">
                <h5>Trending New Song</h5>
                <div className="info">
                    <h2>Lost Emotions</h2>
                    <div className="artist-plays">
                        <h4>Rion Clarke</h4>
                        <h5>63 Million Plays</h5>
                    </div>
                    <div className="buttons">
                        <button>Listen Now</button>
                        <i className="bx bxs-heart"></i>
                    </div>
                </div>
            </div>

            {/* Carrusel solo con imágenes */}
            <div className="slider-frame">
                <ul>
                    {getImg.map((item, index) => (
                        <li key={index}>
                            <img src={item.urlImagen} alt={`Trending ${index}`} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Trending;
