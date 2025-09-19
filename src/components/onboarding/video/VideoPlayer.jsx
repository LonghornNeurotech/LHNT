// Plays the video for members to watch, with some options to customize their watching experience!
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { CheckCircle } from 'lucide-react';

const VideoPlayer = ({ url, title, duration, subtitlesSrc, onComplete, style }) => {
  const playerRef = useRef(null);
  const [completed, setCompleted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (completed) {
      onComplete();
    }
  }, [completed, onComplete]);

  const handleProgress = (state) => {
    if (duration && state.playedSeconds >= duration && !completed) {
      setCompleted(true);
    }
  };

  const handleEnded = () => {
    setCompleted(true);
  };

  const handleSpeedChange = (e) => {
    const rate = parseFloat(e.target.value);
    setPlaybackRate(rate);
    if (playerRef.current) {
      playerRef.current.getInternalPlayer().playbackRate = rate;
    }
  };

  const handleError = () => {
    setError('Error loading video');
  };

  return (
    <div style={{ ...style, position: 'relative', backgroundColor: '#000', borderRadius: 12, padding: 16, boxSizing: 'border-box' }}>
      <div style={{ marginBottom: 8, color: '#fff', fontWeight: 'bold' }}>
        {title}
      </div>
      <ReactPlayer
        ref={playerRef}
        url={url}
        controls
        width="100%"
        height="260px"
        onProgress={handleProgress}
        onEnded={handleEnded}
        onError={handleError}
        playbackRate={playbackRate}
        config={{
          file: {
            attributes: {
              crossOrigin: 'anonymous',
            },
            tracks: subtitlesSrc ? [{ kind: 'subtitles', src: subtitlesSrc, default: true }] : [],
          },
        }}
      />
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      <div style={{ marginTop: 8 }}>
        <label htmlFor="speed-select" style={{ marginRight: 8, fontWeight: 'bold' }}>Speed:</label>
        <select id="speed-select" value={playbackRate} onChange={handleSpeedChange}>
          {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
            <option key={rate} value={rate}>{rate}x</option>
          ))}
        </select>
      </div>
      {completed && <CheckCircle color="green" size={24} style={{ position: 'absolute', top: 16, right: 16 }} />}
    </div>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  duration: PropTypes.number,
  subtitlesSrc: PropTypes.string,
  onComplete: PropTypes.func,
  style: PropTypes.object,
};

VideoPlayer.defaultProps = {
  title: '',
  duration: null,
  subtitlesSrc: null,
  onComplete: () => {},
  style: {},
};

export default VideoPlayer;