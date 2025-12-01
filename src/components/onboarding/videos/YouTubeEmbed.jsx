import { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";

let youTubeApiPromise = null;

function loadYouTubeIframeAPI() {
  if (youTubeApiPromise) return youTubeApiPromise;

  youTubeApiPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }

    const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === "function") prev();
      resolve(window.YT);
    };
  });

  return youTubeApiPromise;
}

function extractYouTubeId(url) {
  try {
    if (!url) return null;
    if (url.includes("youtube.com/embed/")) return url.split("/embed/")[1].split(/[?&]/)[0];
    if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split(/[?&]/)[0];
    if (url.includes("youtube.com/watch")) return new URL(url).searchParams.get("v");
  } catch {
    // ignore
  }
  return null;
}

const YouTubeEmbed = ({ url, title, autoplay, onError }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const errorFiredRef = useRef(false);

  const videoId = useMemo(() => extractYouTubeId(url), [url]);

  useEffect(() => {
    let cancelled = false;
    let watchdog = null;
    let postReadyCheck = null;

    async function init() {
      if (!videoId || !containerRef.current) {
        if (!errorFiredRef.current) {
          errorFiredRef.current = true;
          onError?.(null);
        }
        return;
      }

      const YT = await loadYouTubeIframeAPI();
      if (cancelled) return;

      // Cleanup any prior instance
      try {
        playerRef.current?.destroy?.();
      } catch {
        // ignore
      }
      playerRef.current = null;
      errorFiredRef.current = false;

      // If we don't actually start/buffer within a short window, treat as embed failure.
      // Some YouTube failures show a black player at 0:00 and never emit onError; this catches that.
      const clearTimers = () => {
        if (watchdog) {
          clearTimeout(watchdog);
          watchdog = null;
        }
        if (postReadyCheck) {
          clearTimeout(postReadyCheck);
          postReadyCheck = null;
        }
      };

      watchdog = setTimeout(() => {
        if (cancelled || errorFiredRef.current) return;
        errorFiredRef.current = true;
        onError?.("timeout");
      }, 6000);

      playerRef.current = new YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          mute: autoplay ? 1 : 0,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            // Try to start playback. Some browsers treat this as user-initiated because it follows a click
            // (even if async), but we also set mute=1 to maximize autoplay reliability.
            try {
              if (autoplay) {
                playerRef.current?.playVideo?.();
              }
            } catch {
              // ignore
            }

            // After a brief delay, verify the player isn't stuck at 0:00.
            postReadyCheck = setTimeout(() => {
              if (cancelled || errorFiredRef.current) return;
              try {
                const state = playerRef.current?.getPlayerState?.();
                const t = playerRef.current?.getCurrentTime?.() || 0;
                // If still at start and not actively playing/buffering, treat as failure.
                const PLAYING = 1;
                const BUFFERING = 3;
                if (t <= 0 && state !== PLAYING && state !== BUFFERING) {
                  errorFiredRef.current = true;
                  clearTimers();
                  onError?.("stuck");
                }
              } catch {
                // If we can't query state, fall back to watchdog.
              }
            }, 2500);
          },
          onStateChange: (e) => {
            const state = e?.data;
            // Treat only "actually started/buffering" as success; "cued" can still be a silent failure.
            if (state === 1 || state === 3) {
              clearTimers();
            }
          },
          onError: (e) => {
            // YouTube error codes:
            // 2, 5, 100, 101, 150. Embedding disabled is typically 101/150.
            if (cancelled || errorFiredRef.current) return;
            errorFiredRef.current = true;
            clearTimers();
            onError?.(e?.data);
          },
        },
      });
    }

    init();

    return () => {
      cancelled = true;
      if (watchdog) clearTimeout(watchdog);
      if (postReadyCheck) clearTimeout(postReadyCheck);
      try {
        playerRef.current?.destroy?.();
      } catch {
        // ignore
      }
      playerRef.current = null;
    };
  }, [videoId, autoplay, onError]);

  return (
    <div className="w-full h-full">
      {/* The YouTube API will replace this node with an iframe */}
      <div ref={containerRef} className="w-full h-full" title={title} />
    </div>
  );
};

YouTubeEmbed.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  autoplay: PropTypes.bool,
  onError: PropTypes.func,
};

YouTubeEmbed.defaultProps = {
  autoplay: true,
};

export default YouTubeEmbed;

