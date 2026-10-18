import { mockSongs } from './data';

function SongList({ onSongSelect }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Ma Bibliothèque</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {mockSongs.map((song) => (
          <li 
            key={song.id} 
            onClick={() => onSongSelect(song)} // Au clic, on envoie la chanson au parent
            style={{ 
              padding: '1rem', 
              borderBottom: '1px solid #ddd',
              backgroundColor: '#fff',
              marginBottom: '0.5rem',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer' // On ajoute la petite main au survol
            }}
          >
            <strong style={{ fontSize: '1.2rem' }}>{song.title}</strong>
            <span style={{ color: '#666', fontSize: '0.9rem' }}>{song.artist}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;