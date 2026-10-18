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

  // DÉCOR : Fallback par défaut (Noir profond vers Gris très sombre)
  let backgroundStyle = 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)';
  
  // Si l'image existe ET qu'on a des couleurs, on crée le dégradé
  if (currentSong?.image && colors && colors.length > 0) {
    const [r1, g1, b1] = colors[0].color;
    // Pour un contraste garanti, la 2ème couleur sera TOUJOURS un noir profond
    backgroundStyle = `linear-gradient(135deg, rgb(${r1}, ${g1}, ${b1}) 0%, #111111 100%)`;
  }

  return (
    // La "key" force React à recréer le composant si on change de chanson, réinitialisant le fond
    <div 
      key={currentSong.id} 
      className="app-container" 
      style={{ background: backgroundStyle }}
    >
      
      <main className="main-content" style={{ color: '#ffffff' }}>
        <h1 style={{ textShadow: '0px 2px 8px rgba(0,0,0,0.8)' }}>Kaion</h1>
        
        <Routes>
          <Route path="/" element={
            <>
              <p style={{ opacity: 0.9, textShadow: '0px 1px 4px rgba(0,0,0,0.8)' }}>Bienvenue sur la plateforme musicale.</p>
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