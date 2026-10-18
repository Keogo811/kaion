import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AudioPlayer } from '../features/player';
import { SongList, SongDetails } from '../features/library';
import { mockSongs } from '../features/library/data';
import { useColorPalette } from 'color-peek';
import './App.css';

function App() {
  const [currentSong, setCurrentSong] = useState(mockSongs[0]);
  const { colors, extract } = useColorPalette();

  useEffect(() => {
    if (currentSong?.image) {
      extract({ src: currentSong.image });
    }
  }, [currentSong, extract]);

  // Gestion du décor (Background)
  let backgroundStyle = 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'; // Thème par défaut (dégradé sombre)
  
  if (colors && colors.length > 0) {
    const [r1, g1, b1] = colors[0].color; // Couleur dominante
    // Si on a une deuxième couleur, on l'utilise, sinon on éclaircit la première
    const color2 = colors[1] ? colors[1].color : [r1 + 30, g1 + 30, b1 + 30];
    const [r2, g2, b2] = color2;

    // Création du dégradé dynamique
    backgroundStyle = `linear-gradient(135deg, rgb(${r1}, ${g1}, ${b1}) 0%, rgb(${r2}, ${g2}, ${b2}) 100%)`;
  }

  return (
    // On applique le dégradé en style inline
    <div className="app-container" style={{ background: backgroundStyle }}>
      
      <main className="main-content" style={{ color: '#ffffff' }}> {/* On force le texte en blanc pour la lisibilité sur fond coloré */}
        <h1>Kaion</h1>
        
        <Routes>
          <Route path="/" element={
            <>
              <p style={{ opacity: 0.8 }}>Bienvenue sur la plateforme musicale.</p>
              <SongList onSongSelect={setCurrentSong} />
            </>
          } />
          
          <Route path="/song/:id" element={
            <SongDetails />
          } />
        </Routes>
      </main>

      <div className="bottom-player-bar">
        <AudioPlayer src={currentSong.url} />
      </div>
    </div>
  );
}

export default App;