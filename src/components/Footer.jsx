import React from 'react';
import { FaGooglePlay } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa6';

import PuffyCloud from './PuffyCloud';

const Footer = () => {
  return (
    // Outer container: Full screen, dark background, centered content
    <div className="py-15 text-white flex items-center justify-center p-4 overflow-hidden relative ">
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
          Download the new Sora app
        </h1>

        {/* 4. Download Buttons */}
        <div
          className="flex items-center justify-center 
               space-x-3 mb-12 w-full flex-nowrap "
        >
          {/* App Store Button */}
          <a
            href="#"
            target="_blank"
            className="flex items-center justify-center px-1 py-1 
                    bg-black border border-white rounded-lg 
                    transition duration-200 hover:bg-gray-900
                    w-auto text-white
                    min-w-[140px] sm:min-w-[160px]" // slightly smaller for no-wrap
          >
            <div className="mr-2">
              <FaApple size={26} />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="font-extralight text-[9px] sm:text-xs ">
                Download on the
              </span>
              <span className="font-semibold text-sm sm:text-lg -mt-1">
                App Store
              </span>
            </div>
          </a>

          {/* Google Play Button */}
          <a
            href="#"
            target="_blank"
            className="flex items-center justify-center px-2 py-1
                    bg-black border border-white rounded-lg
                    transition duration-200 hover:bg-gray-900
                    w-auto text-white
                    min-w=[140px] sm:min-w-[160px] text-start"
          >
            <div className="mr-2">
              {/* <FaApple size={24} /> */}
              <img src="../../public/google-play.png" alt="" className="w-7" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="font-extralight text-[9px] sm:text-xs">
                GET IT ON
              </span>
              <span className="font-semibold text-sm sm:text-lg -mt-1">
                Google Play
              </span>
            </div>
          </a>
        </div>

        {/* Read Research */}
        <a
          href="#"
          target="_blank"
          className="inline-block px-5 py-3 bg-white text-black font-normal rounded-full shadow-lg hover:bg-gray-200 transition duration-200 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 leading-tight -mt-4"
        >
          Read the research
        </a>
      </div>
    </div>
  );
};

export default Footer;
