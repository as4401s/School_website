"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

import { LocalizedText } from "@/components/language-provider";
import type { BilingualText } from "@/data/site-content";

type HomeVideo = {
  src: string;
  poster: string;
  title: BilingualText;
  summary: BilingualText;
};

type HomeVideoReelProps = {
  videos: HomeVideo[];
};

function clampIndex(index: number, length: number) {
  if (length === 0) {
    return 0;
  }

  return ((index % length) + length) % length;
}

export function HomeVideoReel({ videos }: HomeVideoReelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const previousIndexRef = useRef(0);

  const syncPlayback = useEffectEvent(async () => {
    const currentVideo = videoRefs.current[activeIndex];
    const didSlideChange = previousIndexRef.current !== activeIndex;

    for (const [index, video] of videoRefs.current.entries()) {
      if (!video) {
        continue;
      }

      if (index !== activeIndex) {
        video.pause();
        video.currentTime = 0;
      }
    }

    if (!currentVideo) {
      return;
    }

    if (didSlideChange) {
      currentVideo.currentTime = 0;
    }

    currentVideo.muted = muted;
    previousIndexRef.current = activeIndex;

    try {
      await currentVideo.play();
    } catch {
      if (!currentVideo.muted) {
        currentVideo.muted = true;
        setMuted(true);
        try {
          await currentVideo.play();
        } catch {
          // Ignore final autoplay failure and leave controls available.
        }
      }
    }
  });

  useEffect(() => {
    syncPlayback();
  }, [activeIndex, muted, syncPlayback]);

  useEffect(() => {
    setActiveIndex((current) => clampIndex(current, videos.length));
  }, [videos.length]);

  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="video-reel">
      <div className="video-reel__viewport">
        <div
          className="video-reel__track"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {videos.map((video, index) => (
            <article
              aria-hidden={activeIndex !== index}
              className="video-reel__slide"
              key={video.src}
            >
              <div className="video-reel__media">
                <video
                  className="video-reel__video"
                  loop={false}
                  muted={muted}
                  onEnded={() => setActiveIndex((current) => clampIndex(current + 1, videos.length))}
                  playsInline
                  poster={video.poster}
                  preload="metadata"
                  ref={(element) => {
                    videoRefs.current[index] = element;
                  }}
                  src={video.src}
                />
                <button
                  aria-label={muted ? "Unmute video" : "Mute video"}
                  className="video-reel__sound"
                  onClick={() => setMuted((value) => !value)}
                  type="button"
                >
                  {muted ? (
                    <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" x2="17" y1="9" y2="15" />
                      <line x1="17" x2="23" y1="9" y2="15" />
                    </svg>
                  ) : (
                    <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                      <path d="M19 5a10 10 0 0 1 0 14" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="video-reel__body">
                <LocalizedText as="p" className="eyebrow" text={{ en: "Campus Reel", bn: "ক্যাম্পাস রিল" }} />
                <LocalizedText as="h3" text={video.title} />
                <LocalizedText as="p" text={video.summary} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="video-reel__nav" role="tablist" aria-label="Campus videos">
        {videos.map((video, index) => (
          <button
            aria-selected={activeIndex === index}
            className={`video-reel__nav-item${activeIndex === index ? " video-reel__nav-item--active" : ""}`}
            key={`${video.src}-nav`}
            onClick={() => setActiveIndex(index)}
            role="tab"
            type="button"
          >
            <span className="video-reel__nav-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="video-reel__nav-copy">
              <LocalizedText as="strong" text={video.title} />
              <LocalizedText as="span" text={video.summary} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
