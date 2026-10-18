import { useState } from 'react';
import { AudioPlayer } from '../features/player';
import { SongList } from '../features/library';
import { mockSongs } from '../features/library/data'; // On importe les données pour la chanson par défaut
import './App.css';

function App() {
  // L'état qui retient la chanson en cours (on initialise avec la première)
  const [currentSong, setCurrentSong] = useState(mockSongs[0]);

  return (
    <div className="app-container">
      <main className="main-content">
        <h1>KeogoMusika</h1>
        <p>Bienvenue sur la future plateforme musicale.</p>
        
        {/* On donne la fonction setCurrentSong à la liste */}
        <SongList onSongSelect={setCurrentSong} />
        
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '8px' }}>
          <h3>En cours de lecture :</h3>
          <p>{currentSong.title} — {currentSong.artist}</p>
        </div>
      </main>

      {/* On donne la chanson actuelle au lecteur */}
      <div className="bottom-player-bar">
        <AudioPlayer src={currentSong.url} />
      </div>
    </div>
  );
}

export default App;