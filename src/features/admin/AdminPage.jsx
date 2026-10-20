import { useState } from 'react';
import { Link } from 'react-router-dom';

function AdminPage({ songs, onAddSong, onUpdateSong, onDeleteSong }) {
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [image, setImage] = useState('');

  const handleEditClick = (song) => {
    setEditingId(song.id);
    setTitle(song.title);
    setArtist(song.artist);
    setUrl(song.url);
    setTags(song.tags || '');
    setLyrics(song.lyrics || '');
    setImage(song.image || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setArtist('');
    setUrl('');
    setTags('');
    setLyrics('');
    setImage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !artist || !url) return;

    const songData = {
      id: editingId || Date.now().toString(),
      title,
      artist,
      url,
      tags: tags.trim() || null,
      lyrics: lyrics.trim() || null,
      image: image.trim() || null,
      theme: 'dark'
    };

    if (editingId) {
      onUpdateSong(songData);
    } else {
      onAddSong(songData);
    }
    
    handleCancelEdit();
  };

  return (
    <div style={{ marginTop: '2rem', color: '#ffffff' }}>
      <Link to="/" style={{ color: '#ffffff', opacity: 0.8, textDecoration: 'none' }}>← Retour au site</Link>
      
      <h2 style={{ textShadow: '0px 2px 8px rgba(0,0,0,0.8)' }}>Espace Admin</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', backgroundColor: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
        <h3 style={{ margin: 0 }}>{editingId ? 'Modifier la chanson' : 'Ajouter une chanson'}</h3>
        
        <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '0.8rem', borderRadius: '4px', border: 'none' }} />
        <input type="text" placeholder="Artiste" value={artist} onChange={(e) => setArtist(e.target.value)} style={{ padding: '0.8rem', borderRadius: '4px', border: 'none' }} />
        <input type="url" placeholder="Lien URL du fichier MP3" value={url} onChange={(e) => setUrl(e.target.value)} style={{ padding: '0.8rem', borderRadius: '4px', border: 'none' }} />
        <input type="text" placeholder="Tags (séparés par des virgules)" value={tags} onChange={(e) => setTags(e.target.value)} style={{ padding: '0.8rem', borderRadius: '4px', border: 'none' }} />
        
        {/* NOUVEAU : Champ Image */}
        <input type="url" placeholder="Lien URL de l'image (optionnel)" value={image} onChange={(e) => setImage(e.target.value)} style={{ padding: '0.8rem', borderRadius: '4px', border: 'none' }} />
        
        {/* NOUVEAU : Champ Paroles */}
        <textarea 
          placeholder="Paroles (optionnel)" 
          value={lyrics} 
          onChange={(e) => setLyrics(e.target.value)} 
          rows="5"
          style={{ padding: '0.8rem', borderRadius: '4px', border: 'none', fontFamily: 'inherit', resize: 'vertical' }} 
        />

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" style={{ flex: 1, padding: '0.8rem', backgroundColor: editingId ? '#28a745' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {editingId ? 'Enregistrer les modifications' : 'Ajouter la chanson'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} style={{ padding: '0.8rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Annuler
            </button>
          )}
        </div>
      </form>

      <h3>Gérer les chansons ({songs.length})</h3>
      <ul style={{ listStyle: 'none', padding: 0, maxWidth: '600px' }}>
        {songs.map(song => (
          <li key={song.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', backgroundColor: 'rgba(0,0,0,0.3)', marginBottom: '0.5rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <strong>{song.title}</strong> <span style={{ opacity: 0.7, fontSize: '0.9rem' }}>- {song.artist}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleEditClick(song)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✏️ Modifier</button>
              <button onClick={() => { if(window.confirm("Supprimer cette chanson ?")) onDeleteSong(song.id) }} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🗑️ Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;