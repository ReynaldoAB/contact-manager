# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

 Contact Manager (React + Vite)

Aplicación de ejemplo con React + Vite para administrar contactos: agregar, eliminar, limpiar todo, alternar favoritos, rutas (Home, About, Contact Detail) y animaciones de transición.

## Características
- Agregar nuevo contacto.
- Eliminar contacto con confirmación y botón "Limpiar todo".
- Alternar favorito (isFavorite) desde cada tarjeta.
- Mostrar recuento de favoritos / total con singular/plural correcto.
- Contacto destacado: última tarjeta seleccionada.
- Navegación: Home (/), About (/about), Contact detail (/contact/:id).
- Botones "Anterior" / "Siguiente" en detalle de contacto.
- Animaciones en transición de páginas (framer-motion o CSS).
- NavLink con estilo para link activo.

## Requisitos
- Node.js 16+ (o versión compatible con Vite)
- npm / yarn / pnpm

## Instalación y ejecución
1. Instala dependencias:
   npm install

2. Ejecutar en modo desarrollo:
   npm run dev

3. Build de producción:
   npm run build

4. Previsualizar build (si está configurado):
   npm run preview

## Estructura principal
- src/App.jsx — Rutas, animaciones y estado principal.
- src/main.jsx — Punto de entrada (BrowserRouter).
- src/pages/HomePage.jsx — Lista de contactos.
- src/pages/AboutPage.jsx — Página About.
- src/pages/ContactDetailPage.jsx — Página detalle (prev/next).
- src/pages/NotFoundPage.jsx — 404 con redirección.
- src/components/Navbar.jsx — Navegación con NavLink.
- src/components/ContactList.jsx — Lista de tarjetas.
- src/components/ContactCard.jsx — Tarjeta de contacto.

## Notas de desarrollo
- Si usas framer-motion, instala:
  npm install framer-motion
- Para animaciones CSS con react-transition-group:
  npm install react-transition-group

- Si faltan imports (react-router-dom o framer-motion), instala:
  npm install react-router-dom

- Mantén las props y nombres consistentes: `contacts`, `onDeleteContact`, `onToggleFavorite`, `onSelectContact`.

## Docker (opcional)
Ejemplo Dockerfile para producción:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
```

## Contribuir
- Crea una rama desde `main`, realiza cambios, PR y descripción clara.
- Ejemplo:
  git checkout -b lab03-usestate
  git add .
  git commit -m "feat: ... "
  git push -u origin lab03-usestate

## Licencia
Licencia según el repositorio (agrega tu licencia si aplica).
