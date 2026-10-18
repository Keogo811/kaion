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
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fond semi-transparent pour s'adapter à tous les thèmes
              marginBottom: '0.5rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem' // Espace entre l'image et le texte
            }}
          >
            {/* L'image de la chanson (avec un fallback si absente) */}
            <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#ccc', flexShrink: 0 }}>
              {song.image ? (
                <img src={song.image} alt={song.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🎵</div>
              )}
            </div>

            {/* Le texte et le bouton */}
            <Link 
              to={`/song/${song.id}`} 
              style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}
            >
              <strong style={{ fontSize: '1.2rem', display: 'block' }}>{song.title}</strong>
              <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{song.artist}</span>
            </Link>

            <button 
              onClick={() => onSongSelect(song)}
              style={{ padding: '0.5rem', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', flexShrink: 0 }}
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