// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ProductTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const StyledButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #555;
  }
`;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the list of products when the component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      const data = response.data;
      if (data.status === 200) {
        setProducts(data.products);
      } else {
        console.error('Error fetching products:', data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const [cart, setCart] = useState({}); // Use an object to track the cart status for each product

  const toggleCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: !prevCart[productId], // Toggle the cart status
    }));
  };

  return (
    <div>
      <h1>Products</h1>
      <ProductsContainer>
        {products.map((product) => (
          <ProductCard key={product.products_id}>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>Price: ${product.price}</ProductPrice>
            <Link key={product.products_id} to={`/products/${product.products_id}`}>
            <img
              src={product.images[0]} // Assuming the first image in the array is the main product image
              alt={`Product ${product.products_id}`}
              style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }}
            />
            </Link>
            <StyledButton onClick={() => toggleCart(product.products_id)}>
              {cart[product.products_id] ? 'Remove Item' : 'Add to Cart'}
            </StyledButton>
          </ProductCard>
        ))}
      </ProductsContainer>
    </div>
  );
};

export default ProductsPage;
