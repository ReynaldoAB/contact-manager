// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

export default function HomePage() {
  const contacts = [
    { id: 1, name: "Ana García", phone: "555-1234" },
    { id: 2, name: "Carlos López", phone: "555-5678" },
    { id: 3, name: "María Torres", phone: "555-9012" }
  ];

  return (
    <div>
      <h1>Mis Contactos</h1>
      {contacts.map(function(contact) {
        return (
          <div key={contact.id} style={{
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '8px'
          }}>
            <Link to={`/contact/${contact.id}`} style={{ textDecoration: 'none' }}>
              <h3>{contact.name}</h3>
              <p>{contact.phone}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}