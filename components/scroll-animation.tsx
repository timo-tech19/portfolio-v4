"use client";

import type React from "react";

import { motion, useAnimation, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
  variants?: Variants;
}

export default function ScrollAnimation({
  children,
  variants,
}: ScrollAnimationProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={
        variants || {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }
      }
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
