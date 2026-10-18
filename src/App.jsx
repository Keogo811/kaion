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

  // DÉCOR : On vérifie strictement si la chanson a une image ET si on a des couleurs
  let backgroundStyle = 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'; // Fallback
  
  if (currentSong?.image && colors && colors.length > 0) {
    const [r1, g1, b1] = colors[0].color;
    
    // On force un contraste : la 2ème couleur sera 40% plus sombre que la 1ère
    const r2 = Math.floor(r1 * 0.4);
    const g2 = Math.floor(g1 * 0.4);
    const b2 = Math.floor(b1 * 0.4);

    backgroundStyle = `linear-gradient(135deg, rgb(${r1}, ${g1}, ${b1}) 0%, rgb(${r2}, ${g2}, ${b2}) 100%)`;
  }

  return (
    // On force le texte en blanc sur le conteneur principal
    <div className="app-container" style={{ background: backgroundStyle, color: '#ffffff' }}>
      
      <main className="main-content">
        <h1 style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Kaion</h1>
        
        <Routes>
          <Route path="/" element={
            <>
              <p style={{ opacity: 0.9, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Bienvenue sur la plateforme musicale.</p>
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