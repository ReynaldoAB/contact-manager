# Contact Manager (React + Vite)

Este es un proyecto de gestión de contactos construido con **React 18** y **Vite 5**, que incluye funcionalidades de enrutamiento, animaciones, integración con API REST y manejo de estados asíncronos con operaciones CRUD.

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
- ✅ **Editar contacto:** Modal de edición con actualización en tiempo real (simulación local)
- ✅ **Refresh automático:** Sistema de keys para forzar re-renderizado de listas
- 🚧 **Eliminar contacto con confirmación** (pendiente)
- 🚧 **Alternar favorito (isFavorite)** (pendiente)

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
│   │   ├── HomePage.jsx           # Lista + formulario + edición
│   │   ├── AboutPage.jsx          # Página "Acerca de"
│   │   ├── ContactDetailPage.jsx  # Detalle con navegación
│   │   └── NotFoundPage.jsx       # Página 404
│   ├── services/
│   │   └── contactService.js      # Servicio de API con CRUD completo
│   ├── utils/
│   │   ├── errorHandler.js        # getErrorMessage() - Manejo de errores
│   │   └── initializer.js         # Funciones de inicialización con promesas
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

### ContactService - Servicio de API (CRUD)

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
- ✅ Preparado para PUT/PATCH (actualizar - limitado por API actual)

### ContactForm - Crear Nuevos Contactos

**Componente:** `src/components/ContactForm.jsx`

**Características:**
- ✅ Campos: Nombre completo*, Teléfono*, Email, Tipo de contacto*
- ✅ Validación HTML5 (required, type="email", type="tel")
- ✅ Estado de carga (`isSaving`) con feedback visual
- ✅ Mensajes de éxito/error con estilos diferenciados
- ✅ Limpieza automática del formulario tras éxito
- ✅ Integración con API usando `contactService.createContact()`
- ✅ Callback `onContactCreated` para actualizar lista padre
- ✅ Inputs deshabilitados durante guardado

**Estados:**
```javascript
const [formData, setFormData] = useState({
  fullname: '',
  phonenumber: '',
  email: '',
  type: 'personal' // Valor por defecto
});
const [isSaving, setIsSaving] = useState(false);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(false);
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

### HomePage - Gestión Completa de Contactos

**Componente:** `src/pages/HomePage.jsx`

**Funcionalidades integradas:**
- ✅ Lista de contactos desde API con metadata
- ✅ Formulario de creación (ContactForm)
- ✅ Botón "✏️ Editar" en cada contacto
- ✅ Modal de edición (ContactEditForm)
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
```

**Funciones clave:**
```javascript
// Manejar creación de contacto
function handleContactCreated(newContact) {
  setContacts(prev => [newContact, ...prev]); // Agregar al inicio
  setMetadata(prev => ({ ...prev, totalContacts: prev.totalContacts + 1 }));
  setRefreshKey(prev => prev + 1); // Forzar refresh
}

// Manejar selección para editar
function handleContactSelect(contact) {
  setEditingContact(contact);
}

// Manejar actualización
function handleContactUpdated(updatedContact) {
  setContacts(prev => prev.map(c => 
    c.id === updatedContact.id ? updatedContact : c
  ));
  setEditingContact(null);
  setRefreshKey(prev => prev + 1);
}
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
```

## Flujo de Creación de Contacto

```
1. Usuario llena formulario en HomePage
2. Click en "💾 Guardar Contacto"
3. ContactForm valida campos requeridos (HTML5)
4. setIsSaving(true) → Botón muestra "⏳ Guardando..."
5. await contactService.createContact(formData)
6. API responde con contacto + id generado
7. Formulario se limpia automáticamente
8. Mensaje de éxito (verde) durante 3 segundos
9. Callback onContactCreated actualiza lista en HomePage
10. Nuevo contacto aparece al inicio de la lista
11. Metadata actualiza totalContacts
12. refreshKey incrementa para forzar re-render
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

## Logs en Consola

### Durante la inicialización:
```
🌐 Iniciando carga de contactos...
✅ 121 contactos cargados exitosamente
Tiempo de respuesta: 234ms
Total de requests realizados: 1
✅ Aplicación inicializada con datos
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

## Limitaciones Conocidas

### API Mock (entermocks.vercel.app)

| Operación | Método HTTP | ¿Funciona? | Persistencia | Notas |
|-----------|-------------|------------|--------------|-------|
| **Listar contactos** | GET | ✅ Sí | N/A | Retorna ~121 contactos |
| **Crear contacto** | POST | ✅ Sí | ✅ Persiste | El contacto se guarda realmente |
| **Actualizar contacto** | PUT/PATCH | ❌ No | N/A | Error 405 Method Not Allowed |
| **Eliminar contacto** | DELETE | ❓ No probado | N/A | Probablemente error 405 |

**Solución implementada para actualización:**
- Los cambios se aplican localmente usando `Array.map()`
- Persisten solo durante la sesión del navegador
- Al recargar (F5), vuelven los datos originales de la API
- El método `updateContact` en `contactService.js` está implementado para futuras APIs reales

## Próximos Pasos

- [ ] **Eliminar contacto con confirmación modal** (POST, PUT, DELETE)
- [ ] **Sistema de favoritos** con toggle y persistencia
- [ ] **Búsqueda en tiempo real** con debounce
- [ ] **Filtros avanzados** por tipo, nombre, etc.
- [ ] **Context API** para estado global de contactos
- [ ] **React Query** para cache y sincronización
- [ ] **Unit tests** con Vitest + Testing Library
- [ ] **Optimistic UI updates** para mejor UX
- [ ] **Pagination** para listas grandes
- [ ] **Dark mode** con preferencia del sistema
- [ ] **PWA** con service workers y offline support

## Recursos y Referencias

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

**Autor:** Reynaldo AB  
**Versión:** 1.2.0  
**Laboratorio:** Lab 08 - CRUD Operations con React  
**Fecha:** Enero 2026  
**Repositorio:** [GitHub](https://github.com/ReynaldoAB/contact-manager)

## Licencia

Este proyecto es de código abierto para fines educativos.