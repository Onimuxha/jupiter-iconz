import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import FuzzyText from "@/components/ui/FuzzyText";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="relative flex items-center justify-center px-3 min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Animated gradient circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-600/30 blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl animate-pulse" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full p-8 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl text-center border border-white/20"
      >
        <motion.img
          src="/404 Error.png"
          alt="404 Illustration"
          className="w-56 h-56 mx-auto mb-6 drop-shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />

        <motion.h1
          className="text-6xl font-extrabold text-white mb-4 relative"
          animate={{ opacity: [1, 0.9, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FuzzyText baseIntensity={0.2}>404</FuzzyText>
        </motion.h1>

        <p className="text-lg text-gray-300 mb-6">
          Lost in space? The page you’re looking for drifted away.
        </p>

        <motion.a
          href="/"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(59,130,246,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium tracking-wide transition-all hover:bg-blue-500"
        >
          Return Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;
