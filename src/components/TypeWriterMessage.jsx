import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TypewriterMessage({ text, speed = 45, startDelay = 500 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, started, text, speed]);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mt-6 max-w-md text-lg md:text-xl text-rose-800 z-10 min-h-[3.5rem]"
      style={{ fontFamily: "'Caveat', 'Segoe Script', cursive" }}
    >
      {displayed}
      <span className="inline-block w-[2px] h-5 bg-rose-600 ml-1 animate-pulse align-middle" />
    </motion.p>
  );
}