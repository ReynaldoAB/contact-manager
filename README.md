# Contact Manager (React + Vite)

Este es un proyecto de gestión de contactos construido con **React 18** y **Vite 5**, que incluye funcionalidades de enrutamiento, animaciones, integración con API REST, manejo de estados asíncronos con operaciones CRUD completas, sistema de favoritos, búsqueda en tiempo real, ordenamiento y persistencia de preferencias.

## Características Principales

- ✅ **Pantalla de carga (Splash Screen):** 3 segundos al iniciar con animación y spinner
- ✅ **Integración con API REST:** Obtiene contactos desde `VITE_API_URL` de forma asíncrona
- ✅ **Auto-retry con promesas:** Sistema de reintentos automáticos usando `loadAppDataWithRetry`
- ✅ **Servicio de contactos:** Clase `ContactService` con patrón Singleton para gestión de API
- ✅ **Manejo de errores centralizado:** Utilidad `getErrorMessage` para mensajes amigables
- ✅ **Listado de contactos:** Muestra fullname, phonenumber, email, type usando `ContactList`
- ✅ **Detalle de contacto:** Vista individual con recuadro estilizado en `ContactDetailPage`
- ✅ **Rutas:** Home (/), About (/about), Contact detail (/contact/:id), NotFound (404)
- ✅ **Animaciones:** Transiciones suaves con Framer Motion entre páginas
- ✅ **Navegación entre contactos:** Botones "Anterior" y "Siguiente" en detalle
- ✅ **Estadísticas de servicio:** Contador de requests y métricas de rendimiento
- ✅ **Test integrado:** Función `testService()` para verificar funcionamiento
- ✅ **Agregar nuevo contacto:** Formulario con validación y feedback visual
- ✅ **Validación de formularios:** Mensajes de error contextuales con `onBlur`
- ✅ **Editar contacto:** Modal de edición con actualización en tiempo real (simulación local)
- ✅ **Eliminar contacto:** Modal de confirmación con estado de carga
- ✅ **Sistema de favoritos:** Marcar/desmarcar contactos con persistencia en localStorage
- ✅ **Búsqueda en tiempo real:** Filtrado case-insensitive mientras escribes
- ✅ **Ordenamiento A-Z / Z-A:** Toggle para orden alfabético ascendente/descendente
- ✅ **Contador dinámico:** "Mostrando X de Y contactos" con estado vacío
- ✅ **Persistencia de preferencias:** Búsqueda y orden se guardan en localStorage
- ✅ **Refresh automático:** Sistema de keys para forzar re-renderizado de listas

## Estructura del Proyecto

```
contact-manager/
├── src/
│   ├── components/
│   │   ├── SplashScreen.jsx       # Pantalla de carga inicial (3s)
│   │   ├── ContactList.jsx        # Lista reutilizable de contactos
│   │   ├── ContactCard.jsx        # Tarjeta individual de contacto
│   │   ├── ContactForm.jsx        # Formulario para crear contactos
│   │   ├── ContactEditForm.jsx    # Modal para editar contactos
│   │   ├── Header.jsx             # Encabezado de la aplicación
│   │   ├── Navbar.jsx             # Barra de navegación
│   │   └── TestPage.jsx           # Página de pruebas del servicio
│   ├── pages/
│   │   ├── HomePage.jsx           # Lista + formulario + edición + eliminación
│   │   ├── AboutPage.jsx          # Página "Acerca de"
│   │   ├── ContactDetailPage.jsx  # Detalle con navegación
│   │   └── NotFoundPage.jsx       # Página 404
│   ├── services/
│   │   └── contactService.js      # Servicio de API con CRUD completo
│   ├── utils/
│   │   ├── errorHandler.js        # getErrorMessage() - Manejo de errores
│   │   ├── initializer.js         # Funciones de inicialización con promesas
│   │   └── storage.js             # Funciones de localStorage (favoritos, búsqueda, orden)
│   ├── App.jsx                    # Configuración de rutas y splash
│   └── main.jsx                   # Entry point
├── .env                           # Variables de entorno
├── .env.example                   # Plantilla de variables
├── package.json                   # Dependencias
└── README.md
```

## Configuración

### 1. Variables de entorno

Crea un archivo `.env` en la raíz:

```env
VITE_API_URL=https://entermocks.vercel.app/api/contacts
```

**Nota:** Variables deben empezar con `VITE_` para ser expuestas por Vite.

### 2. Instalación

```bash
npm install
```

### 3. Desarrollo

```bash
npm run dev
```

Aplicación en `http://localhost:5173`

## Funcionalidades Implementadas

### ContactService - Servicio de API (CRUD Completo)

Clase que gestiona todas las peticiones a la API con las siguientes características:

**Propiedades:**
- `apiUrl`: URL de la API desde variables de entorno
- `requestCount`: Contador de peticiones realizadas
- `lastRequestTime`: Timestamp de última petición

**Métodos:**

```javascript
// Obtener todos los contactos
await contactService.fetchContacts()
// Retorna: { contacts: [...], metadata: { totalContacts, requestNumber, responseTime, timestamp, source } }

// Crear nuevo contacto
await contactService.createContact({
  fullname: "Juan Pérez",
  phonenumber: "+51 999-888-777",
  email: "juan@ejemplo.com",
  type: "personal"
})
// Retorna: { id, fullname, phonenumber, email, type, ... }

// Actualizar contacto existente
await contactService.updateContact(contactId, {
  fullname: "Juan Pérez Actualizado",
  phonenumber: "+51 999-000-111",
  email: "nuevo@email.com",
  type: "trabajo"
})
// Retorna: { id, fullname, phonenumber, email, type, ... }
// ⚠️ Nota: La API actual (entermocks) no soporta PUT/PATCH (error 405)

// Eliminar contacto
await contactService.deleteContact(contactId)
// Retorna: true si se eliminó correctamente
// ⚠️ Nota: La API actual puede no soportar DELETE

// Obtener estadísticas del servicio
contactService.getStats()
// Retorna: { totalRequests, lastRequestTime, apiUrl, serviceStatus }

// Obtener contador de requests
contactService.getRequestCount()
```

**Características:**
- ✅ Patrón Singleton (instancia única)
- ✅ Logging detallado en consola
- ✅ Medición de tiempo de respuesta
- ✅ Manejo de errores HTTP (404, 405, 500, etc.)
- ✅ Detección de errores de red y CORS
- ✅ Headers configurables
- ✅ Metadata enriquecida en respuestas
- ✅ Soporte para POST (crear contactos - persisten en API)
- ✅ Soporte para DELETE (eliminar contactos)
- ✅ Preparado para PUT/PATCH (actualizar - limitado por API actual)

### ContactForm - Crear Nuevos Contactos con Validación Mejorada

**Componente:** `src/components/ContactForm.jsx`

**Características:**
- ✅ Campos: Nombre completo*, Teléfono*, Email*, Tipo de contacto*
- ✅ Validación en tiempo real con `onBlur`
- ✅ Mensajes de error contextuales por campo:
  - **Nombre:** "El nombre es requerido", "Mínimo 2 caracteres"
  - **Email:** "El email es requerido", "Email inválido"
  - **Teléfono:** "El teléfono es requerido", "Teléfono debe tener al menos 9 dígitos"
- ✅ Estado `touched` para mostrar errores solo cuando corresponde
- ✅ Validación personalizada con función `validateField()`
- ✅ Estado de carga (`isSaving`) con feedback visual
- ✅ Mensajes de éxito/error con estilos diferenciados
- ✅ Limpieza automática del formulario tras éxito
- ✅ Integración con API usando `contactService.createContact()`
- ✅ Callback `onContactCreated` para actualizar lista padre
- ✅ Inputs deshabilitados durante guardado
- ✅ Placeholder con formato de ejemplo para teléfono

**Estados:**
```javascript
const [formData, setFormData] = useState({
  fullname: '',
  phonenumber: '',
  email: '',
  type: 'personal'
});
const [touched, setTouched] = useState({
  fullname: false,
  phonenumber: false,
  email: false
});
const [isSaving, setIsSaving] = useState(false);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(false);
```

**Validación:**
```javascript
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
      if (!value.trim()) return 'El teléfono es requerido';
      if (!/^\d{9,}$/.test(value.replace(/\D/g, ''))) {
        return 'Teléfono debe tener al menos 9 dígitos';
      }
      return '';
    default:
      return '';
  }
}
```

**Uso:**
```jsx
<ContactForm onContactCreated={(newContact) => {
  console.log('Nuevo contacto:', newContact);
  // Actualizar lista local
}} />
```

### ContactEditForm - Editar Contactos Existentes

**Componente:** `src/components/ContactEditForm.jsx`

**Características:**
- ✅ Modal flotante con overlay semitransparente
- ✅ Pre-llenado automático con datos del contacto usando `useEffect`
- ✅ Campos editables: Nombre completo*, Teléfono*, Email, Tipo*
- ✅ Botones "Cancelar" y "💾 Guardar"
- ✅ Estado de carga con texto "⏳ Guardando..."
- ✅ Simulación local de actualización (800ms delay)
- ✅ Cierre automático del modal tras guardar
- ✅ Callbacks: `onContactUpdated` y `onCancel`

**⚠️ Limitación conocida:**
La API `entermocks.vercel.app` responde **405 Method Not Allowed** para PUT/PATCH. 
Por ello, la actualización se simula localmente. Los cambios persisten solo durante la sesión.

**Estados:**
```javascript
const [formData, setFormData] = useState({
  fullname: '',
  phonenumber: '',
  email: '',
  type: 'personal'
});
const [isSaving, setIsSaving] = useState(false);
const [error, setError] = useState(null);
```

**Uso:**
```jsx
{editingContact && (
  <ContactEditForm
    contact={editingContact}
    onContactUpdated={(updated) => {
      // Actualizar lista local
      setEditingContact(null);
    }}
    onCancel={() => setEditingContact(null)}
  />
)}
```

### Sistema de Eliminación con Confirmación

**Implementado en:** `src/pages/HomePage.jsx`

**Características:**
- ✅ Botón "🗑️ Eliminar" en cada contacto
- ✅ Modal de confirmación con overlay
- ✅ Mensaje de advertencia: "Esta acción no se puede deshacer"
- ✅ Botones "Cancelar" y "🗑️ Eliminar"
- ✅ Estado de carga "⏳ Eliminando..."
- ✅ Actualización automática de la lista tras eliminar
- ✅ Actualización del contador de contactos en metadata
- ✅ Integración con `contactService.deleteContact()`

**Estados:**
```javascript
const [deletingContact, setDeletingContact] = useState(null);
const [isDeleting, setIsDeleting] = useState(false);
```

**Funciones:**
```javascript
// Mostrar confirmación
async function handleDeleteClick(contact) {
  setDeletingContact(contact);
}

// Confirmar eliminación
async function confirmDelete() {
  if (!deletingContact) return;
  setIsDeleting(true);
  try {
    await contactService.deleteContact(deletingContact.id);
    setContacts(prev => prev.filter(c => c.id !== deletingContact.id));
    setDeletingContact(null);
    if (metadata) {
      setMetadata(prevMetadata => ({
        ...prevMetadata,
        totalContacts: prevMetadata.totalContacts - 1
      }));
    }
    setRefreshKey(prev => prev + 1);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsDeleting(false);
  }
}

// Cancelar eliminación
function cancelDelete() {
  setDeletingContact(null);
}
```

### Sistema de Favoritos con Persistencia

**Archivo de utilidades:** `src/utils/storage.js`

**Funciones disponibles:**
```javascript
// Obtener favoritos desde localStorage
getFavorites() // Retorna: Array<string> de IDs

// Guardar favoritos en localStorage
saveFavorites(favoriteIds) // Recibe: Array<string>

// Alternar estado de favorito
toggleFavorite(contactId) // Retorna: Array<string> actualizado
```

**Implementación en HomePage:**

**Estados:**
```javascript
const [favoriteIds, setFavoriteIds] = useState([]);
const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
```

**Características:**
- ✅ Botón ⭐/☆ en cada contacto
- ✅ Toggle "Mostrar solo favoritos (X)" con contador
- ✅ Persistencia en localStorage con key `agenda_favorites`
- ✅ Restauración automática al recargar la página
- ✅ Tooltips informativos en botones
- ✅ Filtrado compatible con búsqueda y ordenamiento

**Handler:**
```javascript
function handleToggleFavorite(contactId) {
  const newFavorites = toggleFavorite(contactId);
  setFavoriteIds(newFavorites);
}
```

**Uso:**
```jsx
<button
  onClick={() => handleToggleFavorite(contact.id)}
  title={contact.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
>
  {contact.isFavorite ? '⭐' : '☆'}
</button>

<label>
  <input
    type="checkbox"
    checked={showOnlyFavorites}
    onChange={(e) => setShowOnlyFavorites(e.target.checked)}
  />
  Mostrar solo favoritos ({favoriteIds.length})
</label>
```

### Búsqueda en Tiempo Real

**Implementado en:** `src/pages/HomePage.jsx`

**Características:**
- ✅ Input de búsqueda con placeholder "🔍 Buscar contacto por nombre..."
- ✅ Filtrado case-insensitive mientras escribes
- ✅ Búsqueda por `fullname` usando `.toLowerCase()` y `.includes()`
- ✅ Contador de resultados "📊 X contacto(s) encontrado(s)"
- ✅ Compatible con filtro de favoritos y ordenamiento
- ✅ Persistencia de búsqueda en localStorage

**Estado:**
```javascript
const [searchQuery, setSearchQuery] = useState(() => getSearchQuery());
```

**Filtrado:**
```javascript
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
  });
```

**Input:**
```jsx
<input
  type="text"
  placeholder="🔍 Buscar contacto por nombre..."
  value={searchQuery}
  onChange={(e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    saveSearchQuery(newQuery);
  }}
/>
{searchQuery && (
  <p>📊 {displayedContacts.length} contacto(s) encontrado(s)</p>
)}
```

### Ordenamiento Alfabético A-Z / Z-A

**Implementado en:** `src/pages/HomePage.jsx`

**Características:**
- ✅ Botón toggle con indicador visual "🔤 A-Z" / "🔤 Z-A"
- ✅ Texto descriptivo "(Ascendente)" / "(Descendente)"
- ✅ Ordenamiento usando `.localeCompare('es')` para español
- ✅ Respeta acentos, ñ y caracteres especiales
- ✅ Se aplica después de filtros (favoritos y búsqueda)
- ✅ Persistencia del orden en localStorage

**Estado:**
```javascript
const [sortOrder, setSortOrder] = useState(() => getSortOrder());
```

**Ordenamiento:**
```javascript
const displayedContacts = contactsWithFavorites
  .filter(/* filtros */)
  .sort((a, b) => {
    const comparison = a.fullname.localeCompare(b.fullname, 'es');
    return sortOrder === 'asc' ? comparison : -comparison;
  });
```

**Handler:**
```javascript
function toggleSortOrder() {
  setSortOrder(prev => {
    const newOrder = prev === 'asc' ? 'desc' : 'asc';
    saveSortOrder(newOrder);
    return newOrder;
  });
}
```

**Botón:**
```jsx
<button onClick={toggleSortOrder}>
  {sortOrder === 'asc' ? '🔤 A-Z' : '🔤 Z-A'}
  <span>{sortOrder === 'asc' ? '(Ascendente)' : '(Descendente)'}</span>
</button>
```

### Contador Dinámico y Estado Vacío

**Implementado en:** `src/pages/HomePage.jsx`

**Características:**
- ✅ Contador "📊 Mostrando X de Y contactos" con fondo verde
- ✅ Actualización automática al filtrar/buscar/ordenar
- ✅ Mensaje contextual cuando no hay resultados:
  - **Si buscaste:** "No hay contactos que coincidan con 'término'"
  - **Si filtraste favoritos:** "No tienes contactos marcados como favoritos"
  - **Si lista vacía:** "Aún no tienes contactos. ¡Agrega tu primer contacto arriba!"
- ✅ Botón "❌ Limpiar filtros" cuando hay búsqueda o filtro activo
- ✅ Limpia búsqueda y favoritos simultáneamente
- ✅ Actualiza localStorage al limpiar

**Contador:**
```jsx
<div style={{ backgroundColor: '#e8f5e9', textAlign: 'center' }}>
  📊 Mostrando {displayedContacts.length} de {contacts.length} contactos
</div>
```

**Mensaje vacío:**
```jsx
{displayedContacts.length === 0 && (
  <div style={{ backgroundColor: '#fff3cd', textAlign: 'center' }}>
    <h3>🔍 No se encontraron contactos</h3>
    <p>
      {searchQuery ? (
        <>No hay contactos que coincidan con "<strong>{searchQuery}</strong>"</>
      ) : showOnlyFavorites ? (
        <>No tienes contactos marcados como favoritos</>
      ) : (
        <>Aún no tienes contactos. ¡Agrega tu primer contacto arriba!</>
      )}
    </p>
    {(searchQuery || showOnlyFavorites) && (
      <button onClick={() => {
        setSearchQuery('');
        saveSearchQuery('');
        setShowOnlyFavorites(false);
      }}>
        ❌ Limpiar filtros
      </button>
    )}
  </div>
)}
```

### Persistencia de Preferencias en localStorage

**Archivo de utilidades:** `src/utils/storage.js`

**Keys utilizadas:**
- `agenda_favorites`: Array de IDs de contactos favoritos
- `agenda_search_query`: Último término de búsqueda
- `agenda_sort_order`: Preferencia de ordenamiento ('asc' o 'desc')

**Funciones disponibles:**
```javascript
// Favoritos
getFavorites() // Array<string>
saveFavorites(favoriteIds) // void
toggleFavorite(contactId) // Array<string>

// Búsqueda
getSearchQuery() // string
saveSearchQuery(query) // void

// Ordenamiento
getSortOrder() // 'asc' | 'desc'
saveSortOrder(order) // void
```

**Características:**
- ✅ Manejo de errores con try/catch en todas las operaciones
- ✅ Logging en consola para debug
- ✅ Valores por defecto seguros ([], '', 'asc')
- ✅ Restauración automática al montar componentes
- ✅ Guardado automático en cada cambio

**Inicialización en HomePage:**
```javascript
const [favoriteIds, setFavoriteIds] = useState([]);
const [searchQuery, setSearchQuery] = useState(() => getSearchQuery());
const [sortOrder, setSortOrder] = useState(() => getSortOrder());

useEffect(() => {
  setFavoriteIds(getFavorites());
  // ...resto del código
}, []);
```

### HomePage - Gestión Completa de Contactos

**Componente:** `src/pages/HomePage.jsx`

**Funcionalidades integradas:**
- ✅ Lista de contactos desde API con metadata
- ✅ Formulario de creación (ContactForm)
- ✅ Botón "✏️ Editar" en cada contacto
- ✅ Botón "🗑️ Eliminar" con confirmación
- ✅ Botón "⭐/☆ Favorito" con toggle
- ✅ Modal de edición (ContactEditForm)
- ✅ Modal de confirmación de eliminación
- ✅ Sistema de búsqueda en tiempo real
- ✅ Toggle de ordenamiento A-Z / Z-A
- ✅ Filtro de favoritos con checkbox
- ✅ Contador dinámico de contactos
- ✅ Mensaje de estado vacío contextual
- ✅ Persistencia de preferencias (favoritos, búsqueda, orden)
- ✅ Sistema de refresh con `refreshKey` para forzar re-renderizado
- ✅ Estadísticas del servicio con botón "Ver Estadísticas"
- ✅ Estados de carga y error
- ✅ Navegación a detalle con React Router Link

**Estados principales:**
```javascript
const [contacts, setContacts] = useState([]);
const [metadata, setMetadata] = useState(null);
const [stats, setStats] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [refreshKey, setRefreshKey] = useState(0);
const [editingContact, setEditingContact] = useState(null);
const [deletingContact, setDeletingContact] = useState(null);
const [isDeleting, setIsDeleting] = useState(false);
const [favoriteIds, setFavoriteIds] = useState([]);
const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
const [searchQuery, setSearchQuery] = useState(() => getSearchQuery());
const [sortOrder, setSortOrder] = useState(() => getSortOrder());
```

**Funciones clave:**
```javascript
// Crear contacto
function handleContactCreated(newContact) {
  setContacts(prev => [newContact, ...prev]);
  setMetadata(prev => ({ ...prev, totalContacts: prev.totalContacts + 1 }));
  setRefreshKey(prev => prev + 1);
}

// Seleccionar para editar
function handleContactSelect(contact) {
  setEditingContact(contact);
}

// Actualizar contacto
function handleContactUpdated(updatedContact) {
  setContacts(prev => prev.map(c => 
    c.id === updatedContact.id ? updatedContact : c
  ));
  setEditingContact(null);
  setRefreshKey(prev => prev + 1);
}

// Eliminar contacto
async function handleDeleteClick(contact) {
  setDeletingContact(contact);
}

async function confirmDelete() {
  if (!deletingContact) return;
  setIsDeleting(true);
  try {
    await contactService.deleteContact(deletingContact.id);
    setContacts(prev => prev.filter(c => c.id !== deletingContact.id));
    setDeletingContact(null);
    if (metadata) {
      setMetadata(prevMetadata => ({
        ...prevMetadata,
        totalContacts: prevMetadata.totalContacts - 1
      }));
    }
    setRefreshKey(prev => prev + 1);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsDeleting(false);
  }
}

function cancelDelete() {
  setDeletingContact(null);
}

// Toggle favorito
function handleToggleFavorite(contactId) {
  const newFavorites = toggleFavorite(contactId);
  setFavoriteIds(newFavorites);
}

// Cambiar orden
function toggleSortOrder() {
  setSortOrder(prev => {
    const newOrder = prev === 'asc' ? 'desc' : 'asc';
    saveSortOrder(newOrder);
    return newOrder;
  });
}
```

**Lógica de filtrado y ordenamiento:**
```javascript
// Combinar contactos con estado de favorito
const contactsWithFavorites = contacts.map(contact => ({
  ...contact,
  isFavorite: favoriteIds.includes(contact.id)
}));

// Filtrar y ordenar
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
```

### Sistema de Inicialización Asíncrona

El archivo `src/utils/initializer.js` proporciona:

1. **`initializeApp(duration)`**: Simula delay de inicialización (default 3000ms)
2. **`loadAppData()`**: Carga con 50% probabilidad de fallo (simulación)
3. **`loadAppDataWithRetry(maxRetries)`**: Auto-retry hasta 3 intentos con delay de 1s

### Manejo de Errores Centralizado

**`src/utils/errorHandler.js`** - Función `getErrorMessage(error)`:

```javascript
import { getErrorMessage } from './utils/errorHandler';

try {
  await contactService.fetchContacts();
} catch (error) {
  const userMessage = getErrorMessage(error);
  console.error(userMessage);
}
```

**Mensajes amigables:**
- Error de red → "No hay conexión a internet. Por favor, verifica tu red."
- Error 404 → "El recurso solicitado no existe."
- Error 405 → "Método no permitido por el servidor."
- Error 500 → "Error en el servidor. Intenta más tarde."
- Otros → Mensaje original del error

### Test del Servicio

Función `testService()` para verificar funcionamiento:

```javascript
import { contactService } from '../services/contactService';

async function testService() {
  try {
    const result = await contactService.fetchContacts();
    console.log('✅ Test exitoso:', result);
  } catch (error) {
    console.log('❌ Test fallido:', error);
  }
}
```

**Ubicación:** 
- `src/App.jsx` - Se ejecuta al inicializar
- `src/components/TestPage.jsx` - Con botón manual

### Splash Screen con Estados

En `src/App.jsx`:
- Estado `isInitializing` controla visualización
- Estado `loadError` captura errores de carga
- Botón de "Reintentar" si falla inicialización
- Transición suave con Framer Motion
- Ejecuta `testService()` automáticamente

## Estructura de Datos del API

```json
{
  "id": 16,
  "fullname": "Lopez Garcia",
  "phonenumber": "987-123-666",
  "email": "daniela.castro@despacho.pe",
  "type": "trabajo",
  "company": "Despacho Legal",
  "birthday": "1990-05-15"
}
```

**Campos requeridos:** `id`, `fullname`, `phonenumber`, `type`  
**Campos opcionales:** `email`, `company`, `birthday`

**Tipos de contacto disponibles:**
- `personal`
- `trabajo`
- `familia`
- `otro`

## Tecnologías

- **React 18** - Framework con Hooks (useState, useEffect)
- **Vite 5** - Build tool rápido con HMR
- **React Router v6** - Enrutamiento declarativo
- **Framer Motion** - Animaciones y transiciones
- **Fetch API** - Peticiones HTTP nativas
- **localStorage** - Persistencia del lado del cliente
- **ES6 Classes** - Patrón orientado a objetos para servicios

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo con HMR
npm run build        # Build optimizado para producción
npm run preview      # Preview del build de producción
npm run lint         # Linter ESLint con reglas de React
```

## Flujo de Inicialización

```
1. App.jsx monta → isInitializing = true
2. <SplashScreen /> muestra durante 3s (initializeApp)
3. loadAppDataWithRetry() intenta cargar datos (máx 3 intentos)
4. testService() verifica contactService.fetchContacts()
5. Si éxito → setIsInitializing(false) + log de estadísticas
6. Si fallo → setLoadError(message) + botón "Reintentar"
7. Fade-in del contenido principal con Framer Motion
8. HomePage carga favoritos desde localStorage
9. Restaura búsqueda y orden desde localStorage
```

## Flujo de Creación de Contacto

```
1. Usuario llena formulario en HomePage
2. Click en "💾 Guardar Contacto"
3. ContactForm valida campos con validateField()
4. Si hay errores y touched → Muestra mensajes rojos por campo
5. Si no hay errores:
   a. setIsSaving(true) → Botón muestra "⏳ Guardando..."
   b. await contactService.createContact(formData)
   c. API responde con contacto + id generado
   d. Formulario se limpia automáticamente
   e. Mensaje de éxito (verde) durante 3 segundos
   f. Callback onContactCreated actualiza lista en HomePage
   g. Nuevo contacto aparece al inicio de la lista
   h. Metadata actualiza totalContacts
   i. refreshKey incrementa para forzar re-render
```

## Flujo de Edición de Contacto

```
1. Usuario hace click en "✏️ Editar" de un contacto
2. handleContactSelect(contact) → setEditingContact(contact)
3. ContactEditForm se monta con overlay modal
4. useEffect pre-llena formulario con datos actuales
5. Usuario modifica campos deseados
6. Click en "💾 Guardar" o "Cancelar"
7. Si cancela → setEditingContact(null) → Modal se cierra
8. Si guarda:
   a. setIsSaving(true) → Botón "⏳ Guardando..."
   b. Simulación de 800ms (API no soporta PUT/PATCH - error 405)
   c. updatedContact = { ...contact, ...formData }
   d. onContactUpdated actualiza lista en HomePage usando map()
   e. setEditingContact(null) → Modal se cierra
   f. refreshKey incrementa → Lista se re-renderiza
9. Contacto actualizado se refleja inmediatamente en lista
```

## Flujo de Eliminación de Contacto

```
1. Usuario hace click en "🗑️ Eliminar" de un contacto
2. handleDeleteClick(contact) → setDeletingContact(contact)
3. Modal de confirmación se muestra con overlay
4. Usuario ve mensaje "¿Estás seguro de eliminar a [nombre]?"
5. Texto de advertencia: "Esta acción no se puede deshacer"
6. Usuario tiene dos opciones:
   a. Click en "Cancelar":
      - cancelDelete() → setDeletingContact(null)
      - Modal se cierra sin hacer nada
   b. Click en "🗑️ Eliminar":
      - confirmDelete() se ejecuta
      - setIsDeleting(true) → Botón muestra "⏳ Eliminando..."
      - await contactService.deleteContact(id)
      - Si éxito:
        * setContacts actualiza lista (filter)
        * setMetadata decrementa totalContacts
        * setRefreshKey incrementa
        * setDeletingContact(null) → Modal se cierra
      - Si error:
        * setError muestra mensaje de error
      - setIsDeleting(false)
7. Lista se actualiza automáticamente sin el contacto eliminado
8. Contador "Mostrando X de Y" se actualiza
```

## Flujo de Sistema de Favoritos

```
1. Usuario hace click en botón "☆" (favorito vacío) de un contacto
2. handleToggleFavorite(contactId) se ejecuta
3. toggleFavorite(contactId) en storage.js:
   a. getFavorites() obtiene array actual desde localStorage
   b. Verifica si contactId está en el array
   c. Si está → filter para quitar (desfavoritear)
   d. Si no está → spread para agregar (favoritear)
   e. saveFavorites(newArray) guarda en localStorage
   f. Retorna newArray actualizado
4. setFavoriteIds(newArray) actualiza estado
5. contactsWithFavorites se recalcula automáticamente
6. contact.isFavorite cambia a true
7. Botón cambia de "☆" a "⭐" (favorito lleno)
8. Si showOnlyFavorites está activo:
   - displayedContacts se filtra para mostrar solo ⭐
9. Contador "(X)" en toggle se actualiza
10. Al recargar página (F5):
    - useEffect ejecuta setFavoriteIds(getFavorites())
    - Favoritos se restauran desde localStorage
```

## Flujo de Búsqueda en Tiempo Real

```
1. Usuario escribe en input "🔍 Buscar contacto por nombre..."
2. onChange se dispara en cada tecla presionada
3. setSearchQuery(e.target.value) actualiza estado
4. saveSearchQuery(value) guarda en localStorage (key: 'agenda_search_query')
5. displayedContacts se recalcula automáticamente:
   a. contactsWithFavorites.filter se ejecuta
   b. Si searchQuery.trim() tiene valor:
      - Convierte query a lowercase
      - Convierte fullname de cada contacto a lowercase
      - Usa .includes() para verificar coincidencia
      - Si coincide → contacto se mantiene en array
      - Si no coincide → contacto se filtra
   c. También respeta filtro de favoritos (if showOnlyFavorites)
6. Lista se re-renderiza solo con contactos que coinciden
7. Contador muestra "📊 X contacto(s) encontrado(s)"
8. Si displayedContacts.length === 0:
   - Mensaje "No hay contactos que coincidan con 'término'"
   - Botón "❌ Limpiar filtros" aparece
9. Al recargar página:
   - useState(() => getSearchQuery()) restaura búsqueda
   - Input se pre-llena con último término buscado
```

## Flujo de Ordenamiento Alfabético

```
1. Usuario hace click en botón "🔤 A-Z" (o "🔤 Z-A")
2. toggleSortOrder() se ejecuta
3. setSortOrder calcula nuevo valor:
   - Si sortOrder === 'asc' → newOrder = 'desc'
   - Si sortOrder === 'desc' → newOrder = 'asc'
4. saveSortOrder(newOrder) guarda en localStorage (key: 'agenda_sort_order')
5. Botón actualiza texto visual:
   - Si 'asc' → "🔤 A-Z (Ascendente)"
   - Si 'desc' → "🔤 Z-A (Descendente)"
6. displayedContacts se recalcula automáticamente:
   a. Después de .filter, se aplica .sort()
   b. .localeCompare(b.fullname, 'es') compara strings
   c. Respeta acentos, ñ y mayúsculas/minúsculas
   d. Si sortOrder === 'asc' → orden normal (A-Z)
   e. Si sortOrder === 'desc' → invierte con -comparison (Z-A)
7. Lista se re-renderiza en nuevo orden
8. Orden persiste durante toda la sesión
9. Al recargar página:
   - useState(() => getSortOrder()) restaura orden
   - Botón muestra último orden guardado
```

## Logs en Consola

### Durante la inicialización:
```
🌐 Iniciando carga de contactos...
✅ 121 contactos cargados exitosamente
Tiempo de respuesta: 234ms
Total de requests realizados: 1
✅ Aplicación inicializada con datos
⭐ Favoritos guardados: 3
```

### Al crear un contacto:
```
🌐 Creando contacto...
Datos del formulario: { fullname: "...", phonenumber: "...", email: "...", type: "..." }
✅ Contacto creado: { id: 122, fullname: "...", ... }
Nuevo contacto creado: { id: 122, ... }
```

### Al editar un contacto (simulación local):
```
⚠️ API no soporta actualizaciones (405). Simulando cambio local...
✅ Contacto actualizado (solo localmente): { id: 16, fullname: "...", ... }
📝 Actualizando contacto en lista: { ... }
✅ Lista actualizada correctamente
```

### Al eliminar un contacto:
```
🗑️ Eliminando contacto: 16
✅ Contacto eliminado
```

### Al usar favoritos:
```
⭐ Favoritos guardados: 4
```

### Al guardar preferencias:
```
📋 Orden guardado: desc
```

## Manejo de Errores en Producción

El servicio diferencia entre:

1. **Errores de red** (`TypeError`):
   - Mensaje: "No se pudo conectar al servidor. Verifica tu conexión a internet."
   - Causa: Sin internet, CORS, DNS

2. **Errores HTTP** (404, 405, 500):
   - Mensaje: "Error al [operación]: [status] [statusText]"
   - Causa: Endpoint no existe, método no permitido, servidor caído

3. **Errores de validación** (400):
   - Mensaje original del servidor
   - Causa: Datos inválidos o incompletos

4. **Errores de parsing**:
   - Mensaje original del error
   - Causa: JSON inválido, respuesta corrupta

5. **Errores de localStorage**:
   - Logging en consola
   - Valores por defecto seguros
   - No interrumpe la aplicación

## Limitaciones Conocidas

### API Mock (entermocks.vercel.app)

| Operación | Método HTTP | ¿Funciona? | Persistencia | Notas |
|-----------|-------------|------------|--------------|-------|
| **Listar contactos** | GET | ✅ Sí | N/A | Retorna ~121 contactos |
| **Crear contacto** | POST | ✅ Sí | ✅ Persiste | El contacto se guarda realmente |
| **Actualizar contacto** | PUT/PATCH | ❌ No | N/A | Error 405 Method Not Allowed |
| **Eliminar contacto** | DELETE | ✅ Probablemente | ✅ Probablemente | Implementado en código |

**Solución implementada para actualización:**
- Los cambios se aplican localmente usando `Array.map()`
- Persisten solo durante la sesión del navegador
- Al recargar (F5), vuelven los datos originales de la API
- El método `updateContact` en `contactService.js` está implementado para futuras APIs reales

**Solución implementada para favoritos:**
- Los favoritos se guardan en localStorage del navegador
- Persisten entre recargas de página
- Son locales a cada navegador/dispositivo
- No se sincronizan con el servidor

## Próximos Pasos

- [ ] **Validación mejorada en edición** con `onBlur` igual que en creación
- [ ] **Debounce en búsqueda** para optimizar rendimiento (esperar 300ms)
- [ ] **Filtros avanzados** por tipo de contacto (personal, trabajo, familia)
- [ ] **Paginación** para listas grandes (10-20 contactos por página)
- [ ] **Context API** para estado global de contactos y evitar prop drilling
- [ ] **React Query** para cache, sincronización y mutaciones optimistas
- [ ] **Unit tests** con Vitest + Testing Library (componentes, utils, servicios)
- [ ] **Integration tests** para flujos completos CRUD
- [ ] **Optimistic UI updates** para mejor UX en operaciones lentas
- [ ] **Skeleton loaders** en lugar de spinners simples
- [ ] **Toast notifications** con biblioteca como react-hot-toast
- [ ] **Dark mode** con preferencia del sistema y toggle manual
- [ ] **PWA** con service workers y soporte offline
- [ ] **Exportar/Importar** contactos en JSON o CSV
- [ ] **Búsqueda avanzada** por email, teléfono, tipo
- [ ] **Ordenamiento múltiple** por varios campos (nombre, fecha, tipo)
- [ ] **Sincronización en la nube** cuando la API lo soporte
- [ ] **Etiquetas personalizadas** además de tipos predefinidos

## Recursos y Referencias

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [localStorage MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Array.prototype.localeCompare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)

---

**Autor:** Reynaldo AB  
**Versión:** 2.0.0  
**Laboratorio:** Lab 08 - CRUD Operations con React + Funcionalidades Avanzadas  
**Fecha:** Enero 2026  
**Repositorio:** [GitHub](https://github.com/ReynaldoAB/contact-manager)

## Licencia

Este proyecto es de código abierto para fines educativos.