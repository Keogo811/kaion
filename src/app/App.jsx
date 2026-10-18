import { AudioPlayer } from '../features/player';

function App() {
  // URL d'un fichier MP3 de test public (SoundHelix)
  const testAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>KeogoMusika</h1>
      <p>Premier pas : un lecteur audio autonome.</p>

      <AudioPlayer src={testAudioUrl} />
    </div>
  );
}

export default App;