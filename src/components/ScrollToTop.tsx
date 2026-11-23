'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button once user scrolls down 280px
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="উপরে যান (Scroll to top)"
          className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1F2124]/92 hover:bg-[#18191B] text-[#C5994E] border border-[#C5994E]/40 shadow-lg shadow-black/25 backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-90 hover:border-[#C5994E] hover:shadow-[0_4px_20px_rgba(197,153,78,0.25)] group"
        >
          <ChevronUp className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.5] text-[#C5994E] group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
