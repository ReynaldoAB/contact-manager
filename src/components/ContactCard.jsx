// src/components/ContactCard.jsx

import React from "react";

export default function ContactCard(props) {

  console.log('ContactCard render:', name);

  return (
    <div style={{ border: '3px solid #0000ff', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  maxWidth: '300px', 
                  borderCollapse: 'collapse' 
                }}>
      {props.name &&  <h3>{props.name}</h3>}
      {props.phone && <p>📱 Teléfono: {props.phone}</p>}
      {props.email && <p>✉️ Email: {props.email}</p>}
      {/*<p style={{ margin: 0 }}> {props.isFavorite ? (<h3>⭐</h3>): (<h3></h3>)}</p>*/}
      {props.isFavorite && <p style={{ margin: 0 }}>⭐ Favorito</p>}
    </div>
  );
}