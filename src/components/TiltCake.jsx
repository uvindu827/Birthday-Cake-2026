import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCake({ children }) {
  const [permissionNeeded, setPermissionNeeded] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 80, damping: 15 });
  const y = useSpring(rawY, { stiffness: 80, damping: 15 });

  const rotateX = useTransform(y, [-30, 30], [12, -12]);
  const rotateY = useTransform(x, [-30, 30], [-12, 12]);

  useEffect(() => {
    const needsPermission =
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function";
    if (needsPermission) setPermissionNeeded(true);

    function handleOrientation(e) {
      if (e.beta == null || e.gamma == null) return;
      rawX.set(Math.max(-30, Math.min(30, e.gamma)));
      rawY.set(Math.max(-30, Math.min(30, e.beta - 45)));
    }

    function handleMouseMove(e) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      rawX.set(((e.clientX - cx) / cx) * 20);
      rawY.set(((e.clientY - cy) / cy) * 20);
    }

    if (!needsPermission) {
      window.addEventListener("deviceorientation", handleOrientation);
    }
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [rawX, rawY]);

  const requestTilt = () => {
    DeviceOrientationEvent.requestPermission()
      .then((res) => {
        if (res === "granted") {
          window.addEventListener("deviceorientation", (e) => {
            if (e.beta == null || e.gamma == null) return;
            rawX.set(Math.max(-30, Math.min(30, e.gamma)));
            rawY.set(Math.max(-30, Math.min(30, e.beta - 45)));
          });
          setPermissionNeeded(false);
        }
      })
      .catch(() => {});
  };

  return (
    <div style={{ perspective: 800 }}>
      {permissionNeeded && (
        <button
          onClick={requestTilt}
          className="mb-3 text-xs px-3 py-1 rounded-full bg-white/20 text-white/90 backdrop-blur"
        >
          ✨ enable tilt effect
        </button>
      )}
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}