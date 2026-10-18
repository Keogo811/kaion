import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AudioPlayer } from '../features/player';
import { SongList, SongDetails } from '../features/library';
import { AdminPage } from '../features/admin';
import { useColorPalette } from 'color-peek';
import sql from '../shared/api/db';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { colors, extract } = useColorPalette();

  // 1. Charger les chansons depuis la base de données au démarrage
  useEffect(() => {
    async function fetchSongs() {
      try {
        const data = await sql`SELECT * FROM songs ORDER BY created_at ASC`;
        setSongs(data);
        if (data.length > 0) setCurrentSong(data[0]);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSongs();
  }, []);

  // 2. Ajouter une chanson dans la base de données
  const addSong = async (newSong) => {
    try {
      // On insère la chanson dans Neon
      await sql`
        INSERT INTO songs (id, title, artist, url, image, lyrics, theme) 
        VALUES (${newSong.id}, ${newSong.title}, ${newSong.artist}, ${newSong.url}, ${newSong.image}, ${newSong.lyrics}, ${newSong.theme})
      `;
      // On met à jour l'interface
      setSongs((prev) => [...prev, newSong]);
      if (!currentSong) setCurrentSong(newSong);
    } catch (error) {
      console.error("Erreur d'ajout :", error);
      alert("Impossible d'ajouter la chanson.");
    }
  };

  useEffect(() => {
    if (currentSong?.image) {
      extract({ src: currentSong.image });
    }
  }, [currentSong, extract]);

  // Gestion du décor
  let backgroundStyle = 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)';
  if (currentSong?.image && colors && colors.length > 0) {
    const [r1, g1, b1] = colors[0].color;
    backgroundStyle = `linear-gradient(135deg, rgb(${r1}, ${g1}, ${b1}) 0%, #111111 100%)`;
  }

  if (isLoading) {
    return <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>Chargement de la base de données...</div>;
  }

  return (
    <div key={currentSong?.id || 'default'} className="app-container" style={{ background: backgroundStyle }}>
      
      <main className="main-content" style={{ color: '#ffffff' }}>
        <h1 style={{ textShadow: '0px 2px 8px rgba(0,0,0,0.8)' }}>Kaion</h1>
        
        <Routes>
          <Route path="/" element={
            <>
              <p style={{ opacity: 0.9, textShadow: '0px 1px 4px rgba(0,0,0,0.8)' }}>Bienvenue sur la plateforme musicale.</p>
              
              <SongList songs={songs} onSongSelect={setCurrentSong} />
              
              <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <a href="/admin" style={{ color: '#aaa', fontSize: '0.8rem', textDecoration: 'underline' }}>Accès Admin</a>
              </div>
            </>
          } />
          
          <Route path="/song/:id" element={<SongDetails songs={songs} />} />
          <Route path="/admin" element={<AdminPage onAddSong={addSong} />} />
        </Routes>
      </main>

      <div className="bottom-player-bar">
        {currentSong ? (
          <AudioPlayer src={currentSong.url} />
        ) : (
          <div style={{ padding: '1rem', color: '#333' }}>Aucune chanson disponible. Ajoutez-en une !</div>
        )}
      </div>
    </div>
  );
}

export default App;