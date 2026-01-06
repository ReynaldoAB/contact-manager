// src/pages/HomePage.jsx

import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import ContactList from '../components/ContactList';
import { contactService } from '../services/contactService';
// Integrando ContactForm 
import ContactForm from '../components/ContactForm';
// Integrando ContactEditForm
import ContactEditForm from '../components/ContactEditForm';

// 👇 NUEVO: Import funciones de favoritos
import { 
  getFavorites, 
  toggleFavorite, 
  getSearchQuery, 
  saveSearchQuery, 
  getSortOrder, 
  saveSortOrder 
} from '../utils/storage';

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

export default function HomePage() {

   // Clas 05 ejemplo del profesor

  const [contacts, setContacts] = useState([]); //Estado para almacenar los contactos obtenidos de la API
  const [metadata, setMetadata] = useState(null); // Estado para almacenar metadata de la respuesta
  const [stats, setStats] = useState(null); // Estado para estadísticas adicionales
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👇 NUEVO: Key para forzar recarga del componente
  const [refreshKey, setRefreshKey] = useState(0);

  // 👇 NUEVO: Estado para el contacto en edición
  const [editingContact, setEditingContact] = useState(null);

  // 👇 NUEVO: Estados para eliminación
  const [deletingContact, setDeletingContact] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // 👇 NUEVO: Estado para IDs de favoritos
  const [favoriteIds, setFavoriteIds] = useState([]);

   // 👇 NUEVO: Estado para filtrar solo favoritos
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

   // 👇 NUEVO: Estado para búsqueda en tiempo real
  const [searchQuery, setSearchQuery] = useState(() => getSearchQuery());
  
  // 👇 NUEVO: Estado para ordenamiento (asc = A-Z, desc = Z-A)
  const [sortOrder, setSortOrder] = useState(() => getSortOrder());

  console.log("Componente HomePage Sin Montar");

  // Función para manejar la creación de un nuevo contacto
  function handleContactCreated(newContact) {
    console.log('Nuevo contacto creado:', newContact);

    // Gerando un ID temporal para el nuevo contacto
    const contactWithId = {
      ...newContact,
      id: `temp-${Date.now()}-${Math.random()}`,
      type: 'personal' // Asignar un tipo por defecto
    };

    // Agregar el contacto al inicio de la lista
    setContacts(prevContacts => [contactWithId, ...prevContacts]);

    // Actualizar metadata
    if (metadata) {
      setMetadata(prevMetadata => ({
        ...prevMetadata,
        totalContacts: prevMetadata.totalContacts + 1
      }));
    }

    // 👇 NUEVO: Forzar recarga incrementando la key
    setRefreshKey(prev => prev + 1);

  }

    // 👇 NUEVO: Función para seleccionar contacto a editar
  function handleContactSelect(contact) {
    setEditingContact(contact);
  }

  // 👇 NUEVO: Función cuando se actualiza un contacto
  function handleContactUpdated(updatedContact) {
    console.log('Contacto actualizado:', updatedContact);
    
    // Actualizar el contacto en la lista
    setContacts(prevContacts => 
      prevContacts.map(c => c.id === updatedContact.id ? updatedContact : c)
    );
    
    // Cerrar modal de edición
    setEditingContact(null);
    
    // Forzar recarga
    setRefreshKey(prev => prev + 1);
  }

    // 👇 NUEVO: Función para mostrar confirmación de eliminación
  async function handleDeleteClick(contact) {
    // Mostrar confirmación
    setDeletingContact(contact);
  }

  // 👇 NUEVO: Función para confirmar eliminación
  async function confirmDelete() {
    if (!deletingContact) return;

    setIsDeleting(true);
    try {
      await contactService.deleteContact(deletingContact.id);
      // Actualizar lista local
      setContacts(prev => prev.filter(c => c.id !== deletingContact.id));
      setDeletingContact(null);
      // Actualizar metadata
      if (metadata) {
        setMetadata(prevMetadata => ({
          ...prevMetadata,
          totalContacts: prevMetadata.totalContacts - 1
        }));
      }
      // Forzar recarga
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  }

  // 👇 NUEVO: Función para cancelar eliminación
  function cancelDelete() {
    setDeletingContact(null);
  }

  // 👇 NUEVO: Handler para favoritos
  function handleToggleFavorite(contactId) {
    const newFavorites = toggleFavorite(contactId);
    setFavoriteIds(newFavorites);
  }

  // 👇 NUEVO: Handler para cambiar orden
  function toggleSortOrder() {
    setSortOrder(prev => {
      const newOrder = prev === 'asc' ? 'desc' : 'asc';
      saveSortOrder(newOrder);
      return newOrder;
    });
  }
  useEffect(() => {
    // 👇 NUEVO: Cargar favoritos al inicio
    setFavoriteIds(getFavorites());

    // Inicio lógica useEffect; - Lógica que ejecutará cuando el componente se monta;
    
    async function fetchContacts() {
      try {
          setLoading(true);
          
          // Desestructurando el obljeto retornado
          const resultado= await contactService.fetchContacts();
          setContacts(resultado.contacts); // Acceder a resultado.contacts
          setMetadata(resultado.metadata);

          console.log(`Total requests: ${contactService.getRequestCount()}`);
      } catch (err) {
          console.error("Error fetching contacts:", error);
          setError(err.message);
      } finally {
          setLoading(false);
      }
    }
    fetchContacts();
    // Final de la logica useEffect
  }, []);

  // 👇 NUEVO: Combinar contactos con estado de favorito
  const contactsWithFavorites = contacts.map(contact => ({
    ...contact,
    isFavorite: favoriteIds.includes(contact.id)
  }));

    // 👇 MODIFICADO: Filtrar por favoritos Y búsqueda
  const displayedContacts = contactsWithFavorites
    .filter(contact => {
      // Filtro de favoritos
      if (showOnlyFavorites && !contact.isFavorite) return false;
      
      // Filtro de búsqueda (case-insensitive)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const fullname = contact.fullname.toLowerCase();
        return fullname.includes(query);
      }
      
      return true;
    })
     .sort((a, b) => {
      // Ordenamiento alfabético usando localeCompare
      const comparison = a.fullname.localeCompare(b.fullname, 'es');
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleshowStats = () => {
    const serviceStats = contactService.getStats();
    setStats(serviceStats);
    console.log('Estado del servicio:', serviceStats);
  };


  if (loading) return <div style={{ padding: '20px' }}> Cargando contactos...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}> Error: {error}</div>;

  return (
    <main className='pt-12 max-w-md mx-auto p-4'>
      <h1 className='text-5xl font-black mb-4'>Mis Contactos</h1>

      {/* Formulario para agregar contactos */}
      <div style={{ marginBottom: '24px' }}>
        <ContactForm onContactCreated={handleContactCreated} />
      </div>

      {/* Mostrar metadata */}
      {metadata && (
        <div style={{
          padding: '12px',
          marginBottom: '16px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '2px solid #2196f3'
        }}>
          <p style={{ margin: '4px 0', fontWeight: 'bold' }}>
            📦 {metadata.source}
          </p>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>
            Total: {metadata.totalContacts} contactos
          </p>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>
            Request #{metadata.requestNumber} - {metadata.responseTime}
          </p>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>
            🕒 Última carga: {new Date(metadata.timestamp).toLocaleString('es-ES')}
          </p>
        </div>
      )}

      {/* Botón para estadisticas */}
      <button
        onClick={handleshowStats}
        style={{
          padding: '10px 16px',
          marginBottom: '16px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}

      >
        Ver Estadísticas del Servicio
      </button>

      {/* 👇 NUEVO: Toggle para filtrar favoritos */}
      <label style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
        padding: '10px',
        backgroundColor: '#fff9c4',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}>
        <input
          type="checkbox"
          checked={showOnlyFavorites}
          onChange={(e) => setShowOnlyFavorites(e.target.checked)}
          style={{ cursor: 'pointer' }}
        />
        Mostrar solo favoritos ({favoriteIds.length})
      </label>

      {/* 👇 NUEVO: Input de búsqueda */}
      <div style={{
        marginBottom: '16px'
      }}>
        <input
          type="text"
          placeholder="🔍 Buscar contacto por nombre..."
          value={searchQuery}
          onChange={(e) => {
            const newQuery = e.target.value;
            setSearchQuery(newQuery);
            saveSearchQuery(newQuery);
          }}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #2196f3',
            borderRadius: '8px',
            boxSizing: 'border-box'
          }}
        />
        {searchQuery && (
          <p style={{ 
            fontSize: '14px', 
            color: '#666', 
            marginTop: '8px' 
          }}>
            📊 {displayedContacts.length} contacto(s) encontrado(s)
          </p>
        )}
      </div>

      {/* 👇 NUEVO: Botón de ordenamiento */}
      <button
        onClick={toggleSortOrder}
        style={{
          padding: '10px 16px',
          marginBottom: '16px',
          backgroundColor: '#9c27b0',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        {sortOrder === 'asc' ? '🔤 A-Z' : '🔤 Z-A'}
        <span style={{ fontSize: '12px' }}>
          {sortOrder === 'asc' ? '(Ascendente)' : '(Descendente)'}
        </span>
      </button>

      {/* 👇 NUEVO: Contador de contactos */}
      <div style={{
        padding: '12px',
        marginBottom: '16px',
        backgroundColor: '#e8f5e9',
        borderRadius: '8px',
        border: '2px solid #4caf50',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        📊 Mostrando {displayedContacts.length} de {contacts.length} contactos
      </div>

      {/* 👇 NUEVO: Mensaje cuando no hay resultados */}
      {displayedContacts.length === 0 && (
        <div style={{
          padding: '40px 20px',
          textAlign: 'center',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          border: '2px solid #ffc107',
          marginBottom: '16px'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>🔍 No se encontraron contactos</h3>
          <p style={{ margin: '0', color: '#666' }}>
            {searchQuery ? (
              <>No hay contactos que coincidan con "<strong>{searchQuery}</strong>"</>
            ) : showOnlyFavorites ? (
              <>No tienes contactos marcados como favoritos</>
            ) : (
              <>Aún no tienes contactos. ¡Agrega tu primer contacto arriba!</>
            )}
          </p>
          {(searchQuery || showOnlyFavorites) && (
            <button
              onClick={() => {
                setSearchQuery('');
                saveSearchQuery('');
                setShowOnlyFavorites(false);
              }}
              style={{
                marginTop: '16px',
                padding: '10px 20px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ❌ Limpiar filtros
            </button>
          )}
        </div>
      )}


      {/* Mostrar stats */}
      {stats && (
        <div style={{
          padding: '12px',
          marginBottom: '16px',
          backgroundColor: '#fff3e0',
          borderRadius: '8px',
          border: '2px solid #ff9800'
        }}>
          <h3 style={{ marginTop: 0 }}> Estadistica del Servicio</h3>
          <p style={{ margin: '4px 0' }}>Total Requests: {stats.totalRequests}</p>
          <p style={{ margin: '4px 0' }}>Ultimo Request: {stats.lastRequestTime}</p>
          <p style={{ margin: '4px 0' }}>API URL: {stats.apiUrl}</p>
          <p style={{ margin: '4px 0' }}>Estatus: {stats.serviceStatus}</p>
        </div>
      )}
      
     {/* 👇 Se AGREGA key prop aquí */}
      {displayedContacts.map(function(contact) {
        return (
          <div key={`${contact.id}-${refreshKey}`} style={{
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Link to={`/contact/${contact.id}`} style={{ 
              textDecoration: 'none',
              flex: 1
            }}>
              <h3>{contact.fullname}</h3>
              <p>{contact.phonenumber}</p>
              {contact.email && <p style={{ fontSize: '14px', color: '#666' }}>{contact.email}</p>}
              <p>{contact.type}</p>
            </Link>
            {/* 👇 NUEVO: Botón de favorito */}
            <button
              onClick={() => handleToggleFavorite(contact.id)}
              style={{
                padding: '8px 12px',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer'
              }}
              title={contact.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              {contact.isFavorite ? '⭐' : '☆'}
            </button>            
            {/* 👇 NUEVO: Botón de editar */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleContactSelect(contact);
              }}
              style={{
                padding: '8px 12px',
                backgroundColor: '#ff9800',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              ✏️ Editar
            </button>
            {/* 👇 NUEVO: Botón de eliminar */}
            <button
              onClick={() => handleDeleteClick(contact)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              🗑️ Eliminar
            </button>            
          </div>
        );
      })}

      {/* 👇 NUEVO: Modal de edición */}
      {editingContact && (
        <ContactEditForm
          contact={editingContact}
          onContactUpdated={handleContactUpdated}
          onCancel={() => setEditingContact(null)}
        />
      )}

            {/* 👇 NUEVO: Modal/Diálogo de confirmación */}
      {deletingContact && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3>⚠️ Confirmar Eliminación</h3>
            <p>¿Estás seguro de eliminar a <strong>{deletingContact.fullname}</strong>?</p>
            <p style={{ 
              fontSize: '14px', 
              color: '#666' 
            }}>
              Esta acción no se puede deshacer.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              marginTop: '20px' 
            }}>
              <button
                onClick={cancelDelete}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: isDeleting ? '#ccc' : '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: isDeleting ? 'not-allowed' : 'pointer'
                }}
              >
                {isDeleting ? '⏳ Eliminando...' : '🗑️ Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}