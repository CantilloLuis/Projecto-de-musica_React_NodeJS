import React, { useContext, useEffect, useState } from 'react';
import { SongContext } from './SongContext';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ComentariosMusic from './ComentariosMusic';
import axios from 'axios';


function MusicPlayer() {
    const { currentSong } = useContext(SongContext);
    const [audioSrc, setAudioSrc] = useState('');
    const [progress, setProgress] = useState(0);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [ratingAverage, setRatingAverage] = useState(0);
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';



    useEffect(() => {
        if (currentSong) {
            setAudioSrc(`${API_URL}/api/music/audio/${currentSong.fileId}/`);
            setLikes(currentSong.likes || 0);
            setLiked(currentSong.likes > 0);

            // Metodo para calcular el promedio de las canciones
            fetchMusicById();

        }
    }, [currentSong]);

    if (!currentSong) {
        return <div className="music-player">Selecciona una música</div>;
    }



    const fetchMusicById = () => {
        axios.get(`${API_URL}/api/music/musicById/${currentSong._id}`)
            .then(response => {
                const music = response.data;

                // Calcular el promedio de las calificaciones
                if (music.comentarios && music.comentarios.length > 0) {
                    const ratings = music.comentarios
                        .map(comentario => comentario.calificacion)
                        .filter(calificacion => calificacion !== undefined && calificacion !== 0); // Filtrar calificaciones válidas

                    if (ratings.length > 0) {
                        const totalRating = ratings.reduce((acc, calificacion) => acc + calificacion, 0);
                        const averageRating = totalRating / ratings.length;
                        setRatingAverage(averageRating); // Guardar el promedio
                    } else {
                        setRatingAverage(0);
                    }
                } else {
                    setRatingAverage(0); // No hay comentarios
                }
            })
            .catch(error => console.error("Error al obtener la música:", error));
    };


    const handleProgress = (currentTime) => {
        setProgress(currentTime);
    };

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    return (
        <div className="music-player">
            {/* Datos que se observan en el reproductor de musica */}

            <div className="top-section">
                <div className="header">
                    <h5>Player</h5>
                    <i className="bx bxs-playlist"></i>
                </div>
                <div className="song-info">
                    <img src={currentSong.urlImagen} alt="Album Art" />
                    <div className="description">
                        <h3>{currentSong.titulo}</h3>
                        <h5>{currentSong.nombreArtista}</h5>
                        <p>Vistas: {currentSong.visitas}</p>
                        <p>{Math.floor(progress / 60)}:{Math.floor(progress % 60).toString().padStart(2, '0')}</p>
                        <h3>Duración: {currentSong.duracion}</h3>
                        <h4>Calificación general: {ratingAverage}</h4>

                        {isPlaying && (
                            <div className="visualizer">
                                <img src="https://cdn.pixabay.com/animation/2023/10/10/13/26/13-26-45-476_512.gif" alt="Visualizer" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="player-actions">
                <AudioPlayer
                    autoPlay
                    src={audioSrc}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onListen={(e) => handleProgress(e.target.currentTime)}
                />
                <div className="lyrics">
                    <h5>LYRICS</h5>
                </div>
            </div>

            {/* Componente de comentarios sobre las musicas */}
            <ComentariosMusic onSongRating={fetchMusicById} songId={currentSong._id} />
        </div>
    );
}

export default MusicPlayer;
