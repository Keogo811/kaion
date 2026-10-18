import { useState } from 'react';
import { Link } from 'react-router-dom';

function AdminPage({ onAddSong }) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState(''); // Nouvel état pour les tags

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !artist || !url) return;

    const newSong = {
      id: Date.now().toString(),
      title,
      artist,
      url,
      image: null,
      lyrics: null,
      theme: 'dark',
      tags: tags.trim() !== '' ? tags : null // On nettoie le texte, null si vide
    };

    onAddSong(newSong);
    
    // On vide le formulaire
    setTitle('');
    setArtist('');
    setUrl('');
    setTags('');
  };

  return (
    <div style={{ marginTop: '2rem', color: '#ffffff' }}>
      <Link to="/" style={{ color: '#ffffff', opacity: 0.8, textDecoration: 'none' }}>
        ← Retour au site
      </Link>
      
      <h2 style={{ textShadow: '0px 2px 8px rgba(0,0,0,0.8)' }}>Espace Admin</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', backgroundColor: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '12px' }}>
        <input 
          type="text" placeholder="Titre" value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ padding: '0.8rem', borderRadius: '4px', border: 'none' }} 
        />
        <input 
          type="text" placeholder="Artiste" value={artist} 
          onChange={(e) => setArtist(e.target.value)} 
          style={{ padding: '0.8rem', borderRadius: '4px', border: 'none' }} 
        />
        <input 
          type="url" placeholder="Lien URL du fichier MP3" value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          style={{ padding: '0.8rem', borderRadius: '4px', border: 'none' }} 
        />
        {/* Le nouveau champ Tags */}
        <input 
          type="text" 
          placeholder="Tags (séparés par des virgules : triste, folk, guerre)" 
          value={tags} 
          onChange={(e) => setTags(e.target.value)}
          style={{ padding: '0.8rem', borderRadius: '4px', border: 'none' }}
        />
        <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Ajouter la chanson
        </button>
      </form>
    </div>
  );
}

export default AdminPage;