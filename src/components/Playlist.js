import React, { useEffect, useState, useContext } from 'react';
import songImage from '../assets/song-1.png';
import MusicPlayer from './MusicPlayer';
import { SongContext } from './SongContext';
import axios from 'axios';

function Playlist() {
    const [getMusic, setMusic] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const { setCurrentSong } = useContext(SongContext);

    useEffect(() => {
        axios.get("http://localhost:3001/api/music/consultarMusic")
            .then(response => {
                setMusic(response.data);
            })
            .catch(error => console.error("Error fetching music data:", error));
    }, []);

    const handleSongClick = (song) => {
        setCurrentSong(song);
    };

    // Filtra la lista de canciones según el término de búsqueda
    const filteredMusic = getMusic.filter((musica) =>
        musica.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        musica.nombreArtista.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="playlist">
            <div className="genres">
                <div className="header">
                    <h5>Generos</h5>
                    <a href="#">See all</a>
                </div>
                <div className="items">
                    <div className="item"><p>Electro<br />Pop</p></div>
                    <div className="item"><p>Dance<br />Beat</p></div>
                    <div className="item"><p>Clubhouse<br />Remix</p></div>
                </div>
            </div>

            <div className="music-list">
                <div className="header">
                    <h5>Top Songs</h5>
                    <a href="#">See all</a>
                </div>

                {/* Campo de entrada para el filtro de búsqueda */}
                <input
                    type="text"
                    placeholder="Buscar música..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        marginBottom: '15px', padding: '8px', width: '100%', borderRadius: '10px'
                    }}
                />


                <div className="items" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <h4 style={{ color: '#fff', marginBottom: '15px' }}>Top Songs</h4>
                    {filteredMusic.map((musica, index) => (
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
