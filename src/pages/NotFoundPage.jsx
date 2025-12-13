import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  // Reduce el countdown cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Redirige cuando countdown llegue a 0
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/');
    }
  }, [countdown, navigate]);

  return (
    <div style={{ padding: 12 }}>
      <h2>Página no encontrada</h2>
      <p style={{ marginBottom: 8 }}>
        Redirigiendo en {Math.max(countdown, 0)}...
      </p>
      <p>
        <Link to="/">Ir ahora</Link>
      </p>
    </div>
  );
}