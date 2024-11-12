import React, { useContext, useEffect, useState } from 'react';
import { SongContext } from './SongContext';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ComentariosMusic from './ComentariosMusic';

function MusicPlayer() {
    const { currentSong } = useContext(SongContext);
    const [audioSrc, setAudioSrc] = useState('');
    const [progress, setProgress] = useState(0); // Store progress in seconds
    const [likes, setLikes] = useState(0); // Start with likes as 0 initially
    const [liked, setLiked] = useState(false); // State to track if the song has likes
    const [isPlaying, setIsPlaying] = useState(false); // Track if the music is playing
    const [ratingAverage, setRatingAverage] = useState(0);


    useEffect(() => {
        if (currentSong) {
            setAudioSrc(`http://localhost:3001/api/music/audio/${currentSong.fileId}/`);
            setLikes(currentSong.likes || 0); // Safely access likes, fallback to 0 if undefined
            setLiked(currentSong.likes > 0);

            // Calculate the average rating from comments with 'calificacion' field
            if (currentSong.comentarios && currentSong.comentarios.length > 0) {
                const ratings = currentSong.comentarios
                    .map(comentario => comentario.calificacion)
                    .filter(calificacion => calificacion !== undefined && calificacion !== 0); // Ensure calificacion exists

                if (ratings.length > 0) {
                    const totalRating = ratings.reduce((acc, calificacion) => acc + calificacion, 0);
                    const averageRating = totalRating / ratings.length;
                    setRatingAverage(averageRating);
                } else {
                    setRatingAverage(0);
                }
            } else {
                setRatingAverage(0);
            }

        }
    }, [currentSong]);

    if (!currentSong) {
        return <div className="music-player">Selecciona una música</div>;
    }

    // Handle song progress
    const handleProgress = (currentTime) => {
        setProgress(currentTime);
    };

    // Handle like/unlike button click
    const handleLikeToggle = async () => {
        const url = `http://localhost:3001/api/music/likeMusic/${currentSong._id}`;

        try {
            const method = liked ? 'DELETE' : 'POST'; // Use POST to like, DELETE to unlike
            const response = await fetch(url, { method });
            if (response.ok) {
                setLiked(!liked); // Toggle liked state
                setLikes(liked ? likes - 1 : likes + 1); // Update likes count based on current state
            }
        } catch (error) {
            console.error('Error al alternar like:', error);
        }
    };

    // Handle play and pause of music
    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    return (
        <div className="music-player">
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
                        <p>Best of 2024</p>
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
            <ComentariosMusic songId={currentSong._id} />
        </div>
    );
}

export default MusicPlayer;
