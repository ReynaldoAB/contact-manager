import { useState } from 'react';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchCount, setFetchCount] = useState(0); // 👈 NUEVO: contador

  async function fetchContactsDirectly() {
    setIsLoading(true);
    setError(null);
    setFetchCount(prev => prev + 1); // 👈 NUEVO: incrementa contador
    
    try {
      const response = await fetch(import.meta.env.VITE_API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      const data = await response.json();
      setContacts(data);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>ContactList Component</h2>
      
      {/* NUEVO: Mostrar contador de fetch */}
      {fetchCount > 0 && (
        <div style={{ 
          padding: '8px 12px', 
          marginBottom: '12px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '6px',
          fontSize: '14px',
          color: '#1976d2'
        }}>
          📊 Número de peticiones realizadas: <strong>{fetchCount}</strong>
        </div>
      )}

      {/* Botón para cargar contactos */}
      <button 
        onClick={fetchContactsDirectly}
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          marginBottom: '16px',
          backgroundColor: isLoading ? '#ccc' : '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Cargando...' : 'Cargar Contactos'}
      </button>

      {/* Spinner mientras carga */}
      {isLoading && (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <div style={{ 
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid #ddd',
            borderTopColor: '#1976d2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ marginTop: '12px' }}>Cargando contactos desde API...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div style={{ 
          padding: '12px', 
          backgroundColor: '#ffebee', 
          color: '#c62828',
          borderRadius: '6px',
          marginBottom: '16px'
        }}>
          <strong>❌ Error:</strong> {error}
          <button 
            onClick={fetchContactsDirectly}
            style={{
              marginLeft: '12px',
              padding: '6px 12px',
              backgroundColor: '#d32f2f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Sin contactos */}
      {contacts.length === 0 && !isLoading && !error && (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          backgroundColor: '#fff3e0',
          borderRadius: '8px',
          color: '#e65100'
        }}>
          ℹ️ No hay contactos cargados. Haz clic en "Cargar Contactos"
        </div>
      )}

      {/* Lista de contactos */}
      {contacts.length > 0 && (
        <div>
          <h3>Contactos cargados: {contacts.length}</h3>
          {contacts.map(contact => (
            <div key={contact.id} style={{
              padding: '12px',
              margin: '8px 0',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#fafafa'
            }}>
              <h4 style={{ margin: '0 0 8px 0' }}>{contact.fullname}</h4>
              <p style={{ margin: '4px 0' }}>📱 {contact.phonenumber}</p>
              <p style={{ margin: '4px 0' }}>✉️ {contact.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}