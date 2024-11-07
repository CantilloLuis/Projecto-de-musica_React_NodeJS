// SongContext.js
import React, { createContext, useState } from 'react';

export const SongContext = createContext();

const SongProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);

    return (
        <SongContext.Provider value={{ currentSong, setCurrentSong }}>
            {children}
        </SongContext.Provider>
    );
};

export default SongProvider; // Exportación predeterminada
