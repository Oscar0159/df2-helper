'use client';

import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled className="rounded-full" />;
  }

  const toggleTheme = async () => {
    const rect = buttonRef.current?.getBoundingClientRect();

    const isDark = resolvedTheme === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    if (!document.startViewTransition || !rect) {
      setTheme(nextTheme);
      return;
    }

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
      },
      {
        duration: 300,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={toggleTheme}
      initial={{ opacity: 0.9 }}
      whileHover={{ opacity: 1 }}
      whileTap={{ opacity: 0.9 }}
      transition={{ type: 'tween', stiffness: 100 }}
      style={{ cursor: 'pointer' }}
      className="relative flex items-center justify-center rounded-full p-2"
    >
      <AnimatePresence initial={false}>
        {resolvedTheme === 'dark' ? (
          <motion.div
            className="absolute"
            initial={{ scale: 0, rotate: 360, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: -360, opacity: 0 }}
            transition={{ type: 'tween', stiffness: 100, duration: 0.3 }}
            key={resolvedTheme}
          >
            <Moon />
          </motion.div>
        ) : (
          <motion.div
            className="absolute"
            initial={{ scale: 0, rotate: -360, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 360, opacity: 0 }}
            transition={{ type: 'tween', stiffness: 100, duration: 0.3 }}
            key={resolvedTheme}
          >
            <Sun />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
