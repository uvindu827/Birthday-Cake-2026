import { useMemo } from "react";

const COLORS = ["#ff6b9d", "#ffd93d", "#6bcbff", "#a685e2", "#7ee787", "#ff9f43"];

export default function Balloons({ count = 10 }) {
  const balloons = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 40 + Math.random() * 30,
        color: COLORS[i % COLORS.length],
        duration: 14 + Math.random() * 10,
        delay: Math.random() * 12,
        sway: 20 + Math.random() * 30,
      })),
    [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size * 1.2,
            background: `radial-gradient(circle at 35% 30%, ${b.color}dd, ${b.color})`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            "--sway": `${b.sway}px`,
          }}
        >
          <div className="balloon-string" style={{ height: b.size * 1.5 }} />
        </div>
      ))}
    </div>
  );
}