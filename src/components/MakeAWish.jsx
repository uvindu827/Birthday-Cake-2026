import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MakeAWish() {
  const [wish, setWish] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wish.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setWish("");
    }, 2500);
  };

  return (
    <div className="mt-6 z-20 w-full max-w-xs mx-auto flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-2 w-full"
          >
            <input
              type="text"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Make a wish..."
              className="w-full px-4 py-2 rounded-full border border-rose-300 bg-white/80 backdrop-blur text-rose-800 placeholder-rose-300 outline-none focus:ring-2 focus:ring-rose-400 text-center"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-rose-500 text-white rounded-full shadow active:scale-95 transition"
            >
              Send it into the sky ✨
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="sent"
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -80, scale: 0.7 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="text-rose-700 font-medium text-lg text-center"
          >
            "{wish}" 🎈
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}