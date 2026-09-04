import { useEffect, useRef, useState } from "react";

export function useBlowDetector(onBlow, enabled, threshold = 45, sustainFrames = 4) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(null);
  const frameCount = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    if (!enabled) return; // <-- gate INSIDE the effect, not outside the hook

    let audioCtx, analyser, source, stream;

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 512;
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        const data = new Uint8Array(analyser.frequencyBinCount);
        setListening(true);

        const tick = () => {
          analyser.getByteFrequencyData(data);
          const avg = data.reduce((a, b) => a + b, 0) / data.length;

          if (avg > threshold) {
            frameCount.current += 1;
            if (frameCount.current >= sustainFrames) {
              onBlow();
              frameCount.current = 0;
            }
          } else {
            frameCount.current = 0;
          }
          rafId.current = requestAnimationFrame(tick);
        };
        tick();
      } catch (err) {
        setError(err.message);
      }
    }

    start();

    return () => {
      cancelAnimationFrame(rafId.current);
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (audioCtx) audioCtx.close();
      setListening(false);
    };
  }, [enabled, onBlow, threshold, sustainFrames]);

  return { listening, error };
}