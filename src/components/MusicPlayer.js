// MusicPlayer.js
import React, { useContext, useEffect, useState } from 'react';
import { SongContext } from './SongContext';

function MusicPlayer() {

    const { currentSong } = useContext(SongContext);
    const [audioSrc, setAudioSrc] = useState('');

    useEffect(() => {
        if (currentSong) {
            // Cambiar la fuente del archivo cuando currentSong cambia
            setAudioSrc(`http://localhost:3001/api/music/audio/${currentSong.fileId}/`);
        }
    }, [currentSong]); // Este efecto se ejecuta cada vez que currentSong cambia


    if (!currentSong) {
        return <div className="music-player">Selecciona una canción para reproducir</div>;
    }

    return (
        <div class="music-player">
            <div class="top-section">
                <div class="header">
                    <h5>Player</h5>
                    <i class='bx bxs-playlist'></i>
                </div>
                <div class="song-info">
                    <img src={currentSong.urlImagen} />
                    <div class="description">
                        <h3>{currentSong.titulo}</h3>
                        <h5>{currentSong.nombreArtista}</h5>
                        <p>Best of 2024</p>
                    </div>
                    <div class="progress">
                        <p>{currentSong.duracion}</p>
                        <div class="active-line"></div>
                        <div class="deactive-line"></div>
                        <p>01:02</p>
                    </div>
                </div>
            </div>

            <div class="player-actions">
                <div class="buttons">
                    <i class='bx bx-repeat'></i>
                    <i class='bx bx-first-page'></i>
                    <i class='bx bxs-right-arrow play-button'></i>
                    <i class='bx bx-last-page'></i>
                    <i class='bx bx-transfer-alt'></i>
                </div>
                <div class="lyrics">
                    <i class='bx bx-chevron-up'></i>
                    <h5>LYRICS</h5>
                </div>
            </div>

            <audio key={audioSrc} controls >
                <source
                    src={audioSrc}
                    type="audio/mpeg"
                />
            </audio>

        </div>
    );
}

export default MusicPlayer;
