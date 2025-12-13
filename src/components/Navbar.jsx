// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      gap: '20px',
      padding: '15px',
      backgroundColor: '#f5f5f5',
      marginBottom: '20px',
      borderRadius: '8px'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
        🏠 Home
      </Link>
      <Link to="/about" style={{ textDecoration: 'none', color: '#333' }}>
        ℹ️ About
      </Link>
    </nav>
  );
}