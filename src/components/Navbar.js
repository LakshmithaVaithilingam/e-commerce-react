// Import React, React Router, and Styled Components
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  margin-left: 20px; /* Adjust margin as needed */
  
  &:hover {
    color: #555;
  }
`;

// Create the navbar component using the styled elements and the user menu component
const Navbar = () => {
    return (
      <NavbarContainer>
        <Logo>Skooler</Logo>
        <SearchInput type="text" placeholder="Search products..." />
        <StyledLink to="/products">Products</StyledLink>
        <StyledLink to="/product-management">ProductManagement</StyledLink>
        <StyledLink to="/category">Category</StyledLink>
        <StyledLink to="/subcategory">Subategory</StyledLink>
        <StyledLink to="/Complaint">Complaint</StyledLink>
        {/* Import and render the user menu component */}
        <UserIcon src="user.jpg" alt="User" />
      </NavbarContainer>
    );
  };

// Export the navbar component
export default Navbar;
