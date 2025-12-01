'use client';

import React, { useRef, useState } from 'react';
import TextType from './TextType';
import VideoSequencer from './VideoSequencer';
import { motion, AnimatePresence } from 'framer-motion';
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

    setMuteState(prev => ({ ...prev, [key]: newVal }));

    const video = refs[key].current;
    if (video) {
      video.muted = newVal;

      // This is the critical fix for browser audio policy
      video.currentTime = video.currentTime;
      video.play().catch(() => {});
    }
  };

  const videoSources = {
    A: 'https://cdn.openai.com/nf2/nf2-lp/nf2-lp-hero/dfe39237-58e5-4119-a639-0a8884e853e4/20250917_1849_a%20western%20cowboy%20sits%20on%20a%20horse%20at%20golden%20hour.%20Slow%20push-in%20on%20the%20cowboy%20as%20he%20says,%20_one%20day%20wit_simple_compose_01k5d85mhffmbsby6z3zff0jxx%20(1).mp4',
    A2: 'https://cdn.openai.com/nf2/nf2-lp/nf2-lp-hero/4544fb23-bfdb-4f39-a226-cbf7bc022cf5/20250925_2005_New%20Video_simple_compose_01k61zpm1jesn8d3wksf7vv35g.mp4',
    B: 'https://cdn.openai.com/nf2/nf2-lp/nf2-lp-hero/eca52501-ab5d-44de-8989-7390969c16bd/20250928_1527_New%20Video_simple_compose_01k696zzdheaaa9n17e2g2dyn9.mp4',
    B2: 'https://cdn.openai.com/nf2/nf2-lp/nf2-lp-audio/4f7b652a-6db1-4ead-86fe-f3a88ba45963/20250928_1750_New%20Video_simple_compose_01k69f5bhrfb6rs9027f5nzrre.mp4',
    C: 'https://cdn.openai.com/nf2/nf2-lp/nf2-lp-hero/4544fb23-bfdb-4f39-a226-cbf7bc022cf5/20250819_1450_ballerina.%20cinematic_simple_compose_01k32501vnfk39f4bs4f9x740h.mp4',
    C2: 'https://openaiassets.blob.core.windows.net/$web/nf2/nf2-lp/nf2-lp-hero/eca52501-ab5d-44de-8989-7390969c16bd/20250928_1502_New%20Video_simple_compose_01k695hnqxe6d98e6qjhte7wgm.mp4',
    D: 'https://cdn.openai.com/nf2/nf2-lp/nf2-lp-hero/dfe39237-58e5-4119-a639-0a8884e853e4/20250918_1431_a%20claymation%20conductor%20conducts%20a%20claymation%20orchestra_simple_compose_01k5fbtf2cfrtvxgmj5fv44r02.mp4',
    D2: 'https://openaiassets.blob.core.windows.net/$web/nf2/nf2-lp/nf2-lp-hero/eca52501-ab5d-44de-8989-7390969c16bd/20250928_1508_New%20Video_simple_compose_01k695xxtae1h9hftz1jprsc0m.mp4',
  };

  return (
    <section className="py-12 px-2 md:py-24 text-white flex flex-col md:flex-row items-center gap-8 md:gap-20">
      {/* LEFT TEXT */}
      <div className="relative flex flex-col gap-4 text-white w-full md:max-w-[40%] px-3">
        <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-medium leading-tight">
          From words to worlds
        </h1>
        <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-snug">
          Start with a prompt or upload an image <br /> to create videos with
          unprecedented <br /> realism in any style: cinematic, <br /> animated,
          photorealistic, or surreal.
        </p>
      </div>

      {/* RIGHT GRID */}
      <div className="w-full md:w-1/2 grid grid-cols-2 gap-8 relative">
        {/* Cowboy */}
        <div className="relative -ml-10">
          <button
            onClick={() => toggleMute('cowboy')}
            className="absolute top-3  right-3 bg-black/60 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm border border-white/20 z-30"
          >
            {muteState.cowboy ? '🔇' : '🔊'}
          </button>

          <VideoSequencer
            ref={refs.cowboy}
            videoSources={[videoSources.A, videoSources.A2]}
            muted={muteState.cowboy}
            videoClassName="rounded-2xl shadow-xl w-full h-[190px] sm:h-[180px] md:h-[220px] lg:h-[250px] xl:h-[270px] object-cover"
          />
        </div>

        {/* Climber */}
        <div className="relative z-10 ">
          <button
            onClick={() => toggleMute('climber')}
            className="absolute top-3 right-3 bg-black/60 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm border border-white/20 z-30"
          >
            {muteState.climber ? '🔇' : '🔊'}
          </button>

          <VideoSequencer
            ref={refs.climber}
            videoSources={[videoSources.B, videoSources.B2]}
            muted={muteState.climber}
            videoClassName="rounded-2xl shadow-xl w-full sm:w-full h-[280px] lg:h-[400px] xl:h-[430px] object-cover"
          />
        </div>

        {/* Floating Text */}
        <div className="absolute bottom-[45%]  left-25 lg:left-35 p-2 sm:p-3 px-4 sm:px-6 bg-gray-800/80 backdrop-blur-sm rounded-full text-xs sm:text-sm md:text-base font-medium flex items-center space-x-2 sm:space-x-3 z-50">
          <TextType
            text={[
              'Create a hillarious video',
              'Create a funny video',
              'Create a cinematic scene',
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />

          <motion.div
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer 
                         transition-all duration-300 hover:bg-yellow-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-4 h-4 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
            </svg>
          </motion.div>
        </div>

        {/* Ballerina */}
        <div className="col-span-1 absolute mt-54 sm:-mt-20 md:mt-57 lg:mt-73 lg:-ml-12 xl:ml-6 -ml-4 sm:ml-4  md:ml-6 hover:z-20">
          <button
            onClick={() => toggleMute('ballerina')}
            className="absolute top-2 sm:top-3 right-3 bg-black/60 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm border border-white/20 z-30"
          >
            {muteState.ballerina ? '🔇' : '🔊'}
          </button>
          <VideoSequencer
            ref={refs.ballerina}
            videoSources={[videoSources.C, videoSources.C2]}
            muted={muteState.ballerina}
            videoClassName="rounded-2xl shadow-xl w-[260px] sm:w-[280px] md:w-[188px] lg:w-[340px] h-[270px] sm:h-[260px] md:h-[286px] lg:h-[360px] xl:h-[390px] object-cover"
          />
        </div>

        {/* Clay */}
        <div className="col-start-2 relative pl-10 md:pl-0 md:-mr-0 -mr-4 md:mt-0 md:ml-10">
          <button
            onClick={() => toggleMute('clay')}
            className="absolute top-2 sm:top-3 right-3 bg-black/60 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm border border-white/20 z-30"
          >
            {muteState.clay ? '🔇' : '🔊'}
          </button>

          <VideoSequencer
            ref={refs.clay}
            videoSources={[videoSources.D, videoSources.D2]}
            muted={muteState.clay}
            videoClassName="rounded-2xl shadow-xl w-full sm:w-[220px] md:w-full h-[140px] sm:h-[150px] md:h-[200px] lg:h-[220px] xl:h-[240px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default SoraShowcase;
