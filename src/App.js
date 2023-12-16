// Import React, React Router, and the page components
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductManagement from './pages/ProductManagement';
import Navbar from './components/Navbar';
import Category from './pages/Category';
import Subcategory from './pages/Subcategory';
import Products from './pages/Products';
import ProductDetailsPage from './pages/ProductDetailsPage';


// Create the App component using the page components and the routes
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/category" element={<Category />} />
        <Route path="/subcategory" element={<Subcategory />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />}/>
      </Routes>
    </Router>
  );
};

// Export the App component
export default App;
