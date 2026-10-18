import { Link } from 'react-router-dom';

function SongList({ songs, onSongSelect }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ textShadow: '0px 2px 6px rgba(0,0,0,0.8)' }}>Ma Bibliothèque</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {songs.map((song) => (
          <li 
            key={song.id} 
            style={{ 
              padding: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '0.5rem',
              borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#222', flexShrink: 0 }}>
              {song.image ? <img src={song.image} alt={song.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🎵</div>}
            </div>

            <div style={{ flex: 1 }}>
              <Link to={`/song/${song.id}`} style={{ textDecoration: 'none', color: '#ffffff', display: 'block' }}>
                <strong style={{ fontSize: '1.2rem', display: 'block', textShadow: '0px 1px 3px rgba(0,0,0,0.9)' }}>{song.title}</strong>
                <span style={{ fontSize: '0.9rem', color: '#ccc' }}>{song.artist}</span>
              </Link>
              
              {/* Affichage des tags */}
              {song.tags && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  {song.tags.split(',').map((tag, index) => (
                    <span key={index} style={{ fontSize: '0.7rem', backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '2px 8px', borderRadius: '12px', color: '#fff' }}>
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => onSongSelect(song)} style={{ padding: '0.5rem', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', flexShrink: 0 }}>
              ▶
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;