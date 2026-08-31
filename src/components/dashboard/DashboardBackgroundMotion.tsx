import React, { useEffect, useRef, useState, useCallback } from 'react';

interface DashboardBackgroundMotionProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'vibrant';
  variant?: 'dashboard' | 'auth' | 'modal';
  isFixed?: boolean;
}

const JELLY_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_115057_94c3699b-0fd1-4124-bcf3-3626bb8c1f77.mp4';

export const DashboardBackgroundMotion: React.FC<DashboardBackgroundMotionProps> = ({
  className = '',
  intensity = 'medium',
  variant = 'dashboard',
  isFixed = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const currentOpacityRef = useRef<number>(0);
  const fadingOutRef = useRef<boolean>(false);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle mouse parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 15,
      y: (clientY / innerHeight - 0.5) * 15,
    });
  }, []);

  const cancelRunningFade = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const animateFade = useCallback(
    (targetOpacity: number, durationMs: number = 600, onComplete?: () => void) => {
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
    const target = intensity === 'subtle' ? 0.35 : intensity === 'medium' ? 0.65 : 0.85;
    animateFade(target, 700);
  }, [animateFade, intensity]);

  const startFadeOut = useCallback(() => {
    fadingOutRef.current = true;
    animateFade(0, 600);
  }, [animateFade]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '0';
    currentOpacityRef.current = 0;
    fadingOutRef.current = false;

    const handleLoadedData = () => {
      video.play().catch(() => {});
      startFadeIn();
    };

    const handleTimeUpdate = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const remainingTime = video.duration - video.currentTime;
      if (remainingTime <= 0.65 && !fadingOutRef.current) {
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
    <div
      onMouseMove={handleMouseMove}
      className={`${
        isFixed ? 'fixed inset-0' : 'absolute inset-0'
      } pointer-events-none z-0 overflow-hidden select-none bg-[#050608] ${className}`}
      aria-hidden="true"
    >
      {/* Bioluminescent Butterfly Jellyfish Motion Video */}
      <video
        ref={videoRef}
        src={JELLY_VIDEO_URL}
        muted
        playsInline
        autoPlay
        loop={false}
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover will-change-transform pointer-events-none transition-transform duration-700 ${
          variant === 'auth' ? 'scale-110 object-center' : 'scale-105 object-center'
        }`}
        style={{
          opacity: 0,
          transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
        }}
      />

      {/* Ambient Bioluminescent Glow Spheres */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(147,197,253,0.12) 0%, rgba(222,219,200,0.05) 50%, rgba(0,0,0,0) 80%)',
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(222,219,200,0.10) 0%, rgba(52,211,153,0.04) 50%, rgba(0,0,0,0) 80%)',
        }}
      />

      {/* Fine Grain Texture & Soft Vignette */}
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/80 pointer-events-none" />
    </div>
  );
};
