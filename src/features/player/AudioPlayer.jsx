import { useRef, useState, useEffect } from 'react';

function AudioPlayer({ src, onNext, onPrev, isShuffle, onToggleShuffle, isRepeat, onToggleRepeat }) {
  const audioRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [src]);

  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
  const handleLoadedMetadata = () => setDuration(audioRef.current.duration);

  // Gestion de la fin de chanson
  const handleEnded = () => {
    if (isRepeat) {
      // Si la boucle est activée, on rejoue la même
      audioRef.current.play();
    } else {
      // Sinon, on passe à la suivante
      setIsPlaying(false);
      if (onNext) onNext();
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div style={{ padding: '0.5rem 1rem', width: '100%', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <audio 
        ref={audioRef} 
        src={src} 
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Boutons de contrôle principaux */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
        {/* Bouton Aléatoire */}
        <button onClick={onToggleShuffle} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: isShuffle ? '#007bff' : '#888' }} title="Aléatoire">
          🔀
        </button>

        {/* Précédent */}
        <button onClick={onPrev} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#333' }} title="Précédent">
          ⏮
        </button>

        {/* Play / Pause */}
        <button onClick={togglePlay} style={{ padding: '0.5rem 1rem', fontSize: '1.2rem', cursor: 'pointer', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isPlaying ? '⏸' : '▶'}
        </button>

        {/* Suivant */}
        <button onClick={onNext} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#333' }} title="Suivant">
          ⏭
        </button>

        {/* Bouton Boucle */}
        <button onClick={onToggleRepeat} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: isRepeat ? '#007bff' : '#888' }} title="Boucle">
          🔁
        </button>
      </div>

      {/* Barre de progression */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '0.8rem', color: '#666', width: '35px', textAlign: 'right' }}>{formatTime(currentTime)}</span>
        <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeek} style={{ flex: 1, cursor: 'pointer' }} />
        <span style={{ fontSize: '0.8rem', color: '#666', width: '35px' }}>{formatTime(duration)}</span>
      </div>

      {/* Volume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', maxWidth: '200px', margin: '0 auto' }}>
        <span style={{ fontSize: '0.9rem' }}>🔊</span>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} style={{ flex: 1, cursor: 'pointer' }} />
      </div>
    </div>
  );
}

export default AudioPlayer;