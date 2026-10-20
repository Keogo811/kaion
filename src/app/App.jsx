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
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const { colors, extract } = useColorPalette();

  useEffect(() => {
    async function fetchSongs() {
      try {
        const data = await sql`SELECT * FROM songs ORDER BY created_at ASC`;
        setSongs(data);
        if (data.length > 0) setCurrentSong(data[0]);
      } catch (error) { console.error(error); } finally { setIsLoading(false); }
    }
    fetchSongs();
  }, []);

  const addSong = async (newSong) => { /* inchangé */
    try {
      await sql`INSERT INTO songs (id, title, artist, url, image, lyrics, theme, tags) VALUES (${newSong.id}, ${newSong.title}, ${newSong.artist}, ${newSong.url}, ${newSong.image}, ${newSong.lyrics}, ${newSong.theme}, ${newSong.tags})`;
      setSongs((prev) => [...prev, newSong]);
      if (!currentSong) setCurrentSong(newSong);
    } catch (error) { console.error(error); }
  };
  const updateSong = async (updatedSong) => { /* inchangé */
    try {
      await sql`UPDATE songs SET title = ${updatedSong.title}, artist = ${updatedSong.artist}, url = ${updatedSong.url}, tags = ${updatedSong.tags} WHERE id = ${updatedSong.id}`;
      setSongs((prev) => prev.map((s) => (s.id === updatedSong.id ? updatedSong : s)));
      if (currentSong?.id === updatedSong.id) setCurrentSong(updatedSong);
    } catch (error) { console.error(error); }
  };
  const deleteSong = async (id) => { /* inchangé */
    try {
      await sql`DELETE FROM songs WHERE id = ${id}`;
      setSongs((prev) => prev.filter((s) => s.id !== id));
      if (currentSong?.id === id) setCurrentSong(songs.find(s => s.id !== id) || null);
    } catch (error) { console.error(error); }
  };

  const handleNext = () => {
    if (!currentSong || songs.length === 0) return;
    if (isShuffle) {
      setCurrentSong(songs[Math.floor(Math.random() * songs.length)]);
    } else {
      const currentIndex = songs.findIndex(s => s.id === currentSong.id);
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
  };

  const handlePrev = () => {
    if (!currentSong || songs.length === 0) return;
    if (isShuffle) {
      setCurrentSong(songs[Math.floor(Math.random() * songs.length)]);
    } else {
      const currentIndex = songs.findIndex(s => s.id === currentSong.id);
      setCurrentSong(songs[(currentIndex - 1 + songs.length) % songs.length]);
    }
  };

  useEffect(() => {
    if (currentSong?.image) extract({ src: currentSong.image });
  }, [currentSong, extract]);

  let backgroundStyle = 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)';
  if (currentSong?.image && colors && colors.length > 0) {
    const [r1, g1, b1] = colors[0].color;
    backgroundStyle = `linear-gradient(135deg, rgb(${r1}, ${g1}, ${b1}) 0%, #111111 100%)`;
  }

  if (isLoading) return <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>Chargement...</div>;

  return (
    <div key={currentSong?.id || 'default'} className="app-container" style={{ background: backgroundStyle }}>
      <main className="main-content" style={{ color: '#ffffff' }}>
        <h1 style={{ textShadow: '0px 2px 8px rgba(0,0,0,0.8)' }}>Kaion</h1>
        <Routes>
          <Route path="/" element={
            <>
              <p style={{ opacity: 0.9, textShadow: '0px 1px 4px rgba(0,0,0,0.8)' }}>Bienvenue sur Kaion.</p>
              <SongList songs={songs} onSongSelect={setCurrentSong} />
              <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <a href="/admin" style={{ color: '#aaa', fontSize: '0.8rem', textDecoration: 'underline' }}>Accès Admin</a>
              </div>
            </>
          } />
          <Route path="/song/:id" element={<SongDetails songs={songs} />} />
          <Route path="/admin" element={<AdminPage songs={songs} onAddSong={addSong} onUpdateSong={updateSong} onDeleteSong={deleteSong} />} />
        </Routes>
      </main>
      
      <div className="bottom-player-bar">
        {currentSong ? (
          <AudioPlayer 
            src={currentSong.url} 
            onNext={handleNext}
            onPrev={handlePrev}
            isShuffle={isShuffle}
            onToggleShuffle={() => setIsShuffle(!isShuffle)}
            isRepeat={isRepeat}
            onToggleRepeat={() => setIsRepeat(!isRepeat)}
            songs={songs}
            currentSong={currentSong}
            onSongSelect={setCurrentSong}
          />
        ) : (
          <div style={{ padding: '1rem', color: '#333' }}>Aucune chanson.</div>
        )}
      </div>
    </div>
  );
}

export default App;