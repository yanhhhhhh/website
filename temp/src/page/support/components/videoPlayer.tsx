import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  options: {
    autoplay: boolean;
    controls: boolean;
    poster: string;
    // src: string;
    muted?: boolean;
    width?: number;
    height?: number;
    sources: {
      type: string;
      src: string;
    }[];
  };
  onReady?: (player: Player) => void;
}

export const VideoPlayer = (props: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const scrollTopRef = useRef<number>(0);
  const { options, onReady } = props;
  // 修复全屏切换时，页面滚动到顶部的问题
  function fixFullscreenChange(player: Player) {
    const _controlBar = player.getChild('controlBar');

    const _fullscreenToggle = _controlBar?.getChild('fullscreenToggle');

    _fullscreenToggle?.on(['tap', 'click'], function () {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const fullscreen = player.isFullscreen();
      if (!fullscreen) {
        // 进入全屏
        scrollTopRef.current = scrollTop;
      }
    });
    // 全屏

    player.on('fullscreenchange', () => {
      const fullscreen = player.isFullscreen();

      if (!fullscreen) {
        // 退出全屏

        document.documentElement.scrollTop = scrollTopRef.current;
        document.body.scrollTop = scrollTopRef.current;
      }
    });
  }
  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          playsinline: true,
          preload: 'auto',
        },
        () => {
          videojs.log('player is ready');
          onReady && onReady(player);
        }
      ));

      fixFullscreenChange(player);

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
