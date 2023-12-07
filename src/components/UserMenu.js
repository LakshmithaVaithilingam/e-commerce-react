// Import React, React Router, and Styled Components
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Create styled elements using Styled Components
const UserMenuContainer = styled.div`
  position: relative;
`;

const UserMenuButton = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 15px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #555;
  }
`;

const UserMenuDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 120px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  display: ${props => (props.show ? 'block' : 'none')};
`;

const UserMenuLink = styled(Link)`
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333;
  &:hover {
    background-color: #eee;
  }
`;

// Create the user menu component using the styled elements and the state
const UserMenu = () => {
  // Create a state variable to toggle the dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);

  // Create a function to handle the button click
  const handleButtonClick = () => {
    // Toggle the dropdown visibility
    setShowDropdown(!showDropdown);
  };

  return (
    <UserMenuContainer>
      <UserMenuButton onClick={handleButtonClick}>User</UserMenuButton>
      <UserMenuDropdown show={showDropdown}>
        <UserMenuLink to="/profile">Profile</UserMenuLink>
        <UserMenuLink to="/logout">Logout</UserMenuLink>
      </UserMenuDropdown>
    </UserMenuContainer>
  );
};

// Export the user menu component
export default UserMenu;
