import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import LoadingPage from './components/LoadingPage.jsx';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home.jsx'));
const Portfolio = lazy(() => import('./pages/Portfolio.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));

/**
 * The App component defines the top-level routing structure.  Each page is
 * dynamically imported to enable code splitting.  The `MainLayout`
 * component wraps all pages with the persistent header and footer.
 */
export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Suspense fallback={<LoadingPage />}> 
              <Home />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="portfolio"
        element={
          <MainLayout>
            <Suspense fallback={<LoadingPage />}>
              <Portfolio />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="about"
        element={
          <MainLayout>
            <Suspense fallback={<LoadingPage />}>
              <About />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="contact"
        element={
          <MainLayout>
            <Suspense fallback={<LoadingPage />}>
              <Contact />
            </Suspense>
          </MainLayout>
        }
      />
    </Routes>
  );
}