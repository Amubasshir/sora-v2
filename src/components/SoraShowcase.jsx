'use client';

import React, { useRef, useState } from 'react';
import TextType from './TextType';
import VideoSequencer from './VideoSequencer';

const SoraShowcase = () => {
  const [muteState, setMuteState] = useState({
    cowboy: true,
    climber: true,
    ballerina: true,
    clay: true,
  });

  const refs = {
    cowboy: useRef(null),
    climber: useRef(null),
    ballerina: useRef(null),
    clay: useRef(null),
  };

  const toggleMute = key => {
    const newVal = !muteState[key];
    setMuteState({ ...muteState, [key]: newVal });

    if (refs[key].current) {
      refs[key].current.muted = newVal;
    }
  };

  const videoSources = {
    A: 'https://cdn.openai.com/nf2/nf2-lp/nf2-lp-hero/dfe39237-58e5-4119-a639-0a8884e853e4/20250917_1849_a%20western%20cowboy%20sits%20on%20a%20horse%20at%20golden%20hour.%20Slow%20push-in%20on%20the%20cowboy%20as%20he%20says,%20_one%20day%20wit_simple_compose_01k5d85mhffmbsby6z3zff0jxx%20(1).mp4',
    A2: 'https://openaiassets.blob.core.windows.net/$web/nf2/nf2-lp/nf2-lp-hero/eca52501-ab5d-44de-8989-7390969c16bd/20250926_1400_New%20Video_simple_compose_01k63x6fv1e6p9mnk8t7mgny58%20(1).mp4',

    B: 'https://cdn.openai.com/nf2/nf2-lp/nf2-lp-hero/eca52501-ab5d-44de-8989-7390969c16bd/20250928_1527_New%20Video_simple_compose_01k696zzdheaaa9n17e2g2dyn9.mp4',
    B2: 'https://cdn.openai.com/nf2/nf2-lp/nf2-lp-audio/4f7b652a-6db1-4ead-86fe-f3a88ba45963/20250928_1750_New%20Video_simple_compose_01k69f5bhrfb6rs9027f5nzrre.mp4',

    C: 'https://cdn.openai.com/nf2/nf2-lp/nf2-lp-hero/4544fb23-bfdb-4f39-a226-cbf7bc022cf5/20250819_1450_ballerina.%20cinematic_simple_compose_01k32501vnfk39f4bs4f9x740h.mp4',
    C2: 'https://openaiassets.blob.core.windows.net/$web/nf2/nf2-lp/nf2-lp-hero/eca52501-ab5d-44de-8989-7390969c16bd/20250928_1502_New%20Video_simple_compose_01k695hnqxe6d98e6qjhte7wgm.mp4',

    D: 'https://cdn.openai.com/nf2/nf2-lp/nf2-lp-hero/dfe39237-58e5-4119-a639-0a8884e853e4/20250918_1431_a%20claymation%20conductor%20conducts%20a%20claymation%20orchestra_simple_compose_01k5fbtf2cfrtvxgmj5fv44r02.mp4',
    D2: 'https://openaiassets.blob.core.windows.net/$web/nf2/nf2-lp/nf2-lp-hero/eca52501-ab5d-44de-8989-7390969c16bd/20250928_1508_New%20Video_simple_compose_01k695xxtae1h9hftz1jprsc0m.mp4',
  };

  return (
    <section className=" py-16 md:py-24 text-white flex flex-col md:flex-row items-center gap-10">
      {/* LEFT TEXT */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-balance text-[28px] font-medium leading-[118%] tracking-[-0.015em] lg:text-[40px] mb-5">
          From words to worlds
        </h1>
        <p className="text-balance text-[16px] font-medium leading-[140%] tracking-[-0.01em] lg:text-[20px] lg:leading-[130%]">
          Start with a prompt or upload an image <br /> to create videos with
          unprecedented <br /> realism in any style: cinematic, <br /> animated,
          photorealistic, or surreal.
        </p>
      </div>

      {/* RIGHT GRID */}
      <div className="w-full md:w-1/2 relative grid grid-cols-2 gap-3">
        {/* Cowboy */}
        <div className="relative">
          <VideoSequencer
            ref={refs.cowboy}
            videoSources={[videoSources.A, videoSources.A2]}
            muted={muteState.cowboy}
            videoClassName="rounded-2xl shadow-xl w-full h-[160px] sm:h-[200px] md:h-[220px] lg:h-[250px] xl:h-[270px] object-cover"
          />

          <button
            onClick={() => toggleMute('cowboy')}
            className="absolute bottom-60 right-3 bg-black/60 px-3 py-2 rounded-full text-sm border border-white/20 z-30"
          >
            {muteState.cowboy ? '🔇' : '🔊'}
          </button>
        </div>

        {/* Climber */}
        <div className="relative">
          <VideoSequencer
            ref={refs.climber}
            videoSources={[videoSources.B, videoSources.B2]}
            muted={muteState.climber}
            videoClassName="rounded-2xl shadow-xl w-full h-[300px] sm:h-[360px] md:h-[430px] lg:h-[460px] xl:h-[500px] object-cover"
          />

          <button
            onClick={() => toggleMute('climber')}
            className="absolute bottom-3 right-3 bg-black/60 px-3 py-2 rounded-full text-sm border border-white/20"
          >
            {muteState.climber ? '🔇' : '🔊'}
          </button>
        </div>

        {/* Floating Text */}
        <div
          className="absolute bottom-[45%] left-1/2 -translate-x-1/2 p-3 px-6 bg-gray-800/80 backdrop-blur-sm rounded-full 
                        text-xs sm:text-sm md:text-base text-white font-medium flex items-center space-x-3 z-30"
        >
          <div className="flex items-center">
            <TextType
              text={[
                'Create a hillarious video',
                'Create a funny video',
                'Create a cinematic scen',
                'Create a cinematic scene|',
                'Create a cinematic scene',
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>

          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer">
            <svg
              className="w-4 h-4 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7 7 7M12 3v18"
              ></path>
            </svg>
          </div>
        </div>

        {/* Ballerina */}
        <div className="col-span-1 relative -mt-24 sm:-mt-32 md:-mt-40">
          <VideoSequencer
            ref={refs.ballerina}
            videoSources={[videoSources.C, videoSources.C2]}
            muted={muteState.ballerina}
            videoClassName="rounded-2xl shadow-xl w-full h-[260px] sm:h-[300px] md:h-[340px] lg:h-[360px] xl:h-[390px] object-cover"
          />

          <button
            onClick={() => toggleMute('ballerina')}
            className="absolute bottom-10 right-3 bg-black/60 px-3 py-2 rounded-full text-sm border border-white/20"
          >
            {muteState.ballerina ? '🔇' : '🔊'}
          </button>
        </div>

        {/* Clay */}
        <div className="col-start-2 relative mt-4">
          <VideoSequencer
            ref={refs.clay}
            videoSources={[videoSources.D, videoSources.D2]}
            muted={muteState.clay}
            videoClassName="rounded-2xl shadow-xl w-full h-[150px] sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] object-cover"
          />

          <button
            onClick={() => toggleMute('clay')}
            className="absolute bottom-3 right-3 bg-black/60 px-3 py-2 rounded-full text-sm border border-white/20"
          >
            {muteState.clay ? '🔇' : '🔊'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SoraShowcase;
