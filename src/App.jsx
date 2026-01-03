// src/App.jsx

// Lab 05: Asincronismo y Promesas

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactDetailPage from './pages/ContactDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { initializeApp, loadAppDataWithRetry } from './utils/initializer';
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
  const [loadError, setLoadError] = useState(null); // 👈 Estado para errores

  // useEffect se ejecuta una vez al montar el componente
  useEffect(() => {
    // Simula inicialización de 3 segundos
    
    // const timer = setTimeout(() => {
    //   setIsInitializing(false);
    // }, 3000);
    // return () => clearTimeout(timer);
  
      // async function startApp() {
      //   const result = await initializeApp(5000);
      //   setIsInitializing(result);
      // }
      // startApp();

          async function startApp() {
      try {
        // Primero muestra splash por 3 segundos
        await initializeApp(3000);
        
        // Luego intenta cargar datos con auto-retry
        console.log('📥 Iniciando carga de datos con auto-retry...');
        const appData = await loadAppDataWithRetry(3); // 👈 Máximo 3 intentos
        
        console.log('✅ Aplicación inicializada con datos:', appData);
        setIsInitializing(false);
        
      } catch (error) {
        console.error('❌ Error fatal al inicializar:', error);
        setLoadError(error.message);
        setIsInitializing(false); // Termina el splash aunque falle
      }
    }
    startApp();
//...

  
  }, []);

  return (
    <>
      {/* Mostrar splash screen mientras isInitializing es true */}
      {isInitializing && <SplashScreen isLoading={isInitializing} />}

      {/* Mostrar error si falló después de todos los intentos */}
      {loadError && !isInitializing && (
        <div style={{
          padding: '20px',
          maxWidth: '600px',
          margin: '50px auto',
          backgroundColor: '#ffebee',
          borderRadius: '8px',
          border: '2px solid #c62828'
        }}>
          <h2 style={{ color: '#c62828' }}>❌ Error al cargar la aplicación</h2>
          <p>{loadError}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '16px',
              padding: '10px 20px',
              backgroundColor: '#d32f2f',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            🔄 Reintentar
          </button>
        </div>
      )}

      {/* Mostrar contenido principal solo cuando !isInitializing */}

      {!isInitializing && !loadError &&(
        <>
          <Navbar />

          <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                // style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}
              >
            <div style={{ 
              maxWidth: '800px', 
              margin: '0 auto',
              padding: '20px'
            }}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
                  <Route path="/contact/:id" element={<PageWrapper><ContactDetailPage /></PageWrapper>} />
                  <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
                </Routes>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}