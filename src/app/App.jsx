import { AudioPlayer } from '../features/player';
import './App.css'; // On importe notre nouveau fichier CSS

function App() {
  const testAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  return (
    <div className="app-container">
      <main className="main-content">
        <h1>KeogoMusika</h1>
        <p>Bienvenue sur la future plateforme musicale.</p>
        
        {/* Un faux contenu pour pouvoir tester le défilement (scroll) */}
        <div style={{ height: '150vh', backgroundColor: '#e0e0e0', marginTop: '2rem', padding: '2rem', borderRadius: '8px' }}>
          <h2>Fais défiler vers le bas</h2>
          <p>La barre de musique doit rester fixée tout en bas de l'écran, même quand tu scrolles.</p>
        </div>
      </main>

      {/* Notre barre permanente en bas */}
      <div className="bottom-player-bar">
        <AudioPlayer src={testAudioUrl} />
      </div>
    </div>
  );
}

export default App;