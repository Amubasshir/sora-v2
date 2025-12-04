'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Profile Data ---
const PROFILES = [
  {
    name: 'Minnia_Dev',
    avatarUrl: 'https://placehold.co/100x100/A05EFF/ffffff?text=MD',
  },
  {
    name: 'Minnia_Art',
    avatarUrl: 'https://placehold.co/100x100/A05EFF/ffffff?text=MA',
  },
  {
    name: 'Minnia_Coder',
    avatarUrl: 'https://placehold.co/100x100/A05EFF/ffffff?text=MC',
  },
  {
    name: 'Thomas_Coder',
    avatarUrl: 'https://placehold.co/100x100/40C4FF/ffffff?text=TC',
  },
  {
    name: 'Thomas_Art',
    avatarUrl: 'https://placehold.co/100x100/40C4FF/ffffff?text=TA',
  },
];

// --- Suggestion Item (Avatar + Name zoom animation) ---
const SuggestionItem = ({ profile, animate, scaleValue }) => (
  <motion.div
    className="relative flex items-center space-x-3 bg-gray-700 p-2 rounded-lg mb-2"
    animate={animate ? { scale: [1, scaleValue, 1] } : {}}
    transition={{ duration: 0.7 }}
  >
    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
      <img
        src={profile.avatarUrl}
        alt={profile.name}
        className="w-full h-full object-cover"
      />
    </div>
    <motion.div
      animate={animate ? { scale: [1, scaleValue, 1] } : {}}
      transition={{ duration: 0.7 }}
    >
      <h3 className="text-sm font-semibold text-white">{profile.name}</h3>
    </motion.div>
  </motion.div>
);

// --- TextType Component ---
const TextType = ({ text, typingSpeed, onTypeUpdate, isPaused }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isPaused || index >= text.length) return;

    const timeout = setTimeout(() => {
      setIndex(prev => prev + 1);
      onTypeUpdate(text.substring(0, index + 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [index, text, typingSpeed, onTypeUpdate, isPaused]);

  return (
    <span className="text-white font-medium">
      {text.substring(0, index)}
      {!isPaused && index < text.length && (
        <span className="ml-1 animate-pulse">|</span>
      )}
    </span>
  );
};

// --- Main Component ---
const MentionApp = () => {
  const fullText = '@minnia and @thomas in a retro futuristic world';
  const [currentText, setCurrentText] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [animateProfile, setAnimateProfile] = useState(null);
  const typingSpeed = 100;

  // Queue for profile groups
  const profilesQueue = useRef([
    {
      key: 'Minnia',
      profiles: PROFILES.filter(p => p.name.includes('Minnia')),
      scale: 0.9,
      animateIndex: 0,
    },
    {
      key: 'Thomas',
      profiles: PROFILES.filter(p => p.name.includes('Thomas')),
      scale: 0.9,
      animateIndex: 1,
    }, // only second profile animates
  ]);

  const handleTypeUpdate = text => {
    setCurrentText(text);

    if (profilesQueue.current.length > 0) {
      const nextGroup = profilesQueue.current[0];

      if (
        text.toLowerCase().includes(`@${nextGroup.key.toLowerCase()}`) &&
        !animateProfile
      ) {
        setIsPaused(true);
        setAnimateProfile(nextGroup.key);

        setTimeout(() => {
          setAnimateProfile(null);
          setIsPaused(false);
          profilesQueue.current.shift();
        }, 900); // animation duration
      }
    }
  };

  return (
    <div className="relative flex  items-center  p-5">
      <div className="relative w-full max-w-md">
        <AnimatePresence>
          {animateProfile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full mb-3 w-64 p-2 rounded-xl shadow-2xl bg-gray-800/80 border border-white/10 z-10"
            >
              {profilesQueue.current[0]?.profiles.map((p, i) => (
                <SuggestionItem
                  key={p.name}
                  profile={p}
                  animate={i === profilesQueue.current[0].animateIndex} // animation only on specified profile
                  scaleValue={profilesQueue.current[0].scale}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-2 sm:p-3 px-4  rounded-full text-white flex text-base font-medium items-center space-x-2 sm:space-x-3 z-50 shadow-2xl bg-gray-700">
          <TextType
            text={fullText}
            typingSpeed={typingSpeed}
            onTypeUpdate={handleTypeUpdate}
            isPaused={isPaused}
          />
        </div>
      </div>
    </div>
  );
};

export default MentionApp;
