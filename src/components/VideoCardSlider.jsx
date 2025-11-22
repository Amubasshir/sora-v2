import { useRef, useState } from 'react';
import TextType from './TextType';
import { motion } from 'framer-motion';
const videos = [
  {
    src: 'https://cdn.openai.com/nf2/blog-final/remix/6eda9a57-5d6d-4890-90ee-61f89e999719/assets_task_01k6bhy3gme6a993y7zbntnv63_task_01k6bhy3gme6a993y7zbntnv63_genid_d3727d37-6dde-44ae-a562-53fd99832303_25_09_29_20_20_802899_videos_00000_src.mp4',
    title:
      'One wide shot of @daniel and @minnia working together in a drab cubicle office except Daniel only responds with meows|',
    text: 'Take someone else’s creation and put your spin on it.',
  },
  {
    src: 'https://cdn.openai.com/nf2/blog-final/remix/6eda9a57-5d6d-4890-90ee-61f89e999719/assets_task_01k6bmev78e9qvyv37c1tq9qmw_task_01k6bmev78e9qvyv37c1tq9qmw_genid_5eeee087-f753-4772-b596-95f9d28c25bf_25_09_29_21_04_868678_videos_00000_src.mp4',
    title: 'Swap characters',
    text: 'Change people into animals, swap faces, or change styles instantly.',
  },
  {
    src: 'https://cdn.openai.com/nf2/blog-final/remix/6eda9a57-5d6d-4890-90ee-61f89e999719/assets_task_01k6bmftnee6ka1gsgdn0y4ek5_task_01k6bmftnee6ka1gsgdn0y4ek5_genid_6b63342b-8db8-41b0-a4ba-6782a0a9093a_25_09_29_21_04_212903_videos_00000_src.mp4',
    title: 'Change the vibe',
    text: 'Make it serious, funny, futuristic, or cinematic.',
  },
  {
    src: 'https://cdn.openai.com/nf2/blog-final/remix/6eda9a57-5d6d-4890-90ee-61f89e999719/assets_task_01k6bs3t48em48bwr96z3myyz1_task_01k6bs3t48em48bwr96z3myyz1_genid_c3bf4074-2464-4ac0-85c3-f5b85b0023f4_25_09_29_22_29_334380_videos_00000_src.mp4',
    title: 'Extend the story',
    text: 'Add new scenes, continue the story, or create alternate endings.',
  },
];

export default function VideoSlider() {
  const [index, setIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };
  return (
    <section className="relative mx-auto w-full pb-[140px] md:pb-[130px]">
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* LEFT TEXT */}
        <div className="px-3">
          <h2 className="text-balance text-[28px] font-medium leading-[118%] tracking-[-0.015em] lg:text-[40px] mb-5">
            Remix everything
          </h2>
          <p className="text-balance text-[16px] font-medium leading-[140%] tracking-[-0.01em] lg:text-[20px] lg:leading-[130%]">
            Take someone else’s creation and put your <br /> spin on it. Swap
            characters, change the <br /> vibe, add new scenes, or extend the
            story.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center flex-col items-center gap-5 px-4">
          {/* Typing text overlay */}

          <div className="absolute left-4 bottom-20 inline-block z-20 bottom-1">
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-gray-900 px-4 py-2 rounded-full flex gap-3 max-w-100 w-full"
            >
              <TextType
                key={index}
                text={[videos[index].title]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />

              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer bottom-0 ">
                <svg
                  className="w-5 h-5 text-black"
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
              </div>
            </motion.div>
          </div>

          {/* VIDEO */}
          <div
            className="relative rounded-3xl overflow-hidden bg-gray-900 border border-gray-700"
            style={{ width: 320, height: 640 }}
          >
            <video
              key={index}
              src={videos[index].src}
              autoPlay
              muted={isMuted}
              ref={videoRef}
              loop
              className="w-full h-full object-cover"
            />

            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-2 rounded-full text-white text-sm border border-white/30"
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          </div>

          {/* DOTS */}
          <div className="flex gap-2 mt-2">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-4 h-4 rounded-full transition-all ${
                  index === i ? 'bg-white scale-110' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
