import { useParams, Link } from 'react-router-dom';
import { mockSongs } from './data';

function SongDetails() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const song = mockSongs.find((s) => s.id === id);

  if (!song) return <h2>Chanson introuvable</h2>;

  return (
    <div style={{ padding: '1rem', backgroundColor: '#fff', borderRadius: '8px', marginTop: '2rem' }}>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
        ← Retour à la bibliothèque
      </Link>
      
      <h2>{song.title}</h2>
      <h3 style={{ color: '#666' }}>{song.artist}</h3>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h4>Paroles :</h4>
        <p><em>Les paroles de cette chanson seront disponibles plus tard.</em></p>
      </div>
    </div>
  );
}

export default SongDetails;