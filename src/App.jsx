// src/App.jsx

import { useState } from 'react'

import Header from './components/Header';
import ContactList from './components/ContactList';

export default function App() {

  const [contacts, setContacts] = useState([
    
      { id: 1, name: "Ana García", phone: "555-1234", isFavorite: true },
      { id: 2, name: "Carlos López", phone: "555-5678", isFavorite: false },
      { id: 3, name: "María Torres", phone: "555-9012", isFavorite: true }
    
  ]);

  function handleAddContact() {
    const newContact = {
      id: Date.now(), //ID único temporal basado en la marca de tiempo 
      name: 'Contacto' + (contacts.length + 1),
      phone: '+51 900 000 000',
      isFavorite: false
    };
    //setContacts(...contacts, newContact);
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  // Conteos
  const totalContacts = contacts.length;
  const favoriteCount = contacts.filter(c => c.isFavorite).length;
  const favoritesLabel = favoriteCount >= 2 ? 'contactos favoritos' : 'contacto favorito';
  const totalContactsLabel = totalContacts >= 2 ? 'contactos' : 'contacto'
//Agrega un console.log dentro del componente (fuera de funciones) para ver cuántas veces se ejecuta al hacer cli
console.log('App render - contacts length:', contacts.length)

 function handleDeleteContact(contactId) {
  const updatedContacts = contacts.filter(function(contact) {
    return contact.id !== contactId;
  });

  setContacts(updatedContacts);
}

  // Nuevo: alternar favorito
  function handleToggleFavorite(contactId) {
    setContacts(prevContacts =>
      prevContacts.map(c => c.id === contactId ? { ...c, isFavorite: !c.isFavorite } : c)
    );
  }


  // Nuevo: limpiar todos los contactos con confirmación
  function handleClearContacts() {
    if (!contacts.length) return;
    if (!window.confirm('¿Eliminar todos los contactos?')) return;
    setContacts([]);
  }

  return (
    <>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <Header />

        <p style={{textAlign: 'center'}}>{`${favoriteCount} ${favoritesLabel} de ${totalContacts} ${totalContactsLabel}`}</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>


          <button 
            onClick={handleAddContact} 
            style={{ 
              button: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'lead', 
              marginBottom: '20px',
              padding: '10px 50px',
              fontSize: '20px',
            }}
          >
            + Agregar Contacto
          </button>
            {/* Nuevo: botón Limpiar todo */}
            <button
                onClick={handleClearContacts}
                disabled={contacts.length === 0}
                style={{
                  marginLeft: 12,
                  backgroundColor: '#ff6b6b',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: 6,
                  cursor: contacts.length === 0 ? 'not-allowed' : 'pointer',
                  opacity: contacts.length === 0 ? 0.6 : 1
                }}
              >
              Limpiar todo
            </button>

        </div>

        {/* Pasa la prop onDeleteContact al ContactList */}
        <ContactList
            contacts={contacts}
            onDeleteContact={handleDeleteContact}
            onToggleFavorite={handleToggleFavorite}

        />

      </div>
    </>
  );
}
