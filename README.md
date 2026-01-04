# Contact Manager (React + Vite)

Este es un proyecto de gestión de contactos construido con **React 18** y **Vite 5**, que incluye funcionalidades de enrutamiento, animaciones, integración con API REST y manejo de estados asíncronos.

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
- 🚧 Agregar nuevo contacto (pendiente)
- 🚧 Eliminar contacto con confirmación (pendiente)
- 🚧 Alternar favorito (isFavorite) (pendiente)

## Estructura del Proyecto

```
contact-manager/
├── src/
│   ├── components/
│   │   ├── SplashScreen.jsx       # Pantalla de carga inicial (3s)
│   │   ├── ContactList.jsx        # Lista reutilizable de contactos
│   │   ├── ContactCard.jsx        # Tarjeta individual de contacto
│   │   ├── Header.jsx             # Encabezado de la aplicación
│   │   ├── Navbar.jsx             # Barra de navegación
│   │   └── TestPage.jsx           # Página de pruebas del servicio
│   ├── pages/
│   │   ├── HomePage.jsx           # Lista de contactos desde API
│   │   ├── AboutPage.jsx          # Página "Acerca de"
│   │   ├── ContactDetailPage.jsx  # Detalle con navegación
│   │   └── NotFoundPage.jsx       # Página 404
│   ├── services/
│   │   └── contactService.js      # Servicio de API con clase ContactService
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

### ContactService - Servicio de API

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
- ✅ Manejo de errores HTTP (404, 500, etc.)
- ✅ Detección de errores de red
- ✅ Headers configurables
- ✅ Metadata enriquecida en respuestas

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
- Error 500 → "Error en el servidor. Intenta más tarde."
- Otros → Mensaje original del error

### Test del Servicio

Función `testService()` para verificar funcionamiento:

```javascript
import { contactService } from '../services/contactService';

async function testService() {
  try {
    const contacts = await contactService.fetchContacts();
    console.log('Test exitoso:', contacts);
  } catch (error) {
    console.log('Test fallido:', error);
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

**Campos requeridos:** `id`, `fullname`, `phonenumber`, `email`, `type`

## Tecnologías

- **React 18** - Framework con Hooks
- **Vite 5** - Build tool rápido
- **React Router v6** - Enrutamiento
- **Framer Motion** - Animaciones
- **Fetch API** - Peticiones HTTP
- **ES6 Classes** - Patrón orientado a objetos

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linter ESLint
```

## Flujo de Inicialización

```
1. App.jsx monta → isInitializing = true
2. <SplashScreen /> muestra durante 3s (initializeApp)
3. loadAppDataWithRetry() intenta cargar datos (máx 3 intentos)
4. testService() verifica contactService.fetchContacts()
5. Si éxito → setIsInitializing(false) + log de estadísticas
6. Si fallo → setLoadError(message) + botón "Reintentar"
7. Fade-in del contenido principal
```

## Logs en Consola

Durante la inicialización verás:

```
🌐 Iniciando carga de contactos...
✅ 121 contactos cargados exitosamente
Total de requests realizados: 1
Test exitoso: { contacts: [...], metadata: {...} }
✅ Aplicación inicializada con datos
```

## Manejo de Errores en Producción

El servicio diferencia entre:

1. **Errores de red** (`TypeError`):
   - Mensaje: "No se pudo conectar al servidor"
   - Causa: Sin internet, CORS, DNS

2. **Errores HTTP** (404, 500):
   - Mensaje: "Error del servidor: [status] [statusText]"
   - Causa: Endpoint no existe, servidor caído

3. **Errores de parsing**:
   - Mensaje original del error
   - Causa: JSON inválido, respuesta corrupta

## Próximos Pasos

- [ ] Agregar/Editar/Eliminar contactos (POST, PUT, DELETE)
- [ ] Sistema de favoritos con persistencia
- [ ] Búsqueda y filtros avanzados
- [ ] Context API para estado global
- [ ] Unit tests con Vitest
- [ ] Optimistic UI updates
- [ ] Cache de requests

---

**Autor:** Reynaldo AB  
**Versión:** 1.1.0  
**Laboratorio:** Lab 05 - Asincronismo y Promesas  
**Fecha:** Enero 2026