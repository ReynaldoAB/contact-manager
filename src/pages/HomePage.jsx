// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';



const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

export default function HomePage() {

   // Clas 05 ejemplo del profesor

  const [contacts, setContacts] = useState([]); //Estado para almacenar los contactos obtenidos de la API

  // const personas = [
  //   { id: 1, name: "Ana García", phone: "555-1234" },
  //   { id: 2, name: "Carlos López", phone: "555-5678" },
  //   { id: 3, name: "María Torres", phone: "555-9012" }
  // ];

  console.log("Componente HomePage Sin Montar");

  useEffect(() => {
    // Inicio lógica useEffect; - Lógica que ejecutará cuando el componente se monta;
    async function fectchContacts() {
      try {
          const response = await fetch(API_URL);
          const data = await response.json();
          setContacts(data); // Actuliza el estado con los contactos obtenidos
      } catch (error) {
          console.error("Error fetching contacts:", error);
      }
    }
    fectchContacts();
    // Final de la logica useEffect
  }, []);

  return (
    <main className='pt-12 max-w-md mx-auto p-4'>
      <h1 className='text-5xl font-black mb-4'>Mis Contactos</h1>
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