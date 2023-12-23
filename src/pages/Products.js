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
  margin: 0 auto;
  padding: 20px;
  
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

const Form = styled.form`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;

  label {
    margin-right: 10px;
    margin-bottom: 15px;
    
  }

  select, input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    width: 170px;
  }

  button {
    background-color: #333;
    color: #fff;
    border: none;
    margin-bottom: 10px;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #555;
    }
  }
`;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filters, setFilters] = useState({
    category_id: '',
    subcategory_id: '',
    price_min: '',
    price_max: '',
  });

  useEffect(() => {
    // Fetch the list of products when the component mounts
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch the list of products when the component mounts
    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/category');
      const data = await response.json();
      if (data.status === 200) {
        setCategories(data.categories);
      } else {
        console.error('Error fetching categories:', data.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  // Fetch subcategories based on selected category
  useEffect(() => {
    if (filters.category_id) {
      fetchSubcategories(filters.category_id);
    } else {
      setSubcategories([]); // Reset subcategories when no category is selected
    }
  }, [filters.category_id]);

  // Fetch subcategories from the backend
  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/category/${categoryId}/subcategories`);
      const data = response.data;
      if (data.status === 200) {
        setSubcategories(data.subcategories);
      } else {
        console.error('Error fetching subcategories:', data.message);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      let response;

    // Build the params object based on the provided filters
    const params = {};

    if (filters.category_id) {
      params.category_id = filters.category_id;
    }

    if (filters.subcategory_id) {
      params.subcategory_id = filters.subcategory_id;
    }

    if (filters.price_min) {
      params.price_min = filters.price_min;
    }

    if (filters.price_max) {
      params.price_max = filters.price_max;
    }
  
      // Check if filters are present
      if (Object.values(filters).some(Boolean)) {
        response = await axios.get('http://localhost:8000/api/products', {
          params,
        });
      } else {
        // Fetch all products when no filters are present
        response = await axios.get('http://localhost:8000/api/products');
      }
  
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

  // Function to apply filters and fetch filtered products
  const applyFilters = () => {
    fetchProducts();
  };

  // Function to reset filters and fetch all products
  const resetFilters = () => {
    setFilters({
      category_id: '',
      subcategory_id: '',
      price_min: '',
      price_max: '',
    });
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
      {/* Filter form */}
      <Form>
        {/* Category filter */}
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={filters.category_id}
          onChange={(e) => setFilters({ ...filters, category_id: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>
        {/* Subcategory filter */}
        <label htmlFor="subcategory">Subcategory:</label>
        <select
          id="subcategory"
          value={filters.subcategory_id}
          onChange={(e) => setFilters({ ...filters, subcategory_id: e.target.value })}
        >
          <option value="">All Subcategories</option>
          {subcategories.map((subcategory) => (
          <option key={subcategory.subcategory_id} value={subcategory.subcategory_id}>
          {subcategory.name}
          </option>
        ))}
       </select>
       {/* Price range filters */}
      <label htmlFor="priceMin">Price Min:</label>
      <input
      type="number"
      id="priceMin"
      value={filters.price_min}
      onChange={(e) => setFilters({ ...filters, price_min: e.target.value })}
      />
      <label htmlFor="priceMax">Price Max:</label>
      <input
      type="number"
      id="priceMax"
      value={filters.price_max}
      onChange={(e) => setFilters({ ...filters, price_max: e.target.value })}
      />

        {/* Apply button */}
        <button type="button" onClick={applyFilters}>
          Apply Filters
        </button>
        {/* Reset button */}
        <button type="button" onClick={resetFilters}>
          Reset Filters
        </button>
      </Form>
      <ProductsContainer>
        {products.map((product) => (
          <ProductCard key={product.products_id}>
            <ProductTitle>{product.name}</ProductTitle>
            
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
