import { Link } from 'react-router-dom';
import { mockSongs } from './data';

function SongList({ onSongSelect }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Ma Bibliothèque</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {mockSongs.map((song) => (
          <li 
            key={song.id} 
            style={{ 
              padding: '1rem', 
              borderBottom: '1px solid #ddd',
              backgroundColor: '#fff',
              marginBottom: '0.5rem',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between', // Sépare le texte du bouton
              alignItems: 'center'
            }}
          >
            <Link 
              to={`/song/${song.id}`} 
              style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}
            >
              <strong style={{ fontSize: '1.2rem', display: 'block' }}>{song.title}</strong>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>{song.artist}</span>
            </Link>

            <button 
              onClick={() => onSongSelect(song)}
              style={{ padding: '0.5rem', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px' }}
            >
              ▶
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;