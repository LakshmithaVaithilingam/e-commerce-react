// Import React, React Router, and the page components
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductManagement from './pages/ProductManagement';
import Navbar from './components/Navbar';
import LeftPanel from './components/LeftPanel';
import Category from './pages/Category';

// Create the App component using the page components and the routes
const App = () => {
  return (
    <Router>
      <Navbar />
      <LeftPanel />
      <Routes>
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/category" element={<Category />} />
        {/* <Route path="/complaints" element={<Complaints />} /> */}
        {/* <Route path="/user-management" element={<UserManagement />} /> */}
        {/* <Route path="/admin-management" element={<AdminManagement />} /> */}
        {/* <Route path="/events-activities" element={<EventsActivities />} /> */}
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </Router>
  );
};

// Export the App component
export default App;
