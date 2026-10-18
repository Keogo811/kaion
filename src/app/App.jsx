import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AudioPlayer } from '../features/player';
import { SongList, SongDetails } from '../features/library';
import { mockSongs } from '../features/library/data';
import { useColorPalette } from 'color-peek'; // On importe le hook
import './App.css';

function App() {
  const [currentSong, setCurrentSong] = useState(mockSongs[0]);
  
  // On utilise le hook pour extraire la palette de la chanson en cours
  const { colors, loading, error, extract } = useColorPalette();

  // On déclenche l'extraction quand la chanson change
  useEffect(() => {
    if (currentSong?.image) {
      extract({ src: currentSong.image });
    }
  }, [currentSong, extract]);

  // Détermination du thème de secours (fallback)
  // Si on a des couleurs, on utilise la première. Sinon, on garde 'dark'.
  let currentTheme = 'dark'; // Thème par défaut
  if (colors && colors.length > 0) {
    // On convertit la couleur RGB en une chaîne CSS
    const [r, g, b] = colors[0].color;
    currentTheme = `rgb(${r}, ${g}, ${b})`;
  }

  return (
    // On applique le style dynamique ici
    <div 
      className="app-container" 
      style={{ 
        backgroundColor: currentTheme,
        // On ajuste la couleur du texte pour qu'il reste lisible
        color: currentTheme === 'dark' ? '#ffffff' : '#1a1a1a' 
      }}
    >
      <main className="main-content">
        <h1>Kaion</h1>
        
        <Routes>
          <Route path="/" element={
            <>
              <p>Bienvenue sur la future plateforme musicale.</p>
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