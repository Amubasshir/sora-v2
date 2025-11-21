import React from 'react';
import { FaGooglePlay } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa6';

import PuffyCloud from './PuffyCloud';

const Footer = () => {
  return (
    // Outer container: Full screen, dark background, centered content
    <div className="min-h-screen  text-white flex items-center justify-center p-4 overflow-hidden relative ">
      {/* 2. Centered Content Container */}
      <div className="z-10 text-center max-w-lg mx-auto">
        {/* App Icon (Cloud Placeholder) */}
        {/* <CloudClickArea> */}
        <div className="flex justify-center">
          <PuffyCloud></PuffyCloud>
        </div>
        {/* </CloudClickArea> */}
        {/* 3. Title and Description */}
        <h1 className="text-[36px] font-medium mb-4 tracking-tighter">
          The new Sora app
        </h1>
        <p className="text-xl font-medium text-white mb-8 ">
          Turn your ideas into videos with hyperreal motion and sound.
        </p>

        <p className="text-lg text-white font-medium mb-12">Rolling out now.</p>

        {/* 4. Download Buttons */}
        <div
          className="flex items-center justify-center 
  space-x-3 mb-12 w-full flex-nowrap"
        >
          {/* App Store Button */}
          <a
            href="#"
            target="_blank"
            className="flex items-center justify-center px-3 py-2 
       bg-black border border-white rounded-lg 
       transition duration-200 hover:bg-gray-900
       w-auto text-white
       min-w-[140px] sm:min-w-[160px]" // slightly smaller for no-wrap
          >
            <div className="mr-2">
              <FaApple size={24} />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="font-extralight text-[9px] sm:text-xs">
                Download on the
              </span>
              <span className="font-semibold text-sm sm:text-lg">
                App Store
              </span>
            </div>
          </a>

          {/* Google Play Button */}
          <a
            href="#"
            target="_blank"
            className="flex items-center justify-center px-3 py-2
       bg-black border border-white rounded-lg
       transition duration-200 hover:bg-gray-900
       w-auto text-white
       min-w=[140px] sm:min-w-[160px] text-start"
          >
            <div className="mr-2">
              {/* <FaApple size={24} /> */}
              <img
                src="https://www.svgrepo.com/show/452223/google-play.svg"
                alt=""
                className="w-6"
              />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="font-extralight text-[9px] sm:text-xs">
                GET IT ON
              </span>
              <span className="font-semibold text-sm sm:text-lg">
                Google Play
              </span>
            </div>
          </a>
        </div>

        {/* 5. Read the research button */}
        <a
          href="#"
          target="_blank"
          className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-200 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
        >
          Read the research
        </a>
      </div>
    </div>
  );
};

export default Footer;
