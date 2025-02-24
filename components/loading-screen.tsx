"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { TextScramble } from "@/components/ui/text-scramble";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => {
            document.body.style.overflow = "auto";
          }}
        >
          <TextScramble className="font-mono text-5xl font-bold">
            timotech.
          </TextScramble>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
