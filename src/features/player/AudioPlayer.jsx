import { useRef, useState, useEffect } from 'react';

function AudioPlayer({ src }) {
  const audioRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // 1 = 100%

  // Met à jour le temps écoulé pendant la lecture
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Récupère la durée totale quand la musique est chargée
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Quand la musique se termine, on remet le bouton sur Play
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
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

  // Déplacer le curseur pour avancer/reculer dans la chanson
  const handleSeek = (e) => {
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Changer le volume
  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Formate le temps en minutes:secondes (ex: 03:45)
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div style={{ padding: '1rem', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      
      {/* L'élément audio invisible qui fait le travail */}
      <audio 
        ref={audioRef} 
        src={src} 
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Bouton Play/Pause */}
      <button 
        onClick={togglePlay} 
        style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer', marginBottom: '1rem' }}
      >
        {isPlaying ? '⏸ Pause' : '▶ Play'}
      </button>

      {/* Barre de progression */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.8rem', color: '#666', width: '35px' }}>
          {formatTime(currentTime)}
        </span>
        <input 
          type="range" 
          min="0" 
          max={duration || 0} 
          value={currentTime} 
          onChange={handleSeek}
          style={{ flex: 1, cursor: 'pointer' }}
        />
        <span style={{ fontSize: '0.8rem', color: '#666', width: '35px' }}>
          {formatTime(duration)}
        </span>
      </div>

      {/* Contrôle du volume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '1rem' }}>🔊</span>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={handleVolumeChange}
          style={{ flex: 1, cursor: 'pointer' }}
        />
      </div>

    </div>
  );
}

export default AudioPlayer;