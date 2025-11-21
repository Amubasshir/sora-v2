import { useState, useRef } from 'react';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';

export default function CueTheSound() {
  const videoData = [
    {
      src: 'https://cdn.openai.com/nf2/nf2-lp/nf2-lp-audio/4f7b652a-6db1-4ead-86fe-f3a88ba45963/20250928_1610_New%20Video_simple_compose_01k699enp0e9etjhwz3rhhzwxv.mp4',
    },
    {
      src: 'https://openaiassets.blob.core.windows.net/$web/nf2/nf2-lp/nf2-lp-audio/bbea88b1-c02c-4cbb-aaed-1c855308edea/20250929_0024_New%20Video_simple_compose_01k6a5qn3aevh93zmaqyggszaa.mp4',
    },
    {
      src: 'https://openaiassets.blob.core.windows.net/$web/nf2/nf2-lp/nf2-lp-audio/bbea88b1-c02c-4cbb-aaed-1c855308edea/20250926_1548_New%20Video_simple_compose_01k643d1nafj5vd8c86455qbpm%20(1).mp4',
    },
  ];

  return (
    <section className="w-full py-24 bg-black text-white flex flex-col items-center">
      {/* Title */}
      <h2 className="text-4xl font-semibold">Cue the sound</h2>
      <p className="text-gray-300 mt-3 max-w-md text-center">
        Music, sound effects, and dialogue are automatically included in videos
        to make every scene complete.
      </p>

      {/* Videos */}
      <div
        className="
          mt-16 
          w-full 
          md:grid md:grid-cols-2 lg:grid-cols-3 
          gap-12 
          flex md:block 
          overflow-x-auto scroll-smooth 
          snap-x snap-mandatory 
          px-4
        "
      >
        {videoData.map((v, i) => (
          <div
            key={i}
            className="snap-center flex-shrink-0 md:flex-shrink snap-always"
          >
            <VideoCard src={v.src} />
          </div>
        ))}
      </div>
    </section>
  );
}

function VideoCard({ src }) {
  const videoRef = useRef(null);
  const [playingSound, setPlayingSound] = useState(false);

  const toggleSound = () => {
    const newVal = !playingSound;
    setPlayingSound(newVal);
    if (videoRef.current) videoRef.current.muted = !newVal;
  };

  return (
    <div className="relative mx-auto md:mx-0 rounded-3xl overflow-hidden w-[280px] sm:w-[300px] md:w-[320px] h-[550px] sm:h-[600px] bg-gray-900 shadow-xl">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Play sound button (unchanged) */}
      <button
        onClick={toggleSound}
        className="
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          bg-black/60 text-white backdrop-blur-md px-5 py-2.5
          rounded-full flex items-center gap-2
          text-sm font-medium border border-white/20
          shadow-lg hover:bg-black/70 transition
        "
      >
        Play sound
        {playingSound ? (
          <HiVolumeUp className="text-lg" />
        ) : (
          <HiVolumeOff className="text-lg" />
        )}
      </button>
    </div>
  );
}
