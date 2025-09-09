// Plays the video for members to watch, with some options to customize their watching experience!
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { CheckCircle } from 'lucide-react';

const VideoPlayer = ({ url, title, duration, subtitlesSrc, onComplete }) => {
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

  const handleError = (e) => {
    setError('Sorry, this video cannot be played.');
    console.error('Video playback error:', e);
  };

  return (
    <div className="relative bg-bone_white rounded-lg shadow p-4 max-w-xl mx-auto mb-6 border border-silver_lake_blue">
      <div
        className="font-antonio font-semibold text-prussian_blue text-lg mb-2 truncate"
        title={title}
      >
        {title}
      </div>

      {error ? (
        <div className="p-4 text-red-600 bg-red-100 rounded">{error}</div>
      ) : (
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="270px"
          controls
          onProgress={handleProgress}
          onEnded={handleEnded}
          playbackRate={playbackRate}
          onError={handleError}
          config={{
            file: {
              attributes: {
                crossOrigin: 'anonymous',
              },
              tracks: subtitlesSrc
                ? [
                    {
                      kind: 'subtitles',
                      src: subtitlesSrc,
                      srcLang: 'en',
                      default: true,
                      label: 'English',
                    },
                  ]
                : [],
            },
          }}
        />
      )}

      <div className="mt-2 flex items-center space-x-2 text-prussian_blue font-antonio text-sm">
        <label htmlFor="playbackSpeed" className="font-semibold">
          Speed:
        </label>
        <select
          id="playbackSpeed"
          value={playbackRate}
          onChange={handleSpeedChange}
          className="rounded border px-2 py-1"
          disabled={!!error}
        >
          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
            <option key={speed} value={speed}>
              {speed}x
            </option>
          ))}
        </select>
      </div>

      {completed && !error && (
        <CheckCircle
          size={24}
          className="absolute top-3 right-3 text-prussian_blue"
          title="Video Completed"
        />
      )}

      <div className="mt-2 text-sm text-prussian_blue font-antonio">
        {formatDuration(duration)}
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.number,
  subtitlesSrc: PropTypes.string,
  onComplete: PropTypes.func.isRequired,
};

const formatDuration = (seconds) => {
  if (!seconds) return '';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default VideoPlayer;
