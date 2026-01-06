import { useState } from 'react';
import { contactService } from '../services/contactService';

export default function ContactForm({ onContactCreated }) {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    fullname: '',
    phonenumber: '',
    email: '',
    type: 'personal' // Tipo por defecto
  });

  // Nuevo: tracking de campos tocados
  const [touched, setTouched] = useState({
    fullname: false,
    phonenumber: false,
    email: false
  });

 // Nuevos estados para manejo de UI
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handler genérico para todos los inputs
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpiar mensajes al escribir
    if (error) setError(null);
    if (success) setSuccess(false);
  }

  // Handler para onBlur
  function handleBlur(e) {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }

  // Handler para envío del formulario (ahora async)
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // Llamar al servicio para crear el contacto
      const newContact = await contactService.createContact(formData);

      // Limpiar formulario solo si fue exitoso
      setFormData({ fullname: '', phonenumber: '', email: '' });
      setSuccess(true);

      // Notificar al componente padre
      onContactCreated?.(newContact);

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  function validateField(fieldName, value) {
  switch (fieldName) {
    case 'fullname':
      if (!value.trim()) return 'El nombre es requerido';
      if (value.length < 2) return 'Mínimo 2 caracteres';
      return '';
    case 'email':
      if (!value.trim()) return 'El email es requerido';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
      return '';
    case 'phonenumber':
      if (value && !/^\d{9,}$/.test(value.replace(/\D/g, ''))) {
        return 'Teléfono debe tener al menos 9 dígitos';
      }
      return '';
    default:
      return '';
  }
}

  // Calcular errores
  const errors = {
    fullname: validateField('fullname', formData.fullname),
    email: validateField('email', formData.email),
    phonenumber: validateField('phonenumber', formData.phonenumber)
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <h3>➕ Nuevo Contacto</h3>

      {/* Mensaje de éxito */}
      {success && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '15px',
          border: '1px solid #c3e6cb'
        }}>
          ✅ Contacto guardado exitosamente
        </div>
      )}

     {/* Mensaje de error */}
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '15px',
          border: '1px solid #f5c6cb'
        }}>
          ❌ Error: {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="fullname" style={{
             display: 'block', 
             marginBottom: '5px' 
            }}
          >
            Nombre completo *
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            value={formData.fullname}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ 
              width: '100%', 
              padding: '8px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              opacity: isSaving ? 0.6 : 1
            }}
          />
          {touched.fullname && errors.fullname && (
            <span style={{ 
              color: 'red', 
              fontSize: '12px' 
              }}
            >
              {errors.fullname}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="phonenumber" style={{ display: 'block', marginBottom: '5px' }}>
            Teléfono *
          </label>
          <input
            id="phonenumber"
            name="phonenumber"
            type="tel"
            value={formData.phonenumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+51 999-888-777"
            required
            disabled={isSaving}
            style={{ 
              width: '100%', 
              padding: '8px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              opacity: isSaving ? 0.6 : 1
            }}
          />
          {touched.phonenumber && errors.phonenumber && (
            <span style={{ 
              color: 'red', 
              fontSize: '12px' 
            }}>
              {errors.phonenumber}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            disabled={isSaving}
            style={{ 
              width: '100%', 
              padding: '8px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              opacity: isSaving ? 0.6 : 1
            }}
          />
        </div>

        {/* 👇 NUEVO: Campo tipo de contacto */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="type" style={{ display: 'block', marginBottom: '5px' }}>
            Tipo de contacto *
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            disabled={isSaving}
            style={{ 
              width: '100%', 
              padding: '8px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              opacity: isSaving ? 0.6 : 1
            }}
          >
            <option value="personal">Personal</option>
            <option value="trabajo">Trabajo</option>
            <option value="familia">Familia</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          style={{
            backgroundColor: isSaving ? '#6c757d' : '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            width: '100%',
            opacity: isSaving ? 0.7 : 1
          }}
        >
          {isSaving ? '⏳ Guardando...' : '💾 Guardar Contacto'}
        </button>
      </form>
    </div>
  );
}