import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactDetailPage from './pages/ContactDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
// Lab 05: Asincronismo y Promesas
import { useState, useEffect } from 'react';
import { initializeApp } from './utils/initializer';
import SplashScreen from './components/SplashScreen';
import React from 'react';
// ...

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      style={{ minHeight: '60vh' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {

  const location = useLocation();

   // 1.4 Renderizado condicional del SplashScreen
   // Estado para controlar splash screen
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Simula inicialización de 3 segundos
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Mostrar splash screen mientras isInitializing es true */}
      {isInitializing && <SplashScreen isLoading={isInitializing} />}

      {/* Mostrar contenido principal solo cuando !isInitializing */}
      {!isInitializing && (
        <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}
            >
            {/* <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}> */}
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
                <Route path="/contact/:id" element={<PageWrapper><ContactDetailPage /></PageWrapper>} />
                <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
            {/* </div> */}
        </motion.div>
      )}
    </>
  );
}