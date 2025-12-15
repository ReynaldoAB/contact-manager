# Contact Manager (React + Vite)

Aplicación de ejemplo con React + Vite para administrar contactos: agregar, eliminar, limpiar todo, alternar favoritos, rutas (Home, About, Contact Detail) y animaciones de transición.

## Características

- ✅ **Pantalla de carga (Splash Screen):** 3 segundos al iniciar la aplicación con animación
- ✅ **Integración con API REST:** Obtiene contactos desde backend de forma asíncrona
- ✅ **Listado de contactos:** Muestra fullname, phonenumber, email, type
- ✅ **Detalle de contacto:** Vista individual con recuadro estilizado y navegación prev/next
- ✅ **Rutas:** Home (/), About (/about), Contact detail (/contact/:id)
- ✅ **Animaciones:** Transiciones suaves entre splash y contenido principal
- ✅ **Navegación entre contactos:** Botones "Anterior" y "Siguiente" en detalle
- ✅ **Validación de datos:** Manejo de estados de carga y errores
- 🚧 Agregar nuevo contacto (pendiente)
- 🚧 Eliminar contacto con confirmación (pendiente)
- 🚧 Alternar favorito (isFavorite) (pendiente)

## Estructura del Proyecto

```
contact-manager/
├── src/
│   ├── components/
│   │   └── SplashScreen.jsx      # Pantalla de carga inicial (3s) con spinner
│   ├── pages/
│   │   ├── HomePage.jsx           # Lista de contactos desde API REST
│   │   ├── AboutPage.jsx          # Página "Acerca de"
│   │   └── ContactDetailPage.jsx  # Detalle con recuadro y navegación
│   ├── App.jsx                    # Configuración de rutas, splash y animaciones
│   └── main.jsx
├── .env                           # Variables de entorno (no subir a git)
├── .env.example                   # Plantilla de variables de entorno
├── .gitignore                     # Archivos ignorados por git
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
  "company": "",
  "birthday": null
}
```

**Campos requeridos:** `id`, `fullname`, `phonenumber`, `email`, `type`  
**Campos opcionales:** `company`, `birthday`

## Funcionalidades Implementadas

### Splash Screen (3 segundos)
- Se muestra al cargar la aplicación usando `isInitializing` state
- Animación de spinner rotatorio
- Transición suave (fade-in/slide-up) al contenido principal
- Renderizado condicional: `{isInitializing && <SplashScreen />}`

### Página de Inicio (HomePage)
- Obtiene contactos desde `VITE_API_URL` con `fetch()` y `async/await`
- Muestra lista de contactos con: fullname, phonenumber, email, type
- Tarjetas con borde, sombra y hover effect
- Link a detalle de cada contacto (`/contact/:id`)
- Manejo de errores en consola

### Detalle de Contacto (ContactDetailPage)
- **Obtención de datos:** Fetch de todos los contactos y búsqueda por ID
- **Recuadro estilizado:** Borde redondeado, sombra, fondo claro
- **Información completa:** fullname, phonenumber, email, type, company, birthday
- **Navegación:** Botones "Anterior" y "Siguiente" con estados disabled
- **Link "Volver":** Regresa a la lista de contactos
- **Estados de carga:** "Cargando..." y "Contacto no encontrado"

### Validaciones y Manejo de Errores
- Validación de `API_URL` antes de hacer fetch
- Manejo de errores HTTP con `response.ok`
- Estados de carga (`loading`) en detalle de contacto
- Logs en consola para debugging

## Tecnologías

- **React 18** - Framework UI con Hooks (useState, useEffect)
- **Vite** - Build tool y dev server rápido
- **React Router v6** - Enrutamiento (BrowserRouter, Routes, Route, Link, useParams, useNavigate)
- **CSS in JS** - Estilos inline para componentes
- **Fetch API** - Peticiones HTTP asíncronas
- **Tailwind CSS** - Utility classes (configurado)

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linter ESLint
```

## Flujo de la Aplicación

1. **Inicio:** App.jsx muestra SplashScreen durante 3s (`isInitializing`)
2. **Transición:** Fade-in al contenido principal cuando `!isInitializing`
3. **HomePage:** Fetch de contactos desde API y renderizado de lista
4. **Click en contacto:** Navegación a `/contact/:id`
5. **ContactDetailPage:** Fetch de todos los contactos, búsqueda por ID, renderizado de detalle
6. **Navegación:** Botones prev/next actualizan la URL y re-fetch del contacto

## Próximos Pasos

1. Implementar formulario para agregar/editar contactos (POST/PUT)
2. Agregar función de eliminar contacto con confirmación modal (DELETE)
3. Sistema de favoritos (toggle `isFavorite` field)
4. Botón "Limpiar todo" con confirmación
5. Búsqueda y filtros de contactos (por nombre, tipo)
6. Paginación o scroll infinito
7. Modo oscuro con tema persistente
8. Animaciones con Framer Motion

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
```

Usa `.env.example` como plantilla para otros desarrolladores:

```env
VITE_API_URL=http://localhost:4000/contacts
```

## Testing en Navegador

### Verificar Splash Screen (3s)
1. Abre `http://localhost:5173`
2. Debe mostrar spinner durante ~3 segundos
3. Transición suave al contenido principal

### Verificar Fetch de Contactos
1. Abre DevTools → Console (F12)
2. Busca: `"API_URL: http://localhost:4000/contacts"`
3. Busca: `"Contactos obtenidos: [{...}, {...}]"`
4. Si hay error, verifica que el backend esté corriendo

### Verificar Navegación
1. Click en cualquier contacto
2. Debe mostrar detalle con recuadro
3. Botones "Anterior"/"Siguiente" deben navegar
4. "Volver a Home" debe regresar a la lista

## Template Base

Este proyecto usa el template oficial de Vite:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) con Babel para Fast Refresh
- ESLint configurado con reglas básicas

---

**Autor:** Reynaldo AB  
**Fecha:** Diciembre 2024  
**Laboratorio:** Lab 05 - Asincronismo y Promesas