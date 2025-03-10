<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="40" style="margin-right: 1rem;" />
  <img src="https://vitejs.dev/logo.svg" alt="Vite" width="40" style="margin-right: 1rem;" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS" width="40" />
</p>

# Course Assignment -Ecome store

# Initialize
```bash
npm install
```

Run locally
```bash

npm run dev
```
Build
```bash 
npm run build
```

## Project structure

```
react-prosjekt/
├── package.json              // Project metadata, dependencies, and scripts (using Vite)
├── vite.config.js            // Vite configuration (plugins, server settings, etc.)
├── index.html                // Main HTML file that includes the root div for bootstrapping the React 
└── src/
    ├── App.jsx               // Root component that wraps the entire application
    ├── index.css             // Global CSS file (includes Tailwind CSS imports)
    ├── main.jsx              // Entry point that renders the App 
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
    │   │   ├── Header.jsx        // Header/Navbar component containing the site title and navigation
    │   │   └── SearchBar.jsx     // Search bar component for filtering or searching content
    │   ├── product/
    │   │   ├── ProductCard.jsx   // Component for displaying a product card (summary view)
    │   │   └── ProductList.jsx   // Component for rendering a list of products
    │   ├── Layout.jsx            // Layout component that wraps pages.
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

### Assignment Overview – Javascript Frameworks: Course Assignment
This project was a one-week assignment that delivered all the required features. The assessment criteria included the following:
Home Page: Contains a list of products and a lookahead search bar.
Individual Product Page: Fetches and displays details of a specific item from the API.
Cart Icon: Shows the current number of items in the shopping cart.
Checkout Page: Provides a form for completing purchases.
Checkout Success Page: Confirms successful transactions.
Contact Page: Features proper validation for user input.
Shopping Cart: Allows products to be added and managed.

