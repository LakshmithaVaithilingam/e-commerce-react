// Import React, React Router, and Styled Components
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Create styled elements using Styled Components
const LeftPanelContainer = styled.div`
  width: 200px;
  height: 15vh;
  padding: 20px;
  background-color: #eee;
`;

const LeftPanelTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const LeftPanelList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const LeftPanelItem = styled.li`
  margin-bottom: 10px;
`;

const LeftPanelLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    color: #555;
  }
`;

// Create the left panel component using the styled elements
const LeftPanel = () => {
  return (
    <LeftPanelContainer>
      <LeftPanelTitle>Admin Panel</LeftPanelTitle>
      <LeftPanelList>
        <LeftPanelItem>
        <LeftPanelLink to="/category">Category</LeftPanelLink>
        </LeftPanelItem>
        <LeftPanelItem>
        <LeftPanelLink to="/Subcategory">Subcategory</LeftPanelLink>
        </LeftPanelItem>
      </LeftPanelList>
    </LeftPanelContainer>
  );
};

// Export the left panel component
export default LeftPanel;
