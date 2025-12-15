// src/pages/ContactDetailPage.jsx
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

// Reutiliza la misma lista de contactos que HomePage (mover a un módulo común si lo prefieres)
// const contacts = [
//   { id: 1, name: "Ana García", phone: "555-1234", email: "ana@example.com" },
//   { id: 2, name: "Carlos López", phone: "555-5678", email: "carlos@example.com" },
//   { id: 3, name: "María Torres", phone: "555-9012", email: "maria@example.com" }
// ];

export default function ContactDetailPage() {
  // const { id } = useParams();
  // const contactId = Number(id);
  // const navigate = useNavigate();

  // const index = contacts.findIndex(c => c.id === contactId);
  // const contact = contacts[index];

// Lab 05: Asincronismo y Promesas
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [contact, setContact] = useState(null);
  const [allContacts, setAllContacts] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    async function fetchData() {
      try {
        // Obtener todos los contactos para navegación prev/next
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error fetching contacts');
        const data = await response.json();
        setAllContacts(data);
        
        // Encontrar el contacto actual
        const currentContact = data.find(c => c.id === Number(id));
        setContact(currentContact);
      } catch (error) {
        console.error('Error fetching contact:', error);
        setContact(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: 12 }}>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!contact) {
    return (
      <div style={{ padding: 12 }}>
        <h2>Contacto no encontrado</h2>
        <Link to="/">Volver a contactos</Link>
      </div>
    );
  }


  const index = allContacts.findIndex(c => c.id === contact.id);

  const goPrev = () => {
    if (index > 0) navigate(`/contact/${allContacts[index - 1].id}`);
  };

  const goNext = () => {
    if (index < allContacts.length - 1) navigate(`/contact/${allContacts[index + 1].id}`);
  };

  return (
    <div style={{ padding: 12 }}>

    {/* Enlace para volver a la lista de contactos */}
      <Link to="/" style={{ marginBottom: '20px', display: 'inline-block', color: '#1e90ff' }}>
        ← Volver a Home
      </Link>

      {/* Recuadro del contacto */}
      <div style={{
        padding: '20px',
        margin: '20px 0',
        border: '2px solid #ddd',
        borderRadius: '12px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>

      <h2>{contact.fullname}</h2>
      <p>📱 {contact.phonenumber}</p>
      <p>✉️ {contact.email}</p>
      <p>{contact.type}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <button
          onClick={goPrev}
          disabled={index <= 0}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: 'none',
            backgroundColor: index <= 0 ? '#ddd' : '#1e90ff',
            color: index <= 0 ? '#666' : '#fff',
            cursor: index <= 0 ? 'not-allowed' : 'pointer'
          }}
        >
          Anterior
        </button>

        <button
          onClick={goNext}
          disabled={index >= allContacts.length - 1}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: 'none',
            backgroundColor: index >= allContacts.length - 1 ? '#ddd' : '#1e90ff',
            color: index >= allContacts.length - 1 ? '#666' : '#fff',
            cursor: index >= allContacts.length - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}