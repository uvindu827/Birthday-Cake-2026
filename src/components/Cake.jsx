// Points sampled along the dome's bezier curve (t = 0 to 1 across the arc)
// so each candle sits exactly on the curved icing surface, not a flat line.
const DOME_T_VALUES = [0.15, 0.325, 0.5, 0.675, 0.85];

function domePoint(t) {
  // matches the path: M140,135 C140,100 260,100 260,135
  const x = 140 + 120 * (t * t * (3 - 2 * t));
  const y = 135 - 105 * t * (1 - t);
  return { x, y };
}

export default function Cake({ candles, litCandles }) {
  const candlePositions = candles.map((_, i) => domePoint(DOME_T_VALUES[i % DOME_T_VALUES.length]));

  return (
    <div className="relative w-72 sm:w-96 md:w-[420px] mx-auto select-none">
      <svg viewBox="0 0 400 320" style={{ overflow: "visible", width: "100%" }} className="drop-shadow-2xl">
        <defs>
          <radialGradient id="plateShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <linearGradient id="topTier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff6fa" />
            <stop offset="60%" stopColor="#ffdcec" />
            <stop offset="100%" stopColor="#ffc4de" />
          </linearGradient>
          <linearGradient id="midTier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffc0dc" />
            <stop offset="55%" stopColor="#ff96c2" />
            <stop offset="100%" stopColor="#f472ac" />
          </linearGradient>
          <linearGradient id="botTier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff8fbe" />
            <stop offset="55%" stopColor="#f2589e" />
            <stop offset="100%" stopColor="#dd3f88" />
          </linearGradient>
          <linearGradient id="drip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffeef6" />
          </linearGradient>
          <linearGradient id="plateGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#dcdce2" />
          </linearGradient>
        </defs>

        {/* ambient shadow + plate */}
        <ellipse cx="200" cy="300" rx="170" ry="12" fill="url(#plateShadow)" />
        <ellipse cx="200" cy="288" rx="175" ry="11" fill="url(#plateGrad)" />
        <ellipse cx="200" cy="284" rx="175" ry="11" fill="#ffffff" opacity="0.6" />

        {/* BOTTOM TIER */}
        <rect x="60" y="195" width="280" height="85" rx="14" fill="url(#botTier)" />
        <rect x="60" y="195" width="280" height="10" rx="5" fill="#ffffff" opacity="0.3" />
        {Array.from({ length: 13 }).map((_, i) => (
          <circle key={i} cx={78 + i * 20.5} cy={272} r="7" fill="url(#drip)" />
        ))}
        <Sprinkles seedOffset={0} x={70} y={210} w={260} h={50} count={16} />

        {/* MIDDLE TIER */}
        <rect x="95" y="130" width="210" height="70" rx="10" fill="url(#midTier)" />
        <rect x="95" y="130" width="210" height="8" rx="4" fill="#ffffff" opacity="0.3" />
        <Sprinkles seedOffset={7} x={105} y={140} w={190} h={40} count={12} />

        {/* TOP TIER dome */}
        <path
          d="M140,135 C140,100 260,100 260,135 L260,135 L140,135 Z"
          fill="url(#topTier)"
        />
        <path
          d="M140,135 C140,100 260,100 260,135"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="5"
        />
        <Sprinkles seedOffset={13} x={150} y={112} w={100} h={18} count={7} />

        {/* drip icing hanging over middle tier */}
        <path
          d="M140,135
             C148,135 150,152 158,150
             C166,148 168,137 176,137
             C184,137 186,156 195,155
             C204,154 202,138 211,137
             C220,136 222,153 231,151
             C238,150 240,137 248,136
             C254,135 258,135 260,135
             Z"
          fill="url(#drip)"
        />

        {/* candles — bottoms locked exactly onto the dome curve */}
        {candlePositions.map((pos, i) => {
          const stickHeight = 32;
          const topY = pos.y - stickHeight;
          return (
            <g key={candles[i].id}>
              <rect
                x={pos.x - 3}
                y={topY}
                width="6"
                height={stickHeight}
                rx="2"
                fill={i % 2 === 0 ? "#ff8fab" : "#ffe3ec"}
              />
              <rect x={pos.x - 3} y={topY + 6} width="6" height="4" fill="#ffffff" opacity="0.8" />
              <rect x={pos.x - 3} y={topY + 16} width="6" height="4" fill="#ffffff" opacity="0.8" />
              <rect x={pos.x - 3} y={topY + 26} width="6" height="4" fill="#ffffff" opacity="0.8" />

              {litCandles.includes(candles[i].id) && (
                <g className="svg-flame" style={{ transformOrigin: `${pos.x}px ${topY - 4}px` }}>
                  <circle cx={pos.x} cy={topY - 8} r="10" fill="#ffb300" opacity="0.35" />
                  <ellipse cx={pos.x} cy={topY - 6} rx="4.5" ry="8" fill="#ff9800" />
                  <ellipse cx={pos.x} cy={topY - 4} rx="2.5" ry="5" fill="#ffd54f" />
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Sprinkles({ x, y, w, h, count, seedOffset = 0 }) {
  const colors = ["#ff6b9d", "#ffd93d", "#6bcbff", "#a685e2", "#ffffff"];
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const seed = (i + seedOffset) * 12.9898;
        const rand = (n) => {
          const v = Math.sin(n) * 43758.5453;
          return v - Math.floor(v);
        };
        const px = x + rand(seed) * w;
        const py = y + rand(seed + 1) * h;
        const rot = rand(seed + 2) * 360;
        const color = colors[i % colors.length];
        return (
          <rect
            key={i}
            x={px}
            y={py}
            width="3"
            height="8"
            rx="1.5"
            fill={color}
            transform={`rotate(${rot} ${px} ${py})`}
            opacity="0.9"
          />
        );
      })}
    </>
  );
}