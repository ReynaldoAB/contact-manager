// src/components/card-contact.jsx

import { useState } from "react"; 

// Funciones reciben "parametros".
// A las funciones les enviamos "argumentos".

// Reac, los componentes reciben "props" (propiedades).
// Las "props" son un objeto que contiene propiedades que se pasan al componente desde el componente padre.

export default function Card(props) {
    // Los estados se definen dentro del componente. Suelen ir al inicio del componente

    const [contador, setContador] = useState(0);

    // Lógica (DENTRO DEL COMPONENTE)

     function aumentarContador() {
        //contador += 1; // Esto solo cambia la variable, pero no actualiza la interfaz

        setContador(contador + 1); // Esto actualiza el estado y la interfaz
    }

    // condicional para mostrar la edad solo si se proporciona
    // calcular variables, etc.
    // Después de la logica, recien construyes el JSX:

    // Lógica de Negocio
    // Si el contacto es menor de edad, NO DEBE APARECER SU APELLIDO
    // SI NO hay edad, asume que es manor de edad
    let menorEdad = true;
    if (props.edad) {
        if (props.edad >= 18) {
            menorEdad = false;
        }
    }


    // Reconocer si vino la funcion clickBehavior como props

    // Después de la lógica, construyes el JSX

    return (
        <div style={
                        { 
                          with: '100%', // Ancho completo del contenedor padre  
                          //display: 'flex', /*Crea las columnas */
                          //gap: 20, /* espacio entre columnas */
                          //justifyContent: 'space-between', /* espacio entre los elementos */
                          //alignItems: 'center', /* Alinea verticalmente al centro */
                          border: "2px solid black",
                          borderRadius: "12px",
                          padding: "12px 16px", /* El padding agrega espacio dentro del elemento */
                          marginBottoom: "16px",/* El margin agrega espacio fuera del elemento */
                          textAlign: 'left',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 08)'
                        }
                    }
        >
            <div> 
                <h3>Contacto: {props.name}</h3> {/* Primera columna */}
                <h3>Phone: {props.phone} </h3>
                
            </div>
            <div style={{ textAlign: 'initial' }}> 
                {props.isFavorite ? (<h3>⭐</h3>): (<h3>☆</h3>)}
            </div>
        </div>
    )
}