// src/components/ContactList.jsx
import React from 'react';
import ContactCard from './ContactCard';

export default function ContactList({ contacts = [], onDeleteContact, onToggleFavorite }) {
  
  if (!contacts.length) return <p>No hay contactos</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          style={{ 
            border: '1px solid #ddd',
            padding: 16,
            borderRadius: 8,
            position: 'relative',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            backgroundColor: '#fff'
          }}
        >
            <ContactCard
              name={contact.name}
              phone={contact.phone}
              isFavorite={contact.isFavorite ? '★ Favorito' : ''} 
            />

            <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 8 }}>

              <button
                onClick={() => onToggleFavorite && onToggleFavorite(contact.id)}
                aria-label={contact.isFavorite ? `Quitar favorito ${contact.name}` : `Marcar favorito ${contact.name}`}
                title={contact.isFavorite ? 'Quitar favorito' : 'Marcar favorito'}
                style={{
                  background: contact.isFavorite ? '#ffd24d' : '#eee',
                  color: contact.isFavorite ? '#000' : '#333',
                  border: 'none',
                  padding: '6px 8px',
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
              >
              {contact.isFavorite ? '★' : '☆'}
            </button>
         


              <button
                //onClick={function() { onDeleteContact(contact.id); }}
                onClick={() => {
                  if (!onDeleteContact) return;
                  if (window.confirm(`¿Eliminar a ${contact.name}?`)) {
                    onDeleteContact(contact.id);
                  }
                }}

                style={{
                  backgroundColor: '#ff4444',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Eliminar
              </button>

            </div>

        </div>
      ))}
    </div>
  );
}
