// src/pages/ContactDetailPage.jsx
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Reutiliza la misma lista de contactos que HomePage (mover a un módulo común si lo prefieres)
const contacts = [
  { id: 1, name: "Ana García", phone: "555-1234", email: "ana@example.com" },
  { id: 2, name: "Carlos López", phone: "555-5678", email: "carlos@example.com" },
  { id: 3, name: "María Torres", phone: "555-9012", email: "maria@example.com" }
];

export default function ContactDetailPage() {
  const { id } = useParams();
  const contactId = Number(id);
  const navigate = useNavigate();

  const index = contacts.findIndex(c => c.id === contactId);
  const contact = contacts[index];

  if (!contact) {
    return (
      <div style={{ padding: 12 }}>
        <h2>Contacto no encontrado</h2>
        <Link to="/">Volver a contactos</Link>
      </div>
    );
  }

  const goPrev = () => {
    if (index > 0) navigate(`/contact/${contacts[index - 1].id}`);
  };

  const goNext = () => {
    if (index < contacts.length - 1) navigate(`/contact/${contacts[index + 1].id}`);
  };

  return (
    <div style={{ padding: 12 }}>
      <h2>{contact.name}</h2>
      <p>📱 {contact.phone}</p>
      <p>✉️ {contact.email}</p>

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
          disabled={index >= contacts.length - 1}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: 'none',
            backgroundColor: index >= contacts.length - 1 ? '#ddd' : '#1e90ff',
            color: index >= contacts.length - 1 ? '#666' : '#fff',
            cursor: index >= contacts.length - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}