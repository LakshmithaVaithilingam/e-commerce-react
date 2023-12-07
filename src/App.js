// Import React, React Router, and the page components
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProductManagement from './pages/ProductManagement';
// import OrderManagement from './pages/OrderManagement';
// import Complaints from './pages/Complaints';
// import UserManagement from './pages/UserManagement';
// import AdminManagement from './pages/AdminManagement';
// import EventsActivities from './pages/EventsActivities';
// import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import LeftPanel from './components/LeftPanel';

// Create the App component using the page components and the routes
const App = () => {
  return (
    <Router>
      <Navbar />
      <LeftPanel />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product-management" element={<ProductManagement />} />
        {/* <Route path="/order-management" element={<OrderManagement />} /> */}
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
