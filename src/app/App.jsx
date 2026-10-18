import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AudioPlayer } from '../features/player';
import { SongList, SongDetails } from '../features/library';
import { AdminPage } from '../features/admin'; // On importe l'admin
import { mockSongs } from '../features/library/data';
import { useColorPalette } from 'color-peek';
import './App.css';

function App() {
  // On stocke la liste des chansons dans un state (initialisé avec nos fausses données)
  const [songs, setSongs] = useState(mockSongs);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  
  const { colors, extract } = useColorPalette();

  useEffect(() => {
    if (currentSong?.image) {
      extract({ src: currentSong.image });
    }
  }, [currentSong, extract]);

  // Fonction pour ajouter une chanson (appelée par l'Admin)
  const addSong = (newSong) => {
    setSongs([...songs, newSong]); // Ajoute la nouvelle chanson à la liste existante
  };

  let backgroundStyle = 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)';
  if (currentSong?.image && colors && colors.length > 0) {
    const [r1, g1, b1] = colors[0].color;
    backgroundStyle = `linear-gradient(135deg, rgb(${r1}, ${g1}, ${b1}) 0%, #111111 100%)`;
  }

  return (
    <div key={currentSong?.id || 'default'} className="app-container" style={{ background: backgroundStyle }}>
      
      <main className="main-content" style={{ color: '#ffffff' }}>
        <h1 style={{ textShadow: '0px 2px 8px rgba(0,0,0,0.8)' }}>Kaion</h1>
        
        <Routes>
          {/* Route Accueil */}
          <Route path="/" element={
            <>
              <p style={{ opacity: 0.9, textShadow: '0px 1px 4px rgba(0,0,0,0.8)' }}>Bienvenue sur la plateforme musicale.</p>
              
              <SongList songs={songs} onSongSelect={setCurrentSong} />
              
              <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <a href="/admin" style={{ color: '#aaa', fontSize: '0.8rem', textDecoration: 'underline' }}>Accès Admin</a>
              </div>
            </>
          } />
          
          {/* Route Détails (on passe aussi la liste de chansons pour qu'il puisse chercher) */}
          <Route path="/song/:id" element={
            <SongDetails songs={songs} />
          } />

          {/* Route Admin */}
          <Route path="/admin" element={
            <AdminPage onAddSong={addSong} />
          } />
        </Routes>
      </main>

      <div className="bottom-player-bar">
        <AudioPlayer src={currentSong?.url} />
      </div>
    </div>
  );
}

export default App;