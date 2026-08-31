import React, { useRef, useEffect, useCallback } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4';

/**
 * BackgroundVideo component
 * - Full-screen muted autoplaying video positioned absolutely with object-cover
 * - Shifted down by 17% (translate-y-[17%])
 * - JavaScript fade system: 500ms requestAnimationFrame-based fade-in on load/loop start
 * - 500ms fade-out when 0.55 seconds remain before video ends
 * - fadingOutRef prevents re-triggering from repeated timeUpdate events
 * - On ended, opacity is set to 0, then after 100ms video resets to currentTime = 0, plays, and fades back in
 * - Competing animation frames are cancelled on each new fade
 * - Fades resume smoothly from current opacity
 */
export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const currentOpacityRef = useRef<number>(0);
  const fadingOutRef = useRef<boolean>(false);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cancelRunningFade = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const animateFade = useCallback(
    (targetOpacity: number, durationMs: number = 500, onComplete?: () => void) => {
      cancelRunningFade();
      const video = videoRef.current;
      if (!video) return;

      const startOpacity = currentOpacityRef.current;
      const opacityDiff = targetOpacity - startOpacity;

      if (Math.abs(opacityDiff) < 0.001) {
        video.style.opacity = targetOpacity.toString();
        currentOpacityRef.current = targetOpacity;
        onComplete?.();
        return;
      }

      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const newOpacity = startOpacity + opacityDiff * progress;

        if (video) {
          video.style.opacity = newOpacity.toString();
        }
        currentOpacityRef.current = newOpacity;

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(tick);
        } else {
          animFrameRef.current = null;
          onComplete?.();
        }
      };

      animFrameRef.current = requestAnimationFrame(tick);
    },
    [cancelRunningFade]
  );

  const startFadeIn = useCallback(() => {
    fadingOutRef.current = false;
    animateFade(1, 500);
  }, [animateFade]);

  const startFadeOut = useCallback(() => {
    fadingOutRef.current = true;
    animateFade(0, 500);
  }, [animateFade]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Initialize state
    video.style.opacity = '0';
    currentOpacityRef.current = 0;
    fadingOutRef.current = false;

    const handleLoadedData = () => {
      video.play().catch((err) => {
        console.warn('Autoplay prevented:', err);
      });
      startFadeIn();
    };

    const handleTimeUpdate = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const remainingTime = video.duration - video.currentTime;

      // 500ms fade-out when 0.55 seconds remain before the video ends
      if (remainingTime <= 0.55 && !fadingOutRef.current) {
        startFadeOut();
      }
    };

    const handleEnded = () => {
      cancelRunningFade();
      if (video) {
        video.style.opacity = '0';
      }
      currentOpacityRef.current = 0;
      fadingOutRef.current = false;

      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }

      // After 100ms, reset to currentTime = 0, play, and fade back in
      restartTimeoutRef.current = setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video
            .play()
            .then(() => {
              startFadeIn();
            })
            .catch(() => {});
        }
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // If already loaded in cache
    if (video.readyState >= 2) {
      video.play().catch(() => {});
      startFadeIn();
    }

    return () => {
      cancelRunningFade();
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [animateFade, cancelRunningFade, startFadeIn, startFadeOut]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%] will-change-transform pointer-events-none"
        style={{ opacity: 0 }}
      />
      {/* Cinematic subtle contrast layer */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />
    </div>
  );
};
