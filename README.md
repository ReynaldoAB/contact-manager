# Contact Manager (React + Vite)

Aplicación de ejemplo con React + Vite para administrar contactos: agregar, eliminar, limpiar todo, alternar favoritos, rutas (Home, About, Contact Detail) y animaciones de transición.

## Características

- ✅ **Pantalla de carga (Splash Screen):** 3 segundos al iniciar la aplicación con animación
- ✅ **Integración con API REST:** Obtiene contactos desde backend de forma asíncrona
- ✅ **Listado de contactos:** Muestra fullname, phonenumber, email, type
- ✅ **Detalle de contacto:** Vista individual con recuadro estilizado y navegación prev/next
- ✅ **Rutas:** Home (/), About (/about), Contact detail (/contact/:id)
- ✅ **Animaciones:** Transiciones suaves con Framer Motion entre páginas y splash
- ✅ **Navegación entre contactos:** Botones "Anterior" y "Siguiente" en detalle
- ✅ **Validación de datos:** Manejo de estados de carga y errores
- ✅ **Componente ContactList:** Reutilizable para renderizar lista de contactos
- 🚧 Agregar nuevo contacto (pendiente)
- 🚧 Eliminar contacto con confirmación (pendiente)
- 🚧 Alternar favorito (isFavorite) (pendiente)

## Estructura del Proyecto

```
contact-manager/
├── src/
│   ├── components/
│   │   ├── SplashScreen.jsx       # Pantalla de carga inicial (3s) con spinner
│   │   ├── ContactList.jsx        # Componente reutilizable para lista de contactos
│   │   └── Navbar.jsx             # Barra de navegación
│   ├── pages/
│   │   ├── HomePage.jsx           # Lista de contactos desde API REST
│   │   ├── AboutPage.jsx          # Página "Acerca de"
│   │   ├── ContactDetailPage.jsx  # Detalle con recuadro y navegación
│   │   └── NotFoundPage.jsx       # Página 404
│   ├── App.jsx                    # Configuración de rutas, splash y animaciones
│   └── main.jsx                   # Entry point
├── .env                           # Variables de entorno (no subir a git)
├── .env.example                   # Plantilla de variables de entorno
├── .gitignore                     # Archivos ignorados por git
├── package.json                   # Dependencias y scripts
└── README.md
```

## Configuración

### 1. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:4000/contacts
```

**Nota:** Todas las variables de entorno para el cliente deben empezar con `VITE_` para que Vite las exponga.

### 2. Instalación

```bash
npm install
```

### 3. Desarrollo

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173` (o el puerto disponible).

### 4. Verificar Splash Screen

Al iniciar la aplicación, deberías ver:
1. Pantalla de carga con spinner durante 3 segundos
2. Transición suave (fade-in) al contenido principal
3. Mensajes en consola: `"API_URL: ..."` y `"Contactos obtenidos: [...]"`

## Estructura de Datos del API

Los contactos deben tener la siguiente estructura:

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
**Campos opcionales:** `company`, `birthday`

## Funcionalidades Implementadas

### Splash Screen (3 segundos)
- Estado `isInitializing` controla la visualización
- Renderizado condicional: `{isInitializing && <SplashScreen isLoading={isInitializing} />}`
- Contenido principal solo se muestra cuando `!isInitializing`
- Animación de spinner rotatorio CSS
- Transición suave (fade-in) con Framer Motion al contenido principal
- Timer de 3000ms con `setTimeout` y cleanup con `clearTimeout`

### Página de Inicio (HomePage)
- Obtiene contactos desde `VITE_API_URL` con `fetch()` y `async/await`
- Estado `contacts` almacena los datos obtenidos con `useState`
- `useEffect` con dependencia vacía `[]` ejecuta fetch al montar el componente
- Muestra lista de contactos con: fullname, phonenumber, email
- Tarjetas con borde, sombra y hover effect
- Link a detalle de cada contacto (`/contact/:id`)
- Manejo de errores en consola con `try/catch`
- Validación de `API_URL` antes de hacer fetch

### Detalle de Contacto (ContactDetailPage)
- **Obtención de datos:** 
  - Fetch de todos los contactos desde API
  - Búsqueda por ID con `find()` método
  - Estados: `contact`, `allContacts`, `loading`
- **Recuadro estilizado:** 
  - Borde redondeado (`borderRadius: '12px'`)
  - Sombra suave (`boxShadow: '0 2px 8px rgba(0,0,0,0.1)'`)
  - Fondo claro (`backgroundColor: '#f9f9f9'`)
  - Padding y margin consistentes
- **Información completa:** 
  - fullname, phonenumber, email (siempre)
  - type, company, birthday (condicional si existen)
  - Emojis para mejor UX (📱 ✉️ 🏷️ 🏢 🎂)
- **Navegación:** 
  - Botones "Anterior" y "Siguiente" con `useNavigate()`
  - Estados `disabled` cuando no hay más contactos
  - Estilos dinámicos según estado enabled/disabled
  - Encuentra índice con `findIndex()`
- **Link "Volver":** 
  - Regresa a la lista de contactos con `<Link to="/">`
  - Estilo con flecha `←` y color azul
- **Estados de carga:** 
  - "Cargando..." mientras `loading === true`
  - "Contacto no encontrado" si `contact === null`

### Componente ContactList (Reutilizable)
- Recibe array de `contacts` como prop
- Renderiza lista con `map()` y `key={contact.id}`
- Tarjetas estilizadas consistentes
- Links a detalle individual
- Preparado para agregar funcionalidad de favoritos y eliminación

### Validaciones y Manejo de Errores
- Validación de `API_URL` antes de hacer fetch
- Validación de `response.ok` para errores HTTP
- Estados de carga (`loading`) en detalle de contacto
- Logs en consola para debugging (`console.log`, `console.error`)
- Renderizado condicional de campos opcionales
- Manejo de arrays vacíos

### Animaciones con Framer Motion
- **Splash → Main:** Fade-in del contenido principal (`initial={{ opacity: 0 }}`)
- **PageWrapper:** Fade-in y slide-up en cada cambio de página
- **AnimatePresence:** Transiciones suaves entre rutas con `mode="wait"`
- **Duración:** 250-500ms para UX óptima

## Tecnologías

- **React 18** - Framework UI con Hooks (useState, useEffect)
- **Vite 5** - Build tool y dev server rápido
- **React Router v6** - Enrutamiento (BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation)
- **Framer Motion** - Animaciones fluidas (motion, AnimatePresence)
- **CSS in JS** - Estilos inline para componentes
- **Fetch API** - Peticiones HTTP asíncronas
- **Tailwind CSS** - Utility classes (configurado)

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo con HMR
npm run build        # Build para producción
npm run preview      # Preview del build de producción
npm run lint         # Linter ESLint
```

## Flujo de la Aplicación

### Inicio de la Aplicación
```
1. App.jsx renderiza
2. isInitializing = true
3. <SplashScreen /> se muestra 3 segundos
4. setTimeout cambia isInitializing = false
5. SplashScreen desaparece
6. Contenido principal hace fade-in con Framer Motion
7. BrowserRouter activa y renderiza HomePage
```

### Carga de Contactos (HomePage)
```
1. HomePage monta (useEffect ejecuta)
2. fetch(API_URL) obtiene datos
3. setContacts(data) actualiza estado
4. Re-render con contacts.map()
5. Cada contacto renderiza como tarjeta con Link
```

### Navegación a Detalle
```
1. Click en contacto → navigate('/contact/:id')
2. ContactDetailPage monta
3. useParams() extrae id de URL
4. fetch(API_URL) obtiene todos los contactos
5. find() busca contacto por id
6. setContact(data) actualiza estado
7. Renderiza recuadro con información completa
8. Botones prev/next navegan con navigate()
```

### Transiciones de Página
```
1. useLocation() detecta cambio de ruta
2. AnimatePresence inicia animación de salida
3. PageWrapper con motion.div hace fade-out
4. Nueva página hace fade-in y slide-up
5. Duración total: ~250ms
```

## Próximos Pasos (Roadmap)

### Funcionalidades Pendientes
1. **Agregar contacto:** Formulario con validación (POST)
2. **Editar contacto:** Formulario pre-llenado (PUT)
3. **Eliminar contacto:** Modal de confirmación (DELETE)
4. **Favoritos:** Toggle isFavorite con icono ⭐
5. **Limpiar todo:** Botón con confirmación modal
6. **Búsqueda:** Input para filtrar por nombre/email
7. **Filtros:** Dropdown para filtrar por tipo (trabajo/personal)
8. **Paginación:** Mostrar 10 contactos por página
9. **Ordenamiento:** Alfabético, por fecha, por favoritos

### Mejoras Técnicas
- [ ] Context API para estado global de contactos
- [ ] Custom hooks (useContacts, useFetch)
- [ ] Error boundaries para manejo de errores
- [ ] Loading skeletons en lugar de texto "Cargando..."
- [ ] Optimistic UI updates
- [ ] Service worker para offline support
- [ ] Unit tests con Vitest
- [ ] E2E tests con Playwright

### Mejoras de UX/UI
- [ ] Modo oscuro persistente (localStorage)
- [ ] Responsive design para móviles
- [ ] Skeleton loaders animados
- [ ] Toast notifications (éxito/error)
- [ ] Drag & drop para reordenar
- [ ] Animaciones de micro-interacciones
- [ ] Avatar con iniciales o foto

## Configuración de Git

Asegúrate de que `.env` esté en `.gitignore`:

```gitignore
# local env files
.env
.env.local
.env.*.local

# dependencies
node_modules

# build output
dist
dist-ssr
*.local

# Editor directories
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
```

### Archivo `.env.example`

```env
# API REST backend URL
VITE_API_URL=http://localhost:4000/contacts

# Opcional: configurar puerto de dev server
# VITE_PORT=5173
```

## Testing en Navegador

### 1. Verificar Splash Screen (3s)
```
✓ Abre http://localhost:5173
✓ Debe mostrar spinner durante ~3 segundos
✓ Transición suave (fade-in) al contenido principal
✓ No debe haber "flash" de contenido antes del splash
```

### 2. Verificar Fetch de Contactos
```
✓ Abre DevTools → Console (F12)
✓ Busca: "API_URL: http://localhost:4000/contacts"
✓ Busca: "Contactos obtenidos: [{...}, {...}]"
✓ Si hay error, verifica que el backend esté corriendo
✓ Contactos deben renderizarse en tarjetas
```

### 3. Verificar Navegación a Detalle
```
✓ Click en cualquier contacto
✓ URL debe cambiar a /contact/:id
✓ Debe mostrar recuadro con información completa
✓ Botones "Anterior"/"Siguiente" deben navegar
✓ Botón "Anterior" debe estar disabled en primer contacto
✓ Botón "Siguiente" debe estar disabled en último contacto
✓ "Volver" debe regresar a la lista (/)
```

### 4. Verificar Animaciones
```
✓ Navegación entre páginas debe tener fade-in/slide-up
✓ Splash → Main debe tener fade-in suave
✓ Duración aproximada: 250-500ms
✓ No debe haber "saltos" o contenido cortado
```

### 5. Verificar Estados de Error
```
✓ Detén el backend → debería mostrar error en consola
✓ Navega a /contact/99999 → "Contacto no encontrado"
✓ Carga inicial sin API_URL → warning en consola
```

## Solución de Problemas

### Error: "Contacto no encontrado"
- Verifica que el `id` en la URL exista en la base de datos
- Revisa que el backend esté corriendo en `http://localhost:4000`
- Chequea la consola para errores de fetch

### Error: `<!doctype...` is not valid JSON
- Problema: usas comillas simples `'${API_URL}'` en lugar de backticks
- Solución: usa `fetch(API_URL)` o `fetch(\`${API_URL}\`)`

### Splash no se muestra
- Verifica que `isInitializing` inicie como `true`
- Chequea que el `useEffect` con `setTimeout` esté correctamente configurado
- Revisa que `<SplashScreen />` esté importado

### Contactos no se muestran
- Verifica que `.env` tenga `VITE_API_URL` configurado
- Reinicia el servidor dev después de cambiar `.env`
- Chequea la consola para errores de fetch
- Verifica que el backend responda en la URL configurada

## Template Base

Este proyecto usa el template oficial de Vite:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) con Babel Fast Refresh
- ESLint configurado con reglas recomendadas de React
- Hot Module Replacement (HMR) para desarrollo rápido

## Dependencias Principales

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.x",
  "framer-motion": "^11.x"
}
```

---

**Autor:** Reynaldo AB  
**Fecha:** Diciembre 2024  
**Curso:** Desarrollo Web Frontend  
**Laboratorio:** Lab 05 - Asincronismo y Promesas  
**Versión:** 1.0.0