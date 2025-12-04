'use client';
import React, { useState, useEffect } from 'react';
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
  {
    name: 'Thomas_Dev',
    avatarUrl: 'https://placehold.co/100x100/40C4FF/ffffff?text=TD',
  },
];

// --- Suggestion Item ---
const SuggestionItem = ({ profile, animate, scaleValue }) => (
  <motion.div
    className="flex items-center space-x-3 bg-gray-700 p-2 rounded-lg mb-2"
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

  const stepRef = React.useRef('min'); // min -> thomas -> done

  const handleTypeUpdate = text => {
    setCurrentText(text);

    // @min trigger
    if (
      stepRef.current === 'min' &&
      text.toLowerCase().includes('@min') &&
      !currentText.includes('@minnia')
    ) {
      setIsPaused(true);
      setAnimateProfile('min');

      setTimeout(() => {
        setAnimateProfile(null);
        setIsPaused(false);
        setCurrentText(fullText); // full @minnia and rest
        stepRef.current = 'thomas';
      }, 1000);
    }

    // @thomas trigger
    else if (
      stepRef.current === 'thomas' &&
      text.toLowerCase().includes('@th') &&
      !currentText.includes('@thomas')
    ) {
      setIsPaused(true);
      setAnimateProfile('thomas');

      setTimeout(() => {
        setAnimateProfile(null);
        setIsPaused(false);
        setCurrentText(fullText); // full text
        stepRef.current = 'done';
      }, 1000);
    }
  };

  return (
    <div className="relative flex items-center p-5">
      <div className="relative w-full max-w-md">
        <AnimatePresence>
          {animateProfile === 'min' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full mb-3 w-64 p-2 rounded-xl shadow-2xl bg-gray-800/80 border border-white/10 z-10"
            >
              {PROFILES.filter(p => p.name.includes('Minnia')).map((p, i) => (
                <SuggestionItem
                  key={p.name}
                  profile={p}
                  animate={i === 0}
                  scaleValue={0.9}
                />
              ))}
            </motion.div>
          )}
          {animateProfile === 'thomas' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full mb-3 w-64 p-2 rounded-xl shadow-2xl bg-gray-800/80 border border-white/10 z-10"
            >
              {PROFILES.filter(p => p.name.includes('Thomas')).map((p, i) => (
                <SuggestionItem
                  key={p.name}
                  profile={p}
                  animate={i === 1}
                  scaleValue={0.9}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-3 rounded-full text-white flex items-center shadow-2xl bg-gray-700 text-base font-medium gap-3 space-x-2 sm:space-x-3 z-50">
          <TextType
            text={fullText}
            typingSpeed={typingSpeed}
            onTypeUpdate={handleTypeUpdate}
            isPaused={isPaused}
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
      </div>
    </div>
  );
};

export default MentionApp;
