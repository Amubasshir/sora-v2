import './FutureCastComponent.css';
import MentionSuggestions from './MentionSuggestions';

// import TextType from './TextType';

const FutureCastComponent = () => {
  // Use a simulated video/image URL for the main backdrop and avatars
  const videoUrl =
    'https://cdn.openai.com/nf2/nf2-blog/nf2-blog-cameos/5eb66c14-86d6-45f5-8ea6-610939ba491b/cameo1-2.mp4';
  const minniaAvatarUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh83d7IjmJI8dKkodM9AcMGisRjhNldad3WQ&s';
  const thomasAvatarUrl =
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  // The text array to be animated, simulating the typing effect

  return (
    // 🌌 Outer container: Black background with subtle texture
    <div className="min-h-screen  text-white flex items-center justify-center p-8 overflow-hidden relative">
      {/* 🌟 Background texture/gradient (for a subtle, dark atmosphere) */}
      <div
        className="absolute inset-0 bg-repeat opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#ffffff0a 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>

      {/* 💻 Main Layout Container */}
      <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-16 lg:gap-60 items-center">
        {/* 🎥 Left Section: Video and Avatars */}
        <div className="flex justify-center md:justify-end">
          <div className="relative  max-w-[lg]">
            {/* 📹 Main Video Frame */}
            <div className="rounded-2xl overflow-hidden ">
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                poster="path/to/fallback-image.jpg"
                className="w-full h-auto object-cover md:h-[600px] aspect-[9/16] md:aspect-auto bg-gray-900"
                style={{ objectPosition: 'center 40%' }}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* 👤 Avatar Overlays (Top-Left) */}
            <div className="absolute -top-5 left-8 flex flex-col space-y-2">
              <img
                src={minniaAvatarUrl}
                alt="Minnia's avatar"
                className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-lg"
              />
            </div>
            <div className="absolute top-8 -left-7 flex flex-col space-y-2">
              <img
                src={thomasAvatarUrl}
                alt="Thomas's avatar"
                className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md translate-x-2"
              />
            </div>
          </div>
        </div>

        {/* 💬 Bottom Caption/Prompt Bubble with Typing Animation */}

        <div
          className="absolute bottom-61 md:-bottom-4 md:left-10/30 lg:left-1/12 md:-translate-x-1/2 p-3 px-6  rounded-full 
                         text-sm text-white font-medium flex items-center space-x-3 max-w-[90%] md:max-w-none md:-ml-12 lg:ml-86 "
        >
          {/* <div className="flex items-center">
            <TextType
              text={['@minnia and @thomas in a retro futuristic world|']}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>

          {/* Up Arrow Icon */}
          {/* <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer">
            <svg
              className="w-3 h-3 text-black"
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
          </div> */}

          <MentionSuggestions></MentionSuggestions>
        </div>

        {/* 📝 Right Section: Text Content */}
        <div className="relative md:col-start-2 flex justify-start">
          <div className="max-w-md space-y-6">
            <h1 className="text-balance text-[28px] font-medium leading-[118%] tracking-[-0.015em] lg:text-[40px]">
              Cast yourself and your friends
            </h1>
            <p className="text-balance text-[16px] font-medium leading-[140%] tracking-[-0.01em] lg:text-[20px] lg:leading-[130%]">
              Create together. With cameos, you and your friends can be
              characters in your videos. You control how or when your cameo is
              used
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureCastComponent;
