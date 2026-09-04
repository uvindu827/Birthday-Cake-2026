import { useRef, useState } from "react";

export default function MusicPlayer({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.4;
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        onClick={toggle}
        className="fixed top-4 right-4 z-40 w-11 h-11 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center active:scale-95 transition"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? "🔊" : "🔈"}
      </button>
    </>
  );
}