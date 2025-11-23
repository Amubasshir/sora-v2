import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. Data and Constants (Updated with multiple profiles) ---
const SUGGESTIONS_DATA = [
  {
    name: 'Minnia_Dev',
    followers: 20,
    description: 'Software Engineer',
    avatarUrl: 'https://placehold.co/100x100/A05EFF/ffffff?text=MD',
  },
  {
    name: 'Minnia_Art',
    followers: 55,
    description: 'Digital Artist',
    avatarUrl: 'https://placehold.co/100x100/A05EFF/ffffff?text=MA',
  },
  {
    name: 'Thomas_Coder',
    followers: 15,
    description: 'Backend Developer',
    avatarUrl: 'https://placehold.co/100x100/40C4FF/ffffff?text=TC',
  },
  {
    name: 'Thomas_Art',
    followers: 42,
    description: '3D Modeler',
    avatarUrl: 'https://placehold.co/100x100/40C4FF/ffffff?text=TA',
  },
  {
    name: 'Mina',
    followers: 38,
    description: 'Marketing Specialist',
    avatarUrl: 'https://placehold.co/100x100/FF5252/ffffff?text=MI',
  },
  {
    name: 'Minal',
    followers: 22,
    description: 'UI/UX Designer',
    avatarUrl: 'https://placehold.co/100x100/F9A825/ffffff?text=ML',
  },
];

// Framer Motion variants for the slide-up/fade-in animation
const suggestionsVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 25,
    },
  },
};

// --- 2. TextType Component (Handles the animated typing effect) ---
const TextType = ({
  text,
  typingSpeed = 75,
  showCursor = true,
  cursorCharacter = '|',
  onTypeUpdate,
  isPaused,
}) => {
  // Use initialIndex to start typing from 0 or from the end if paused (after selection)
  const initialIndex = isPaused ? text.length : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // The text being displayed is always a substring of the full 'text' prop
  const displayedText = text.substring(0, currentIndex);
  const isTypingComplete = currentIndex >= text.length;

  // Sync index when parent updates text (e.g., after selection)
  useEffect(() => {
    if (isPaused) {
      // When paused (after selection), ensure currentIndex is at the end of the new text
      setCurrentIndex(text.length);
    } else if (currentIndex > text.length) {
      // If typing resumes and text has changed/shrunk, reset index
      setCurrentIndex(0);
    }
  }, [text, isPaused]);

  const memoizedOnTypeUpdate = useCallback(onTypeUpdate, [onTypeUpdate]);

  useEffect(() => {
    if (isPaused || isTypingComplete) {
      return;
    }

    const timeout = setTimeout(() => {
      const nextIndex = currentIndex + 1;
      const nextText = text.substring(0, nextIndex);

      setCurrentIndex(nextIndex);
      memoizedOnTypeUpdate(nextText); // Report update back to parent
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    text,
    typingSpeed,
    memoizedOnTypeUpdate,
    isPaused,
    isTypingComplete,
  ]);

  return (
    <span className="text-white font-medium">
      {displayedText}
      {/* Show cursor only if typing is not complete and not paused */}
      {showCursor && !isTypingComplete && !isPaused && (
        <span className="ml-1 opacity-100 transition-opacity duration-500 animate-pulse">
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

// --- 3. MentionSuggestions Component ---
const SuggestionItem = ({
  name,
  followers,
  avatarUrl,
  description,
  isSelected,
  onClick,
}) => (
  <div
    className={`p-2 rounded-lg flex items-center space-x-3 transition-colors duration-200 
                ${
                  isSelected ? 'bg-white/10' : 'hover:bg-white/5'
                } cursor-pointer`}
    onClick={() => onClick(name)} // Handle click and pass the selected name
  >
    {/* Avatar */}
    <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden border border-white/20">
      <img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className="w-full h-full object-cover"
        onError={e => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/100x100/374151/ffffff?text=?';
        }}
      />
    </div>

    {/* Text */}
    <div>
      <h3 className="text-sm font-semibold text-white">{name}</h3>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  </div>
);

const MentionSuggestions = ({ show, mentionPrefix, onSelect }) => {
  const filteredSuggestions = SUGGESTIONS_DATA.filter(s =>
    s.name.toLowerCase().includes(mentionPrefix.toLowerCase())
  );

  // Use AnimatePresence to handle the smooth unmount (exit) animation
  return (
    <AnimatePresence>
      {show &&
        filteredSuggestions.length > 0 && ( // Only show if there are results
          <motion.div
            // Positioning is now relative to the centered input wrapper
            className="absolute bottom-full mb-3 w-64 p-2 rounded-xl shadow-2xl overflow-hidden
                     bg-gray-800/80 border border-white/10 z-10" // Glassmorphism style
            variants={suggestionsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <SuggestionItem
                key={suggestion.name}
                {...suggestion}
                isSelected={index === 0} // Highlight the first one
                onClick={onSelect} // Pass the selection handler
              />
            ))}
          </motion.div>
        )}
    </AnimatePresence>
  );
};

// --- 4. Main Application Component ---
const MentionApp = () => {
  // The full text to be typed
  const fullText = '@minnia and @thomas in a retro futuristic world';
  const [currentText, setCurrentText] = useState('');
  const [isTypingPaused, setIsTypingPaused] = useState(false);

  // LOGIC TO DETECT ACTIVE MENTION AND SHOW THE BOX
  const lastAtIndex = currentText.lastIndexOf('@');

  let mentionPrefix = '';
  let showSuggestions = false;

  if (lastAtIndex !== -1) {
    const textAfterAt = currentText.substring(lastAtIndex + 1);

    // Check if the text after '@' contains a space or if typing is paused
    if (!textAfterAt.includes(' ') && !isTypingPaused) {
      mentionPrefix = textAfterAt;
      // Only show suggestions if there's an active mention prefix being typed
      showSuggestions = mentionPrefix.length > 0;
    }
  }

  // Memoize the callback function for updating text from TextType
  const handleTypeUpdate = useCallback(
    text => {
      if (!isTypingPaused) {
        setCurrentText(text);
      }
    },
    [isTypingPaused]
  );

  // Handle selection from the suggestion box
  const handleSelectSuggestion = useCallback(
    selectedName => {
      if (lastAtIndex === -1) return;

      // 1. Get the part of the text *before* the current @
      const textBeforeAt = currentText.substring(0, lastAtIndex);

      // 2. Construct the new text: (text before @) + (@selectedName) + (a space to close the mention)
      const newText = `${textBeforeAt}@${selectedName} `;

      // 3. Find the rest of the original text after the mention
      // Find the end of the current mention (either a space or end of string)
      const endOfMention = currentText.indexOf(' ', lastAtIndex);
      const textAfterMention =
        endOfMention !== -1 ? currentText.substring(endOfMention) : '';

      const finalNewText = newText + textAfterMention.trimStart();

      // 4. Update state to reflect selection
      setCurrentText(finalNewText);
      setIsTypingPaused(true); // Pause typing animation immediately
    },
    [currentText, lastAtIndex]
  );

  return (
    // Full screen setup with transparent background and centered content
    <div className="relative  flex items-center justify-center">
      {/* This wrapper is now centered by the parent flex container */}
      <div className="w-[80%] max-w-lg p-4">
        {/* The Mention Suggestions Box and Input Wrapper */}
        <div className="relative">
          <MentionSuggestions
            show={showSuggestions && !isTypingPaused}
            mentionPrefix={mentionPrefix}
            onSelect={handleSelectSuggestion} // Pass selection handler
          />

          {/* Input Bar Structure */}
          <div
            className="p-3 px-6  bgnav rounded-full 
                       text-sm text-white font-medium flex items-center justify-between space-x-3 
                       shadow-2xl  relative z-20"
          >
            <div className="flex items-center flex-grow">
              {/* Text Typing Animation Component */}
              <TextType
                text={isTypingPaused ? currentText : fullText} // Use currentText if paused, else use fullText for typing
                typingSpeed={150}
                showCursor={true}
                cursorCharacter="|"
                onTypeUpdate={handleTypeUpdate}
                isPaused={isTypingPaused} // Pass pause state
              />
            </div>

            {/* Up Arrow Icon / Send Button */}
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
    </div>
  );
};

export default MentionApp;
