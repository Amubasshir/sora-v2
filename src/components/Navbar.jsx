import React, { useEffect, useState } from 'react';
import { LogIn } from 'lucide-react';

const Navbar = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full transition-all duration-300 max-w-[1400px] mx-auto mt-5">
      <div className="relative mx-auto  flex items-center justify-center">
        {/* LEFT LOGO BLOCK */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-24 group">
          {/* TEXT — only shows at top on hover */}
          <h1
            className={`
              text-lg sm:text-xl md:text-2xl font-medium text-white tracking-widest transition-opacity duration-300
              ${isTop ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}
            `}
          >
            OpenAI
          </h1>

          {/* IMAGE — only shows on scroll on hover */}
          <img
            src="./logo.png"
            alt="OpenAI"
            className={`
              w-10 h-10 absolute top-0 transition-opacity duration-300
              ${isTop ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}
            `}
          />
        </div>

        {/* CENTER NAV */}
        <div className="bgnav backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full flex items-center shadow-2xl border border-white/10 gap-5 sm:gap-10 md:gap-20 lg:gap-28">
          <a className="text-white font-semibold text-lg sm:text-xl md:text-3xl cursor-pointer">
            <svg
              width="109"
              height="41"
              viewBox="0 0 109 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="relative -left-10 -top-[1px] h-10 w-auto"
            >
              <path
                d="M61.1901 19.3781C64.9903 20.0818 67.0453 22.0523 67.0453 25.2051C67.0453 28.8646 64.2303 31.1166 59.1351 31.1166C54.04 31.1166 50.9998 28.4705 50.8027 24.4732H54.5467C54.7719 26.4156 56.3483 27.8512 59.1351 27.8512C61.6123 27.8512 63.245 26.9786 63.245 25.3459C63.245 24.0228 62.2316 23.1502 60.2893 22.7842L56.9394 22.1649C53.3644 21.5175 51.3939 19.8285 51.3939 16.8727C51.3939 13.5229 54.4341 10.8486 58.9662 10.8486C63.7517 10.8486 66.7356 13.5229 66.8764 17.295H63.1606C62.9354 15.3526 61.4716 14.114 58.9944 14.114C56.6861 14.114 55.1941 15.24 55.1941 16.5912C55.1941 17.8298 56.0386 18.421 57.8402 18.7588L61.1901 19.3781ZM76.0532 27.8512C78.0237 27.8512 79.8816 26.2748 79.8816 23.7976C79.8816 21.3204 78.0237 19.744 76.0532 19.744C74.1109 19.744 72.2249 21.3204 72.2249 23.7976C72.2249 26.2748 74.1109 27.8512 76.0532 27.8512ZM76.0532 16.4786C80.2757 16.4786 83.5411 19.8003 83.5411 23.7976C83.5411 27.7949 80.2757 31.1166 76.0532 31.1166C71.8308 31.1166 68.5654 27.7949 68.5654 23.7976C68.5654 19.8003 71.8308 16.4786 76.0532 16.4786ZM89.143 18.8995C89.8749 17.4639 91.5639 16.5912 93.3373 16.5912H94.0692V20.1381H92.9432C90.5223 20.1381 89.1711 21.4893 89.1711 24.1636V30.8351H85.4835V16.7601H89.143V18.8995ZM100.713 24.9236C99.1081 25.0644 98.4043 25.7118 98.4043 26.7534C98.4043 27.7105 99.1362 28.3579 100.516 28.3579C103.021 28.3579 104.288 26.6689 104.288 25.0081V24.614L100.713 24.9236ZM107.863 27.6823C107.863 28.8928 107.919 29.9343 108.06 30.8351H104.654C104.541 30.2721 104.485 29.7091 104.485 29.0898C103.668 30.3566 101.782 31.1166 99.84 31.1166C96.9124 31.1166 94.8011 29.5121 94.8011 27.0912C94.8011 24.2199 96.9124 22.6998 100.684 22.3901L104.288 22.0805V21.996C104.288 20.3352 103.387 19.3781 101.557 19.3781C100.15 19.3781 99.1081 20.11 98.8266 21.0389H95.1108C95.5893 18.3365 98.2354 16.4786 101.585 16.4786C105.667 16.4786 107.863 18.4491 107.863 21.6582V27.6823Z"
                fill="white"
              ></path>
            </svg>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <a className="px-2 sm:px-3 py-1 text-white  cursor-pointer">
              Download
            </a>

            <button className="px-5 py-2 bgbtn text-white rounded-full hover:bg-gray-900 shadow-lg flex items-center">
              {/* <LogIn className="w-3 h-3 sm:w-4 sm:h-4 mr-1 hidden sm:inline" /> */}
              Login
            </button>
          </div>
        </div>

        <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-24"></div>
      </div>
    </nav>
  );
};

export default Navbar;
