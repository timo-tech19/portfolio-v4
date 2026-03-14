"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL } from "@/lib/constants";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}#@$%^&*()+=?~";

function useTextScramble(finalText: string, isActive: boolean) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    let iteration = 0;
    const totalIterations = finalText.length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        finalText
          .split("")
          .map((char, index) => {
            if (index < iteration / 3) return char;
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          })
          .join("")
      );

      iteration++;

      if (iteration > totalIterations) {
        clearInterval(interval);
        setDisplayText(finalText);
        setIsComplete(true);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [finalText, isActive]);

  return { displayText, isComplete };
}

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { displayText, isComplete } = useTextScramble(
    PERSONAL.brand,
    isLoading
  );

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => setIsLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  // Prevent scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Pulsing background glow */}
          <div className="absolute h-64 w-64 rounded-full bg-accent/5 blur-3xl animate-pulse" />

          <div className="relative flex flex-col items-center gap-6">
            {/* Brand text with scramble */}
            <motion.h1
              className="font-mono text-4xl font-medium tracking-tight md:text-6xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-accent">{displayText}</span>
            </motion.h1>

            {/* Loading bar */}
            <div className="h-px w-48 overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
