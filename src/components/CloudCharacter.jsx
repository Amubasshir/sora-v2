'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PuffyCloud = ({ mood = 'IDLE' }) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // ------------------------
  // Blinking eyes
  // ------------------------
  useEffect(() => {
    let timeoutId;

    const blinkLoop = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        timeoutId = setTimeout(blinkLoop, Math.random() * 4000 + 2000);
      }, 160);
    };

    timeoutId = setTimeout(blinkLoop, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  // ------------------------
  // Floating animation variants
  // ------------------------
  const floatVariants = {
    IDLE: {
      y: [0, -15, 0],
      rotate: [0, 1, -1, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
    THINKING: {
      y: [0, -5, 0, 5, 0],
      scale: [1, 1.02, 1],
      transition: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
    },
    EXCITED: {
      y: [0, -25, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        type: 'spring',
        stiffness: 220,
      },
    },
    SLEEPING: {
      y: [0, -4, 0],
      opacity: [1, 0.8, 1],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  // ------------------------
  // Eye open/close variants
  // ------------------------
  const eyeVariants = {
    open: { scaleY: 1 },
    closed: { scaleY: 0.1 },
  };

  return (
    <div className="relative w-[100px] h-[100px] flex items-center justify-center">
      {/* Floating cloud wrapper */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#1e2a4a] to-[#0d1117]
              rounded-[2rem] shadow-2xl border border-white/10"
        variants={floatVariants}
        animate={
          mood === 'THINKING'
            ? 'THINKING'
            : mood === 'EXCITED'
            ? 'EXCITED'
            : mood === 'SLEEPING'
            ? 'SLEEPING'
            : 'IDLE'
        }
      >
        {/* Body Shape - Fat "Moto" Cloud with bumpy bottom */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)]"
        >
          <defs>
            <linearGradient
              id="cloudGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#dbeafe" />{' '}
              {/* Blueish tint at bottom */}
            </linearGradient>
          </defs>

          <path
            d="
              M 45,110 
              C 25,110 20,70 55,60
              C 60,25 110,20 130,50
              C 165,40 185,80 170,110
              C 185,140 160,180 125,175
              C 110,190 75,185 65,160
              C 35,165 25,140 45,110
              Z
            "
            fill="url(#cloudGradient)"
          />
        </svg>

        {/* Face Container */}
        <div className="absolute inset-0 flex items-center justify-center pb-2">
          <div className="flex gap-2 items-center translate-y-1">
            {/* Left Eye */}
            <div className="relative w-3 h-4 sm:w-7 sm:h-7">
              <motion.div
                className="w-5 h-full bg-slate-900 rounded-full origin-center overflow-hidden relative"
                variants={eyeVariants}
                animate={isBlinking ? 'closed' : 'open'}
                transition={{ type: 'spring', stiffness: 900, damping: 50 }}
              >
                {/* Sparkles in Eye */}
                <div
                  className="absolute top-[20%] left-[20%] w-[35%] h-[35%] bg-white rotate-45 opacity-90"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  }}
                />
                <div className="absolute bottom-[15%] right-[20%] w-[20%] h-[20%] bg-blue-200 rounded-full opacity-70" />
              </motion.div>
            </div>

            {/* Right Eye */}
            <div className="relative w-3 h-4 sm:w-7 sm:h-7">
              <motion.div
                className="w-5 h-full bg-slate-900 rounded-full origin-center overflow-hidden relative"
                variants={eyeVariants}
                animate={isBlinking ? 'closed' : 'open'}
                transition={{ type: 'spring', stiffness: 900, damping: 50 }}
              >
                {/* Sparkles in Eye */}
                <div
                  className="absolute top-[20%] left-[20%] w-[35%] h-[35%] bg-white rotate-45 opacity-90"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  }}
                />
                <div className="absolute bottom-[15%] right-[20%] w-[20%] h-[20%] bg-blue-200 rounded-full opacity-70" />
              </motion.div>
            </div>
          </div>

          {/* Blush */}
          <div className="absolute top-[60%] w-full flex justify-center gap-16 opacity-30">
            <div className="w-5 h-3 bg-pink-400 rounded-full blur-sm" />
            <div className="w-5 h-3 bg-pink-400 rounded-full blur-sm" />
          </div>
        </div>
      </motion.div>

      {/* Shadow */}
      <motion.div
        className="absolute bottom-0 w-28 h-4 bg-black/20 rounded-full blur-md"
        animate={{ scaleX: [1, 0.8, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
};

export default PuffyCloud;
