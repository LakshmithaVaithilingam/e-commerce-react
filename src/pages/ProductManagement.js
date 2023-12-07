// Import React and Styled Components
import React from 'react';
import styled from 'styled-components';

// Create styled elements using Styled Components
const DashboardContainer = styled.div`
  width: calc(100% - 200px);
  height: 100vh;
  padding: 20px;
  background-color: #fff;
`;

const DashboardTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const DashboardContent = styled.p`
  font-size: 16px;
  color: #333;
`;

// Create the dashboard page component using the styled elements
const Dashboard = () => {
  return (
    <DashboardContainer>
      <DashboardTitle>Dashboard</DashboardTitle>
      <DashboardContent>
        Welcome to the admin panel of the e-commerce website. Here you can
        manage the products, orders, users, and other aspects of the website.
      </DashboardContent>
    </DashboardContainer>
  );
};

// Export the dashboard page component
export default Dashboard;
