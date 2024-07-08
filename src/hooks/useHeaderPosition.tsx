"use client";

import { useEffect, useRef, useState } from "react";

const useHeaderPosition = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState<any>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.07; // 7% of the viewport height

      if (scrollY > threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return {
    targetRef,
    headerRef,
    searchRef,
    triggerRef,
    isSticky,
    isMenuOpen,
    setIsMenuOpen,
    setScrollProgress,
    scrollProgress,
  };
};

export default useHeaderPosition;
