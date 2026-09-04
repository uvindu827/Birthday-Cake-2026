import { useMemo } from "react";

export default function StarryBackground({ count = 80 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 5,
      })),
    [count]
  );

  // a few bigger "shooting" accent stars
  const bigStars = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        top: Math.random() * 60,
        left: Math.random() * 100,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {bigStars.map((s) => (
        <div
          key={`big-${s.id}`}
          className="star star-big"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}