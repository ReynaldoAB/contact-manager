// src/pages/HomePage.jsx

import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import ContactList from '../components/ContactList';
import { contactService } from '../services/contactService';



const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

export default function HomePage() {

   // Clas 05 ejemplo del profesor

  const [contacts, setContacts] = useState([]); //Estado para almacenar los contactos obtenidos de la API
  
  const [metadata, setMetadata] = useState(null); // Estado para almacenar metadata de la respuesta
  const [stats, setStats] = useState(null); // Estado para estadísticas adicionales

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  // const personas = [
  //   { id: 1, name: "Ana García", phone: "555-1234" },
  //   { id: 2, name: "Carlos López", phone: "555-5678" },
  //   { id: 3, name: "María Torres", phone: "555-9012" }
  // ];

  console.log("Componente HomePage Sin Montar");

  useEffect(() => {
    // Inicio lógica useEffect; - Lógica que ejecutará cuando el componente se monta;
    async function fetchContacts() {
      try {
          // const response = await fetch(API_URL);
          setLoading(true);
          
          // const data = await response.json();
          
          // const data = await contactService.getAllContacts();
          // const data = await contactService.fetchContacts();
          
          // Desestruturando el obljeto retornado
          const resultado= await contactService.fetchContacts();
          setContacts(resultado.contacts); // Acceder a resultado.contacts
          setMetadata(resultado.metadata);

          console.log(`Total requests: ${contactService.getRequestCount()}`);
      } catch (err) {
          console.error("Error fetching contacts:", error);
          setError(err.message);
      } finally {
          setLoading(false);
      }
    }
    fetchContacts();
    // Final de la logica useEffect
  }, []);

  const handleshowStats = () => {
    const serviceStats = contactService.getStats();
    setStats(serviceStats);
    console.log('Estado del servicio:', serviceStats);
  };


  if (loading) return <div style={{ padding: '20px' }}> Cargando contactos...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}> Error: {error}</div>;

  return (
    <main className='pt-12 max-w-md mx-auto p-4'>
      <h1 className='text-5xl font-black mb-4'>Mis Contactos</h1>

      {/* Mostrar metadata */}
      {metadata && (
        <div style={{
          padding: '12px',
          marginBottom: '16px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '2px solid #2196f3'
        }}>
          <p style={{ margin: '4px 0', fontWeight: 'bold' }}>
            📦 {metadata.source}
          </p>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>
            Total: {metadata.totalContacts} contactos
          </p>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>
            Request #{metadata.requestNumber} - {metadata.responseTime}
          </p>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>
            🕒 Última carga: {new Date(metadata.timestamp).toLocaleString('es-ES')}
          </p>
        </div>
      )}

      {/* Botón para estadisticas */}
      <button
        onClick={handleshowStats}
        style={{
          padding: '10px 16px',
          marginBottom: '16px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}

      >
        Ver Estadísticas del Servicio
      </button>

      {/* Mostrar stats */}
      {stats && (
        <div style={{
          padding: '12px',
          marginBottom: '16px',
          backgroundColor: '#fff3e0',
          borderRadius: '8px',
          border: '2px solid #ff9800'
        }}>
          <h3 style={{ marginTop: 0 }}> Estadistica del Servicio</h3>
          <p style={{ margin: '4px 0' }}>Total Requests: {stats.totalRequests}</p>
          <p style={{ margin: '4px 0' }}>Ultimo Request: {stats.lastRequestTime}</p>
          <p style={{ margin: '4px 0' }}>API URL: {stats.apiUrl}</p>
          <p style={{ margin: '4px 0' }}>Estatus: {stats.serviceStatus}</p>
        </div>
      )}
      
      {contacts.map(function(contact) {
        return (
          <div key={contact.id} style={{
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '8px'
          }}>
            <Link to={`/contact/${contact.id}`} style={{ textDecoration: 'none' }}>
              <h3>{contact.fullname}</h3>
              <p>{contact.phonenumber}</p>
              {contact.email && <p style={{ fontSize: '14px', color: '#666' }}>{contact.email}</p>}
              <p>{contact.type}</p>
            </Link>
          </div>
        );
      })}
    </main>
  );
}