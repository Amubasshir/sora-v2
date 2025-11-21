'use client';

import React from 'react';
import { useCloud } from '../CloudContext';
import PuffyCloud from './PuffyCloud';
import { motion } from 'framer-motion';

const CloudClickArea = ({ children }) => {
  const { position, setPosition } = useCloud();

  const handleClick = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left - 50, // half cloud width
      y: e.clientY - rect.top - 50, // half cloud height
    });
  };

  return (
    <div className="w-full h-screen relative" onClick={handleClick}>
      {children}

      {/* Wrap PuffyCloud in a motion.div with explicit width/height */}
      <motion.div
        style={{ position: 'absolute', width: 100, height: 100 }} // same size as PuffyCloud
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        <PuffyCloud mood="IDLE" />
      </motion.div>
    </div>
  );
};

export default CloudClickArea;
