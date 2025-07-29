import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navigation links definition.  Each item has a name and a path used by
 * `NavLink` to determine the active class.
 */
const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

/**
 * Header component renders the sticky navigation bar with a responsive menu
 * and a dark mode toggle.  On small screens the navigation links are hidden
 * behind a hamburger button.  Framer Motion is used to animate the mobile
 * menu when it opens and closes.
 */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize dark mode from localStorage or system preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('yakov-theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Apply or remove the dark class on the html element
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('yakov-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-muted-light dark:border-muted-dark backdrop-blur bg-background-light/70 dark:bg-background-dark/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="flex flex-col items-start leading-none select-none">
          <span className="font-serif text-2xl font-semibold">Yakubov</span>
          <span className="text-xs tracking-wide text-muted-light dark:text-muted-dark uppercase">Illustrator</span>
        </NavLink>
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium uppercase tracking-wider hover:text-accent-light dark:hover:text-accent-dark transition-colors ${isActive ? 'text-accent-light dark:text-accent-dark' : ''}`
              }
            >
              {item.name}
            </NavLink>
          ))}
          {/* Dark mode toggle */}
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="p-2 rounded hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors"
          >
            {isDarkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
        </nav>
        {/* Mobile controls */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="p-2 mr-2 rounded hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors"
          >
            {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
          <button
            aria-label="Toggle navigation menu"
            onClick={toggleMobileMenu}
            className="p-2 rounded hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors"
          >
            {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background-light dark:bg-background-dark border-t border-muted-light dark:border-muted-dark shadow-lg"
          >
            <div className="flex flex-col p-4 space-y-4">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block text-base font-medium uppercase tracking-wide py-2 rounded hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors ${isActive ? 'text-accent-light dark:text-accent-dark' : ''}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}