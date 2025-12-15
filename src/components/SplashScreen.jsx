// Componente que muestra pantalla de carga
const SplashScreen = ({ isLoading, error }) => {
  // Si no está cargando, no renderizar nada
  if (!isLoading) return null;

  return (
    <>
      {error ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#ff6b6b' }}>❌ {error}</p>
          <p style={{ color: '#ccc' }}>Verifica tu conexión e intenta nuevamente</p>
        </div>
      ) : (
        <div>
          <h2>
            📇 Iniciando Contact Manager...
          </h2>
        </div>
      )
      }
    </>
  );
};

export default SplashScreen;