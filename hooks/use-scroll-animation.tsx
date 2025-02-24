"use client";

import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const useScrollAnimation = () => {
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

  return { ref, controls };
};

export const ScrollAnimationWrapper = ({ children, variants, className }) => {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
