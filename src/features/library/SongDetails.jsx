import { useParams, Link } from 'react-router-dom';
import { mockSongs } from './data';

function SongDetails() {
  const { id } = useParams();
  const song = mockSongs.find((s) => s.id === id);

  if (!song) return <h2>Chanson introuvable</h2>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <Link to="/" style={{ textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
        ← Retour à la bibliothèque
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Image de la chanson en grand */}
        <div style={{ width: '200px', height: '200px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#ccc', flexShrink: 0 }}>
          {song.image ? (
            <img src={song.image} alt={song.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>🎵</div>
          )}
        </div>

        <div>
          <h2 style={{ marginTop: 0 }}>{song.title}</h2>
          <h3 style={{ opacity: 0.7, fontWeight: 'normal' }}>{song.artist}</h3>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(128, 128, 128, 0.2)', borderRadius: '8px' }}>
        <h4>Paroles :</h4>
        <p><em>Les paroles de cette chanson seront disponibles plus tard.</em></p>
      </div>
    </div>
  );
}

export default SongDetails;