import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AudioPlayer } from '../features/player';
import { SongList, SongDetails } from '../features/library';
import { mockSongs } from '../features/library/data';
import './App.css';

function App() {
  const [currentSong, setCurrentSong] = useState(mockSongs[0]);

  return (
    <div className="app-container">
      <main className="main-content">
        <h1>KeogoMusika</h1>
        
        {/* Le système de routage */}
        <Routes>
          {/* Route de la page d'accueil */}
          <Route path="/" element={
            <>
              <p>Bienvenue sur la future plateforme musicale.</p>
              <SongList onSongSelect={setCurrentSong} />
            </>
          } />
          
          {/* Route de la page de détails d'une chanson */}
          <Route path="/song/:id" element={
            <SongDetails />
          } />
        </Routes>

      </main>

      {/* Le lecteur reste en bas, peu importe la page */}
      <div className="bottom-player-bar">
        <AudioPlayer src={currentSong.url} />
      </div>
    </div>
  );
}

export default App;