# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

** Project Name: Shopping Small**

1. **Clone the Repository for admin and client**
  git clone git@github.com:TranQuocHuuSOS/admin-shopping-small.git

2. **Install Dependencies**
  npm install

3. **Run the Application**
  npm run dev

**Explanation of Key Directories and Files (React)**

components/: This directory contains the React components used in the application. Each component is responsible for rendering a specific part of the UI.

pages/: This directory contains the main page components for the application.
Home.js: The home page of the application.
Booking.js: The page for managing bookings.

apis: : This directory contains the services for making HTTP requests to the backend API.

App.js: The main App component that sets up the routing and provides the main structure of the application.

index.js: The entry point of the React application. It renders the App component into the DOM.

styles/: This directory contains the global CSS styles for the application.

**Assumptions:**
Users have valid API keys and credentials for external services.
MongoDB is used as the database for the backend.
The project uses environment variables to manage sensitive information and configuration.
The frontend and backend are served on different ports during development.