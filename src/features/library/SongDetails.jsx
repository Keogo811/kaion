import { useParams, Link } from 'react-router-dom';
import { mockSongs } from './data';

function SongDetails() {
  const { id } = useParams();
  const song = mockSongs.find((s) => s.id === id);

  if (!song) return <h2>Chanson introuvable</h2>;

  return (
    <div style={{ marginTop: '2rem', color: '#ffffff' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#ffffff', opacity: 0.8, marginBottom: '1rem', display: 'inline-block', textShadow: '0px 1px 3px rgba(0,0,0,0.8)' }}>
        ← Retour à la bibliothèque
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ width: '200px', height: '200px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#222', flexShrink: 0, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
          {song.image ? (
            <img src={song.image} alt={song.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>🎵</div>
          )}
        </div>

        <div>
          <h2 style={{ marginTop: 0, textShadow: '0px 2px 8px rgba(0,0,0,0.8)' }}>{song.title}</h2>
          <h3 style={{ opacity: 0.8, fontWeight: 'normal', textShadow: '0px 1px 4px rgba(0,0,0,0.8)' }}>{song.artist}</h3>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
        <h4 style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.8)' }}>Paroles :</h4>
        
        {/* Affichage conditionnel des paroles */}
        {song.lyrics ? (
          <p style={{ 
            whiteSpace: 'pre-wrap', // TRÈS IMPORTANT : Permet de garder les sauts de ligne du texte
            lineHeight: '1.6',
            fontSize: '1.1rem',
            textShadow: '0px 1px 3px rgba(0,0,0,0.8)'
          }}>
            {song.lyrics}
          </p>
        ) : (
          <p style={{ fontStyle: 'italic', opacity: 0.7 }}>Aucune parole n'est disponible pour cette chanson.</p>
        )}
      </div>
    </div>
  );
}

export default SongDetails;