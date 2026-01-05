import { useState, useEffect } from 'react';
// No usaremos la API poruqe El error 405 Method Not Allowed 
//import { contactService } from '../services/contactService';

export default function ContactEditForm({ contact, onContactUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    fullname: '',
    phonenumber: '',
    email: '',
    type: 'personal' // 👈 Agregar type
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Pre-llenar formulario cuando cambie el contacto
  useEffect(() => {
    if (contact) {
      setFormData({
        fullname: contact.fullname || '',
        phonenumber: contact.phonenumber || '',
        email: contact.email || '',
        type: contact.type || 'Personal' // 👈 Incluir type
      });
    }
  }, [contact]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // ⚠️ SIMULACIÓN: La API responde 405 (no soporta PUT ni PATCH)
      console.log('⚠️ API no soporta actualizaciones (405). Simulando cambio local...');
      
      // Simular delay de red (800ms) para mejor UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Crear objeto actualizado manteniendo el id original
      const updatedContact = {
        ...contact,  // Mantener id y otros campos originales
        ...formData  // Sobrescribir con datos del formulario
      };
      
      console.log('✅ Contacto actualizado (solo localmente):', updatedContact);
      
      // Notificar al componente padre
      onContactUpdated?.(updatedContact);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }


  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '400px'
      }}>
        <h3>✏️ Editar Contacto</h3>

        {error && (
          <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', marginBottom: '15px', borderRadius: '4px' }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="edit-fullname">Nombre completo *</label>
            <input
              id="edit-fullname"
              name="fullname"
              type="text"
              value={formData.fullname}
              onChange={handleChange}
              required
              disabled={isSaving}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="edit-phonenumber">Teléfono *</label>
            <input
              id="edit-phonenumber"
              name="phonenumber"
              type="tel"
              value={formData.phonenumber}
              onChange={handleChange}
              required
              disabled={isSaving}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="edit-email" style={{ display: 'block', marginBottom: '5px' }}>
                Email</label>
            <input
              id="edit-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSaving}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

         {/* 👇 NUEVO: Campo tipo de contacto */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="edit-type" style={{ display: 'block', marginBottom: '5px' }}>
              Tipo de contacto *
            </label>
            <select
              id="edit-type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              disabled={isSaving}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="personal">Personal</option>
              <option value="trabajo">Trabajo</option>
              <option value="familia">Familia</option>
              <option value="otro">Otro</option>
            </select>
          </div>


          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSaving}
              style={{ 
                flex: 1, 
                padding: '10px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSaving ? 'not-allowed' : 'pointer'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              style={{ flex: 1, padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none' }}
            >
              {isSaving ? '⏳ Guardando...' : '💾 Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}