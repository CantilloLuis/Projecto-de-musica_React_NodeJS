// App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Trending from './components/Trending';
import Playlist from './components/Playlist';
import Profile from './components/Profile';
import MusicPlayer from './components/MusicPlayer';
import SongProvider from './components/SongContext';

import './App.css';

function App() {
  return (
    <SongProvider>
      <div className="container">
        <Sidebar />
        <main>
          <Header />
          <Trending />
          <Playlist />
        </main>
        <div className="right-section">
          <Profile />
          <MusicPlayer />
        </div>
      </div>
    </SongProvider>
  );
}

export default App;
