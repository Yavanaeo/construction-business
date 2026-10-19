"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseScrollRevealOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {},
): [RefObject<T | null>, boolean] {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => setIsVisible(true), delay);
            } else {
              setIsVisible(true);
            }
            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return [ref, isVisible];
}

export function useScrollRevealMultiple<T extends HTMLElement = HTMLDivElement>(
  count: number,
  options: UseScrollRevealOptions = {},
): [Array<RefObject<T | null>>, boolean[]] {
  const refs = useRef<Array<RefObject<T | null>>>([]);
  const [visibilities, setVisibilities] = useState<boolean[]>(Array(count).fill(false));

  while (refs.current.length < count) {
    refs.current.push({ current: null });
  }

  useEffect(() => {
    const elements = refs.current.slice(0, count).map((r) => r.current).filter(Boolean) as T[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.findIndex((r) => r.current === entry.target);
          if (index >= 0 && index < count) {
            if (entry.isIntersecting) {
              const delay = options.delay || 0;
              if (delay > 0) {
                setTimeout(() => {
                  setVisibilities((prev) => {
                    const next = [...prev];
                    next[index] = true;
                    return next;
                  });
                }, delay * index);
              } else {
                setVisibilities((prev) => {
                  const next = [...prev];
                  next[index] = true;
                  return next;
                });
              }
              if (options.triggerOnce !== false) {
                observer.unobserve(entry.target);
              }
            } else if (options.triggerOnce === false) {
              setVisibilities((prev) => {
                const next = [...prev];
                next[index] = false;
                return next;
              });
            }
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || "0px 0px -50px 0px",
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [count, options.threshold, options.rootMargin, options.triggerOnce, options.delay]);

  return [refs.current.slice(0, count), visibilities];
}