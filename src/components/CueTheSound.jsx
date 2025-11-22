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
    {
      src: 'https://cdn.openai.com/nf2/nf2-lp/nf2-lp-audio/4f7b652a-6db1-4ead-86fe-f3a88ba45963/20250928_1621_New%20Video_simple_compose_01k69a30m6fp3t09402x1b1mvh.mp4',
    },
    {
      src: 'https://cdn.openai.com/nf2/nf2-lp/nf2-lp-audio/4f7b652a-6db1-4ead-86fe-f3a88ba45963/20250928_1629_New%20Video_simple_compose_01k69ahbb2f4wbrfjzy6aznww1.mp4',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto text-white flex flex-col items-center">
      <div className="w-full text-white px-5 md:ml-20 lg:ml-70">
        <h2 className="text-[28px] font-medium lg:text-[40px] mb-5">
          Cue the sound
        </h2>
        <p className="text-[16px] font-medium lg:text-[20px] lg:leading-[130%]">
          Music, sound effects, and dialogue <br />
          are automatically included in videos <br />
          to make every scene complete.
        </p>
      </div>

      {/* Slider Container (Hidden Overflow) */}
      <div className="w-full mt-16 overflow-hidden">
        {/* Slider */}
        <div
          className="
            w-full flex gap-5
            overflow-x-auto scroll-smooth
            snap-x snap-mandatory
            px-4
          "
          style={{ scrollbarWidth: 'none' }}
        >
          {videoData.map((v, i) => (
            <div
              key={i}
              className="snap-center flex-shrink-0 snap-always min-w-[360px] lg:min-w-[400px]"
              onClick={e => {
                e.currentTarget.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                  block: 'nearest',
                });
              }}
            >
              <VideoCard src={v.src} />
            </div>
          ))}
        </div>
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
    <div className="relative mx-auto rounded-3xl overflow-hidden w-[280px] sm:w-[300px] md:w-[320px] h-[450px] sm:h-[550px] bg-gray-900 shadow-xl">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      <button
        onClick={e => {
          e.stopPropagation();
          toggleSound();
        }}
        className="
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          bg-black/60 text-white backdrop-blur-md px-5 py-2.5
          rounded-full flex items-center gap-2
          text-sm font-medium border border-white/20
        "
      >
        Play sound
        {playingSound ? <HiVolumeUp /> : <HiVolumeOff />}
      </button>
    </div>
  );
}
