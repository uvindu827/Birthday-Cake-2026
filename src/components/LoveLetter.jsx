import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoveLetter({ message }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-6 z-10 flex justify-center" style={{ perspective: 1000 }}>
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="closed"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-56 h-36 rounded-md shadow-xl"
            style={{
              background: "linear-gradient(135deg, #fdf6ec, #f3e6d3)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
            }}
          >
            {/* envelope flap */}
            <div
              className="absolute inset-x-0 top-0 h-1/2"
              style={{
                background: "linear-gradient(135deg, #f3e6d3, #e6d3b8)",
                clipPath: "polygon(0 0, 100% 0, 50% 70%)",
              }}
            />
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <span className="text-rose-700 text-sm" style={{ fontFamily: "'Caveat', cursive" }}>
                tap to open ✉️
              </span>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="open"
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-72 sm:w-80 p-6 rounded-md shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #fffaf2, #fdf1e0)",
              transformOrigin: "top center",
              boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
            }}
          >
            <p
              className="text-rose-800 text-lg leading-relaxed"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              {message}
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 text-xs text-rose-400 underline"
            >
              close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}