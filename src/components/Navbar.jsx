// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    // <nav style={{
    //   display: 'flex',
    //   gap: '20px',
    //   padding: '15px',
    //   backgroundColor: '#f5f5f5',
    //   marginBottom: '20px',
    //   borderRadius: '8px'
    // }}>

    <nav style={{
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
      backgroundColor: '#1976d2',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      zIndex: 1000,
      marginBottom: 0
    }}>

      {/* Logo/Título */}
      <div style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white'
      }}>
        📇 Contact Manager
      </div>

     {/* Links de navegación */}
     <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center'
        }}>
  

        {/* <Link to="/" style={{ 
          textDecoration: 'none',
          color: '#333' }}
        > */}

        <Link to="/" style={{ 
            textDecoration: 'none', 
            color: 'white',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          📡 Cargar Contactos
        </Link>
        {/* <Link to="/about" style={{ 
          textDecoration: 'none',
          color: '#333' }}
        > */}

        <Link to="/about" style={{ 
            textDecoration: 'none', 
            color: 'white',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          ℹ️ About
        </Link>
      </div>
    </nav>
  );
}