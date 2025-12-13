# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Contact Manager

Aplicación React simple para administrar contactos: agregar, eliminar, limpiar todo, alternar favoritos y seleccionar un contacto destacado.

## Requisitos
- Node.js 16+ (o la versión compatible con Vite)

## Instalación
1. Instala dependencias:
   npm install

2. Levanta la app en desarrollo:
   npm run dev

3. Construir para producción:
   npm run build

## Scripts comunes
- npm run dev — Inicia server de desarrollo
- npm run build — Genera build de producción
- npm run preview — Visualiza build localmente (si está configurado)

## Características
- Agregar contacto
- Eliminar contacto con confirmación
- Limpiar todos los contactos con confirmación
- Alternar favorito (isFavorite)
- Mostrar recuento de favoritos y total (singular/plural correcto)
- Contacto destacado: muestra el último contacto seleccionado
- Botones para eliminar y alternar favorito dentro de la tarjeta

## Estructura y props principales
- src/App.jsx
  - Estado: contacts (array), selectedContact (obj)
  - Handlers: handleAddContact, handleDeleteContact, handleToggleFavorite, handleClearContacts, handleSelectContact
  - Pasa props a ContactList

- src/components/ContactList.jsx
  - Props:
    - contacts (array)
    - onDeleteContact(contactId)
    - onToggleFavorite(contactId)
    - onSelectContact(contactId)

- src/components/ContactCard.jsx
  - Props:
    - name, phone, email, isFavorite (boolean)
  - Renderiza datos del contacto

## Cómo usar
- Haz clic en "+ Agregar Contacto" para crear uno nuevo.
- Dentro de cada tarjeta:
  - Estrella (★/☆) alterna favorito.
  - Botón "Eliminar" solicita confirmación y elimina el contacto.
- "Limpiar todo" borra todos los contactos (solicita confirmación).
- Haz clic en la tarjeta para marcarla como contacto destacado (se muestra debajo del Header).

## Debugging rápido
- App.jsx y ContactCard.jsx contienen console.log para ver renders.
- Asegúrate de que `onToggleFavorite` y `onDeleteContact` se pasen desde App.jsx al ContactList.

## Contribuir
Haz fork, crea una rama, realiza cambios y abre PR.
