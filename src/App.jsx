'use client';

import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/banner';
import SoraShowcase from './components/SoraShowcase';
import FutureCastComponent from './components/FutureCastComponent';
import VideoCardSlider from './components/VideoCardSlider';
import CueTheSound from './components/CueTheSound';
import Footer from './components/Footer';
// import CloudClickArea from './components/cloud/CloudClickArea';
// import CloudArea from './components/cloud/CloudContext';

// ---------------------------------------------------
// STAR FIELD BACKGROUND
// ---------------------------------------------------
const StarField = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const starsRef = useRef([]);
  const tempStarsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const realMousePosRef = useRef({ x: -1000, y: -1000 });
  const velocityRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const starCount = 450;
    const baseSpeed = 0.0005;
    const tempStarLifespan = 90;

    const initStars = (w, h) => {
      const stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 2 + 0.5,
          size: Math.random() * 1 + 0.5,
          baseOpacity: Math.random() * 0.5 + 0.1,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleDir: 1,
          triggered: false,
        });
      }
      starsRef.current = stars;
    };

    const resize = () => {
      const { clientWidth, clientHeight } = containerRef.current;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
      initStars(clientWidth, clientHeight);
      tempStarsRef.current = [];
    };
    resize();
    window.addEventListener('resize', resize);

    const mouseMove = e => {
      const rect = canvas.getBoundingClientRect();
      realMousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      const x = (e.clientX - rect.left - canvas.width / 2) / (canvas.width / 2);
      const y =
        (e.clientY - rect.top - canvas.height / 2) / (canvas.height / 2);

      mouseRef.current = { x, y };
    };
    window.addEventListener('mousemove', mouseMove);

    const drawStarShape = (cx, cy, spikes, outer, inner) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outer);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outer;
        y = cy + Math.sin(rot) * outer;
        ctx.lineTo(x, y);
        rot += step;
        x = cx + Math.cos(rot) * inner;
        y = cy + Math.sin(rot) * inner;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.closePath();
      ctx.fill();
    };

    const spawnBurst = (x, y) => {
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.6 + 0.1;
        tempStarsRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          lifespan: tempStarLifespan,
          size: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'white';

      velocityRef.current.x +=
        (mouseRef.current.x - velocityRef.current.x) * 0.005;
      velocityRef.current.y +=
        (mouseRef.current.y - velocityRef.current.y) * 0.005;

      starsRef.current.forEach(star => {
        const dx = star.x - realMousePosRef.current.x;
        const dy = star.y - realMousePosRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const hovered = dist < 60;

        if (!hovered) {
          star.x += baseSpeed * -1 + velocityRef.current.x * star.z * -0.05;
          star.y += velocityRef.current.y * star.z * -0.05;
        }

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        star.opacity += star.twinkleSpeed * star.twinkleDir;
        if (
          star.opacity > star.baseOpacity + 0.3 ||
          star.opacity < star.baseOpacity - 0.1
        )
          star.twinkleDir *= -1;

        if (hovered) {
          const glow = 1 - dist / 60;
          const size = star.size + glow * 3;
          ctx.globalAlpha = 1;
          drawStarShape(star.x, star.y, 5, size, size / 2);
          if (!star.triggered) {
            spawnBurst(star.x, star.y);
            star.triggered = true;
          }
        } else {
          ctx.globalAlpha = star.opacity;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
          star.triggered = false;
        }
      });

      tempStarsRef.current = tempStarsRef.current.filter(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.lifespan--;
        if (s.lifespan <= 0) return false;
        ctx.globalAlpha = s.lifespan / tempStarLifespan;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', mouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 bg-black">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none" />
    </div>
  );
};

// ---------------------------------------------------
// LIGHT BEAM
// ---------------------------------------------------
const LightBeam = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute top-0 h-[200px] w-[500%] md:w-[200%] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
      style={{
        animation: 'beam 40s linear infinite',
        filter: 'blur(100px)',
      }}
    ></div>

    <style jsx global>{`
      @keyframes beam {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
    `}</style>
  </div>
);

// ---------------------------------------------------
// APP COMPONENT WITH GLASSY LIGHTS (INCLUDING BLUE)
// ---------------------------------------------------
export default function App() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Starfield background */}
      <StarField />

      {/* Light beam */}
      <LightBeam />

      {/* Glassy floating lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-white/20 rounded-full blur-[120px] top-[-100px] left-[-150px] animate-pulse-slow" />
        <div className="absolute w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-[100px] bottom-[-100px] right-[-100px] animate-pulse-slower" />
        <div className="absolute w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[150px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] animate-pulse-slow" />

        {/* NEW BLUE GLASSY LIGHT */}
        <div className="absolute w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-[140px] top-[20%] left-[60%] animate-pulse-slower" />

        <style jsx>{`
          @keyframes pulse-slow {
            0%,
            100% {
              transform: scale(1) translate(0, 0);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.1) translate(10px, -10px);
              opacity: 0.4;
            }
          }
          @keyframes pulse-slower {
            0%,
            100% {
              transform: scale(1) translate(0, 0);
              opacity: 0.5;
            }
            50% {
              transform: scale(1.05) translate(-10px, 10px);
              opacity: 0.3;
            }
          }
          .animate-pulse-slow {
            animation: pulse-slow 12s ease-in-out infinite;
          }
          .animate-pulse-slower {
            animation: pulse-slower 18s ease-in-out infinite;
          }
        `}</style>
      </div>
      {/* Main content */}

      {/* <CloudArea>
        <CloudClickArea> */}
      <div className="max-w-[1300px] mx-auto overflow-hidden ">
        <Navbar />
        <Banner />
        <SoraShowcase />
        <FutureCastComponent />
        <VideoCardSlider />
        <CueTheSound />
        <Footer />
      </div>
      {/* </CloudClickArea>
      </CloudArea> */}
    </div>
  );
}
