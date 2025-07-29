import React from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

/**
 * Footer component displays social links and contact information.  It lives
 * at the bottom of every page and uses semantic HTML for accessibility.
 */
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-muted-light dark:border-muted-dark bg-background-light dark:bg-background-dark text-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-serif text-lg font-semibold">Yakubov</p>
        <div className="flex items-center space-x-5">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-light dark:text-muted-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted-light dark:text-muted-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          {/* Email */}
          <a
            href="mailto:yakubov@example.com"
            aria-label="Email"
            className="text-muted-light dark:text-muted-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
          >
            <FaEnvelope className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}