// Import React, React Router, and Styled Components
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


// Create styled elements using Styled Components
const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  background-color: #f0f0f0;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;



const SearchInput = styled.input`
  width: 200px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 0 10px;
  outline: none;
`;

const UserIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

// Create the navbar component using the styled elements and the user menu component
const Navbar = () => {
    return (
      <NavbarContainer>
        <Logo>E-commerce</Logo>
        <SearchInput type="text" placeholder="Search products..." />
        {/* Import and render the user menu component */}
        <UserIcon src="user.jpg" alt="User" />
      </NavbarContainer>
    );
  };

// Export the navbar component
export default Navbar;
