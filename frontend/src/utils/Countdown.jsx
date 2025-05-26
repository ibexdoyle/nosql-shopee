import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FlipDigit({ digit }) {
  return (
    <div className="relative w-4 h-8 overflow-hidden rounded bg-black text-white text-xs flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={digit}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full h-full flex items-center justify-center"
        >
          {digit}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function FlipUnit({ value }) {
  const digits = String(value).padStart(2, "0").split("");
  return (
    <div className="flex gap-0.5">
      {digits.map((digit, index) => (
        <FlipDigit key={index + '-' + digit} digit={digit} />
      ))}
    </div>
  );
}


export default function CountdownTimer({ targetTime }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const difference = targetTime - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <div className="flex items-center gap-1">
      <FlipUnit value={timeLeft.hours} />
      <span className="text-black font-bold">:</span>
      <FlipUnit value={timeLeft.minutes} />
      <span className="text-black font-bold">:</span>
      <FlipUnit value={timeLeft.seconds} />
    </div>
  );
}