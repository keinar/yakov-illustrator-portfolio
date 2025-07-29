import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

/**
 * The MainLayout component wraps all pages with a sticky header and a footer.
 * It ensures the content area grows to fill the viewport height, allowing
 * for proper sticky footer behaviour.  It also supports dark mode by
 * applying classes on the `html` element (handled by the header toggle).
 */
export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-background-light text-primary-light dark:bg-background-dark dark:text-primary-dark transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}