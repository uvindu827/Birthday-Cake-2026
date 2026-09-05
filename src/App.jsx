import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Cake from "./components/Cake";
import Balloons from "./components/Balloons";
import StarryBackground from "./components/StarryBackground";
import LoveLetter from "./components/LoveLetter";
import MusicPlayer from "./components/MusicPlayer";
import MakeAWish from "./components/MakeAWish";
import { useBlowDetector } from "./hooks/useBlowDetector";
import "./App.css";

const CANDLES = [1, 2, 3, 4, 5].map((id) => ({ id }));

function App() {
  const [litCandles, setLitCandles] = useState(CANDLES.map((c) => c.id));
  const [micStarted, setMicStarted] = useState(false);
  const [allBlown, setAllBlown] = useState(false);

  const handleBlow = useCallback(() => {
    setLitCandles((prev) => {
      if (prev.length === 0) return prev;
      const next = prev.slice(0, -1);
      if (next.length === 0) {
        setAllBlown(true);
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      }
      return next;
    });
  }, []);

  const { listening, error } = useBlowDetector(handleBlow, micStarted);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0b0f2b] via-[#1a1b4b] to-[#2d1b4e] px-4 py-10 text-center overflow-hidden">
      <StarryBackground count={80} />
      <Balloons count={10} />
      <MusicPlayer src="/our-song.mp3" />

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-rose-300 mb-4 z-10"
      >
       🌼Happy Birthday Chutyy❤️
      </motion.h1>

      <div className="mt-4 z-10">
        <Cake candles={CANDLES} litCandles={litCandles} />
      </div>

      <div className="mt-10 z-20">
        {!micStarted && (
          <button
            onClick={() => setMicStarted(true)}
            className="px-6 py-3 bg-rose-500 text-white rounded-full shadow-lg active:scale-95 transition"
          >
            😍Blow the Candles😍
          </button>
        )}
        {micStarted && !allBlown && (
          <p className="text-rose-200">
            {listening ? "Blow into the mic... 🎈" : "Starting mic..."}
          </p>
        )}
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        {allBlown && (
          <>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-2xl text-rose-200 font-semibold mt-4"
            >
              🎉 May your wish be granted! Happy Birthday, love! 🎉
            </motion.p>

            <LoveLetter message="Happy Birthday my love! Every year with you feels like a gift I don't deserve but I'm so grateful for anyway. Here's to many more, and to every candle we get to blow out together. ❤️" />

            <MakeAWish />
          </>
        )}
      </div>
    </div>
  );
}

export default App;