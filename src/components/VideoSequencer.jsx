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
import React, { useState, useRef, useEffect, forwardRef } from 'react';

const VideoSequencer = forwardRef(
  ({ videoSources, videoClassName, muted }, ref) => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const localRef = useRef(null);
    const videoRef = ref || localRef;

    const currentVideoSrc = videoSources[currentVideoIndex];

    const handleVideoEnded = () => {
      const nextIndex = (currentVideoIndex + 1) % videoSources.length;
      setCurrentVideoIndex(nextIndex);
    };

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.muted = muted;
        videoRef.current.play().catch(() => {});
      }
    }, [currentVideoSrc, muted]);

    return (
      <video
        ref={videoRef}
        src={currentVideoSrc}
        onEnded={handleVideoEnded}
        autoPlay
        playsInline
        className={videoClassName}
      >
        <source src={currentVideoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
);

export default VideoSequencer;
