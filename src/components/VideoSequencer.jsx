// // This code remains the same as before.
// import React, { useState, useRef, useEffect } from 'react';

// const VideoSequencer = ({ videoSources, videoClassName }) => {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const videoRef = useRef(null);

//   const currentVideoSrc = videoSources[currentVideoIndex];

//   const handleVideoEnded = () => {
//     const nextIndex = (currentVideoIndex + 1) % videoSources.length;
//     setCurrentVideoIndex(nextIndex);
//   };

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.load();
//       videoRef.current.play().catch(error => {
//         console.error('Autoplay was prevented:', error);
//       });
//     }
//   }, [currentVideoSrc]);

//   return (
//     <video
//       ref={videoRef}
//       src={currentVideoSrc}
//       onEnded={handleVideoEnded}
//       autoPlay
//       muted
//       playsInline
//       className={videoClassName}
//     >
//       <source src={currentVideoSrc} type="video/mp4" />
//       Your browser does not support the video tag.
//     </video>
//   );
// };

// export default VideoSequencer;

// import React, { useState, useRef, useEffect, forwardRef } from 'react';

// const VideoSequencer = forwardRef(
//   ({ videoSources, videoClassName, muted }, ref) => {
//     const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//     const localRef = useRef(null);
//     const videoRef = ref || localRef;

//     const currentVideoSrc = videoSources[currentVideoIndex];

//     const handleVideoEnded = () => {
//       const nextIndex = (currentVideoIndex + 1) % videoSources.length;
//       setCurrentVideoIndex(nextIndex);
//     };

//     useEffect(() => {
//       if (videoRef.current) {
//         videoRef.current.load();
//         videoRef.current.muted = muted;
//         videoRef.current.play().catch(() => {});
//       }
//     }, [currentVideoSrc, muted]);

//     return (
//       <video
//         ref={videoRef}
//         src={currentVideoSrc}
//         onEnded={handleVideoEnded}
//         autoPlay
//         playsInline
//         className={videoClassName}
//       >
//         <source src={currentVideoSrc} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     );
//   }
// );

// export default VideoSequencer;
import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import './videoFade.css'; // ✅ animation styles

const VideoSequencer = forwardRef(
  ({ videoSources = [], videoClassName = '', muted = true }, externalRef) => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const internalRef = useRef(null);

    useImperativeHandle(externalRef, () => internalRef.current);

    const currentVideoSrc = videoSources[currentVideoIndex];

    const handleVideoEnded = () => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentVideoIndex(prev => (prev + 1) % videoSources.length);
        setIsTransitioning(false);
      }, 350); // transition sync
    };

    useEffect(() => {
      const video = internalRef.current;
      if (!video) return;

      video.muted = muted;
      video.currentTime = 0;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }, [currentVideoSrc, muted]);

    return (
      <div className="video-wrapper">
        <video
          ref={internalRef}
          key={currentVideoSrc}
          src={currentVideoSrc}
          onEnded={handleVideoEnded}
          autoPlay
          playsInline
          muted={muted}
          preload="auto"
          className={`
            ${videoClassName}
            video-fade
            ${isTransitioning ? 'video-out' : 'video-in'}
          `}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
);

VideoSequencer.displayName = 'VideoSequencer';

export default VideoSequencer;
