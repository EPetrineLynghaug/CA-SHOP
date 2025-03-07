<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh -->


# Initialize

npm install

Run locally

npm run dev

# Project structure

```
react-prosjekt/
├── package.json              // Project metadata, dependencies, and scripts (using Vite)
├── vite.config.js            // Vite configuration (plugins, server settings, etc.)
├── tailwind.config.js        // Tailwind CSS configuration (custom themes, purge paths, etc.)
├── .gitignore                // Lists files and directories to ignore (node_modules, dist, environment files, etc.)
├── index.html                // Main HTML file that includes the root div for bootstrapping the React app
└── src/
    ├── App.jsx               // Root component that wraps your entire application
    ├── index.css             // Global CSS file (includes Tailwind CSS imports)
    ├── main.jsx              // Entry point that renders the App component and imports global styles
    ├── components/           // Contains reusable UI components across the app
    │   ├── cart/
    │   │   ├── CartItems.jsx     // Component to display individual items in the cart
    │   │   └── OrderSummary.jsx  // Component to show a summary of the order
    │   ├── footer/
    │   │   └── Footer.jsx        // Footer component displayed on all pages
    │   ├── forms/
    │   │   ├── ContactUsForm.jsx // Form component for contacting support or inquiries
    │   │   └── DeliveryForm.jsx  // Form component for capturing delivery information
    │   ├── header/
    │   │   ├── Header.jsx        // Header component containing the site title/logo and navigation
    │   │   └── SearchBar.jsx     // Search bar component for filtering or searching content
    │   ├── product/
    │   │   ├── ProductCard.jsx   // Component for displaying a product card (summary view)
    │   │   └── ProductList.jsx   // Component for rendering a list of products
    │   ├── Layout.jsx            // Layout component that wraps pages (includes Header, Footer, etc.)
    │   └── Spinner.jsx           // Reusable loading spinner component for asynchronous tasks
    ├── hooks/                // Contains custom React hooks for shared logic
    │   ├── useForm.js            // Hook to manage form state and validation
    │   └── useProductsApi.js     // Hook for fetching products data from an API
    ├── pages/                // Contains page components that are used with React Router
    │   ├── allProducts/
    │   │   └── AllProducts.jsx   // Page displaying a grid or list of all products
    │   ├── cart/
    │   │   └── Cart.jsx          // Page showing the shopping cart details
    │   └── singleProducts/
    │       └── SingleProduct.jsx // Page for displaying details of a single product
    ├── contact.jsx         // Contact page (located directly under src)
    ├── favorits.jsx        // Favorites page for displaying favorite products (located directly under src)
    └── home.jsx            // Home page for the application (located directly under src)
    └── store/              // Contains state management logic using Zustand
        └── productStore.js     // Zustand store for managing product data and favorites
        
```
