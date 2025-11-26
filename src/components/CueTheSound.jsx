import { useState, useRef, useEffect } from 'react';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';

export default function CueTheSound() {
  const sliderRef = useRef(null);

  const videoData = [
    { src: '' },
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
    { src: '' },
  ];

  const centerCard = index => {
    const slider = sliderRef.current;
    const card = slider.children[index];

    const sliderWidth = slider.clientWidth;
    const cardWidth = card.clientWidth;
    const cardLeft = card.offsetLeft;

    let scrollTo = cardLeft - sliderWidth / 2 + cardWidth / 2;

    const isLargeScreen = window.innerWidth >= 1024;
    if (isLargeScreen) {
      const gap = cardWidth * 0.5;
      if (index === 0) scrollTo -= gap;
      if (index === slider.children.length - 1) scrollTo += gap;
    }

    slider.scrollTo({ left: scrollTo, behavior: 'smooth' });
  };

  // Auto show cards 2, 3, 4 by centering card 2
  useEffect(() => {
    if (sliderRef.current) {
      setTimeout(() => centerCard(2), 100);
    }
  }, []);

  return (
    <section className="relative mx-auto w-full">
      <div className="w-full text-white px-5 md:ml-20 lg:ml-30">
        <h2 className="text-[28px] font-medium lg:text-[40px] mb-5">
          Cue the sound
        </h2>
        <p className="text-[16px] font-medium lg:text-[20px]">
          Music, sound effects, and dialogue <br />
          are automatically included in videos <br />
          to make every scene complete.
        </p>
      </div>

      <div className="w-full mt-16 overflow-hidden">
        <div
          ref={sliderRef}
          className="w-full flex gap-28 overflow-x-auto scroll-smooth px-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {videoData.map((v, i) => (
            <div
              key={i}
              className={`
                snap-center flex-shrink-0
                ${
                  i === 0 || i === videoData.length - 1 ? 'hidden sm:block' : ''
                }
              `}
              onClick={() => centerCard(i)}
            >
              <VideoCard
                src={v.src}
                isEdge={i === 0 || i === videoData.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ src, isEdge }) {
  const videoRef = useRef(null);
  const [playingSound, setPlayingSound] = useState(false);

  const toggleSound = () => {
    const newVal = !playingSound;
    setPlayingSound(newVal);
    if (videoRef.current) videoRef.current.muted = !newVal;
  };

  return (
    <div className="relative mx-auto rounded-3xl overflow-hidden w-[280px] sm:w-[300px] md:w-[350px] h-[450px] sm:h-[600px] shadow-xl">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {!isEdge && (
        <button
          onClick={e => {
            e.stopPropagation();
            toggleSound();
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white backdrop-blur-md px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium border border-white/20"
        >
          Play sound
          {playingSound ? <HiVolumeUp /> : <HiVolumeOff />}
        </button>
      )}
    </div>
  );
}
