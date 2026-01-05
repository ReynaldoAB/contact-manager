// src/pages/HomePage.jsx

import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import ContactList from '../components/ContactList';
import { contactService } from '../services/contactService';

// Integrando ContactForm 
import ContactForm from '../components/ContactForm';

// Integrando ContactEditForm
import ContactEditForm from '../components/ContactEditForm';

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

export default function HomePage() {

   // Clas 05 ejemplo del profesor

  const [contacts, setContacts] = useState([]); //Estado para almacenar los contactos obtenidos de la API
  const [metadata, setMetadata] = useState(null); // Estado para almacenar metadata de la respuesta
  const [stats, setStats] = useState(null); // Estado para estadísticas adicionales
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👇 NUEVO: Key para forzar recarga del componente
  const [refreshKey, setRefreshKey] = useState(0);

    // 👇 NUEVO: Estado para el contacto en edición
  const [editingContact, setEditingContact] = useState(null);


  console.log("Componente HomePage Sin Montar");

  // Función para manejar la creación de un nuevo contacto
  function handleContactCreated(newContact) {
    console.log('Nuevo contacto creado:', newContact);

    // Gerando un ID temporal para el nuevo contacto
    const contactWithId = {
      ...newContact,
      id: `temp-${Date.now()}-${Math.random()}`,
      type: 'personal' // Asignar un tipo por defecto
    };

    // Agregar el contacto al inicio de la lista
    setContacts(prevContacts => [contactWithId, ...prevContacts]);

    // Actualizar metadata
    if (metadata) {
      setMetadata(prevMetadata => ({
        ...prevMetadata,
        totalContacts: prevMetadata.totalContacts + 1
      }));
    }

    // 👇 NUEVO: Forzar recarga incrementando la key
    setRefreshKey(prev => prev + 1);

  }

    // 👇 NUEVO: Función para seleccionar contacto a editar
  function handleContactSelect(contact) {
    setEditingContact(contact);
  }

  // 👇 NUEVO: Función cuando se actualiza un contacto
  function handleContactUpdated(updatedContact) {
    console.log('Contacto actualizado:', updatedContact);
    
    // Actualizar el contacto en la lista
    setContacts(prevContacts => 
      prevContacts.map(c => c.id === updatedContact.id ? updatedContact : c)
    );
    
    // Cerrar modal de edición
    setEditingContact(null);
    
    // Forzar recarga
    setRefreshKey(prev => prev + 1);
  }

  useEffect(() => {
    // Inicio lógica useEffect; - Lógica que ejecutará cuando el componente se monta;
    async function fetchContacts() {
      try {
          setLoading(true);
          
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

      {/* Formulario para agregar contactos */}
      <div style={{ marginBottom: '24px' }}>
        <ContactForm onContactCreated={handleContactCreated} />
      </div>

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
      
     {/* 👇 Se AGREGA key prop aquí */}
      {contacts.map(function(contact) {
        return (
          <div key={`${contact.id}-${refreshKey}`} style={{
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Link to={`/contact/${contact.id}`} style={{ 
              textDecoration: 'none',
              flex: 1
            }}>
              <h3>{contact.fullname}</h3>
              <p>{contact.phonenumber}</p>
              {contact.email && <p style={{ fontSize: '14px', color: '#666' }}>{contact.email}</p>}
              <p>{contact.type}</p>
            </Link>
            {/* 👇 NUEVO: Botón de editar */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleContactSelect(contact);
              }}
              style={{
                padding: '8px 12px',
                backgroundColor: '#ff9800',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              ✏️ Editar
            </button>
          </div>
        );
      })}

      {/* 👇 NUEVO: Modal de edición */}
      {editingContact && (
        <ContactEditForm
          contact={editingContact}
          onContactUpdated={handleContactUpdated}
          onCancel={() => setEditingContact(null)}
        />
      )}


    </main>
  );
}