import React, { useEffect, useState, useContext } from 'react';
import songImage from '../assets/song-1.png'; // Ruta relativa
import MusicPlayer from './MusicPlayer';
import { SongContext } from './SongContext';


import axios from 'axios'

function Playlist() {

    const [getMusic, setMusic] = useState([]);
    const { setCurrentSong } = useContext(SongContext);


    useEffect(() => {
        axios.get("http://localhost:3001/api/music/consultarMusic")
            .then(response => {
                setMusic(response.data)
                console.log(response.data)
            })
    }, [])

    const handleSongClick = (song) => {
        setCurrentSong(song);
    };



    return (
        <div className="playlist">
            <div className="genres">
                <div className="header">
                    <h5>Genres</h5>
                    <a href="#">See all</a>
                </div>
                <div className="items">
                    {/* Genre items */}
                    <div className="item"><p>Electro<br />Pop</p></div>
                    <div className="item"><p>Dance<br />Beat</p></div>
                    <div className="item"><p>Clubhouse<br />Remix</p></div>
                    {/* Add more genres as needed */}
                </div>
            </div>

            <div className="music-list">
                <div className="header">
                    <h5>Top Songs</h5>
                    <a href="#">See all</a>
                </div>
                <div className="items">
                    <h4 style={{ color: '#fff', marginBottom: '15px' }}>Top Songs</h4>
                    {getMusic.map((musica, index) => (
                        <div className="item" key={index} onClick={() => handleSongClick(musica)}>
                            <div className="info">
                                <p style={{ marginRight: '10px', color: '#aaa' }}>{String(index + 1).padStart(2, '0')}</p>
                                <img src={musica.urlImagen} alt={musica.titulo} />
                                <div className="details">
                                    <h5>{musica.titulo}</h5>
                                    <p>{musica.nombreArtista}</p>
                                </div>
                            </div>
                            <div className="actions">
                                <p>{musica.duracion}</p>
                                <div className="icon"><i className="bx bxs-right-arrow"></i></div>
                                <i className="bx bxs-plus-square"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Playlist;
