// import React from 'react';
// import { Download, LogIn } from 'lucide-react';

// const Navbar = () => (
//   <nav className="fixed top-0 z-50 w-full p-3 md:p-4 transition-all duration-300  max-w-[1400px]  mx-auto">
//     <div className="relative mx-auto px-3 sm:px-4 md:px-8 flex items-center justify-center">
//       {/* Left Logo (fixed width for balance) */}
//       <div className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-24">
//         <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-widest cursor-pointer opacity-0 hover:opacity-100 animate-slideFade">
//           OpenAI
//         </h1>
//       </div>

//       {/* CENTER NAV — stays centered */}
//       <div className="bgnav backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full flex items-center shadow-2xl border border-white/10 gap-6 sm:gap-10 md:gap-20">
//         <a className="text-white font-semibold text-lg sm:text-xl md:text-2xl cursor-pointer">
//           Sora
//         </a>

//         <div className="flex items-center gap-2 sm:gap-3">
//           <a className="px-2 sm:px-3 py-1 text-gray-400 hover:text-white text-xs sm:text-sm md:text-base">
//             Download
//           </a>

//           <button className="px-3 sm:px-4 md:px-5 py-1.5 bgbtn text-white font-semibold rounded-full hover:bg-gray-900 text-xs sm:text-sm md:text-base shadow-lg flex items-center">
//             <LogIn className="w-3 h-3 sm:w-4 sm:h-4 mr-1 hidden sm:inline" />
//             Login
//           </button>
//         </div>
//       </div>

//       {/* Right balance space (same width as left) */}
//       <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-24" />
//     </div>
//   </nav>
// );

// export default Navbar;
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
    <nav className="fixed top-0 z-50 w-full p-3 md:p-4 transition-all duration-300 max-w-[1300px] mx-auto">
      <div className="relative mx-auto  flex items-center justify-center">
        {/* LEFT LOGO BLOCK */}
        <div className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-24 group">
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
        <div className="bgnav backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full flex items-center shadow-2xl border border-white/10 gap-6 sm:gap-10 md:gap-20">
          <a className="text-white font-semibold text-lg sm:text-xl md:text-2xl cursor-pointer">
            Sora
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <a className="px-2 sm:px-3 py-1 text-gray-400 hover:text-white text-xs sm:text-sm md:text-base cursor-pointer">
              Download
            </a>

            <button className="px-3 sm:px-4 md:px-5 py-1.5 bgbtn text-white font-semibold rounded-full hover:bg-gray-900 text-xs sm:text-sm md:text-base shadow-lg flex items-center">
              <LogIn className="w-3 h-3 sm:w-4 sm:h-4 mr-1 hidden sm:inline" />
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
