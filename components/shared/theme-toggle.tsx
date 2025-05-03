'use client';

import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

export default function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleThemeChange = async () => {
    const btnRect = buttonRef.current?.getBoundingClientRect();

    if (!document.startViewTransition || !btnRect) {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      return;
    }

    const radius = Math.sqrt(
      Math.max(
        btnRect.x + btnRect.width / 2,
        window.innerWidth - (btnRect.x + btnRect.width / 2),
      ) **
        2 +
        Math.max(
          btnRect.y + btnRect.height / 2,
          window.innerHeight - (btnRect.y + btnRect.height / 2),
        ) **
          2,
    );

    await flushSync(() => {
      document
        .startViewTransition(() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        })
        .ready.then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${btnRect.x + btnRect.width / 2}px ${btnRect.y + btnRect.height / 2}px)`,
                `circle(${radius}px at ${btnRect.x + btnRect.width / 2}px ${btnRect.y + btnRect.height / 2}px)`,
              ],
            },
            {
              duration: 300,
              easing: 'ease-in',
              pseudoElement: '::view-transition-new(root)',
            },
          );
        });
    });
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleThemeChange}
      initial={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 100 }}
      style={{ cursor: 'pointer' }}
      className="relative flex items-center justify-center rounded-full p-2"
    >
      <AnimatePresence initial={false}>
        {theme === 'dark' ? (
          <motion.div
            className="absolute"
            initial={{ scale: 0, rotate: 360, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: -360, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
            key={theme}
          >
            <Moon strokeWidth={3} />
          </motion.div>
        ) : (
          <motion.div
            className="absolute"
            initial={{ scale: 0, rotate: -360, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 360, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
            key={theme}
          >
            <Sun strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
