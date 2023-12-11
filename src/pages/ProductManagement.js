import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const ProductContainer = styled.div`
  width: calc(100% - 200px);
  height: 100vh;
  padding: 20px;
  background-color: #fff;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const ProductForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const ProductFormLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ProductFormSelect = styled.select`
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
  margin-bottom: 10px;
`;

const ProductFormInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
  margin-bottom: 20px;
`;

const ProductFormButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #555;
  }
`;

const ProductManagement = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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

  const fetchSubcategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/subcategory');
      const data = await response.json();
      if (data.status === 200) {
        setSubcategories(data.subcategory);
      } else {
        console.error('Error fetching subcategories:', data.message);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const onSubmit = async data => {
    try {
      console.log('Data to be sent:', data);
      // Make a POST request to the API endpoint with the form data
      // Adjust the API endpoint based on your backend structure
      const response = await axios.post('http://localhost:8000/api/product', data);

      if (response.data && response.data.product) {
        // Handle success, e.g., show a success message
      } else {
        console.error('Invalid response from the server:', response.data);
      }

      // Reset the form
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContainer>
      <ProductTitle>Product Management</ProductTitle>
      <ProductForm onSubmit={handleSubmit(onSubmit)}>
        <ProductFormLabel>Select Category</ProductFormLabel>
        <ProductFormSelect {...register('category_id', { required: true })}>
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.category_id} value={category.category_id}>{category.name}</option>
          ))}
        </ProductFormSelect>
        {errors.category_id && <p>Category is required</p>}

        <ProductFormLabel>Select Subcategory</ProductFormLabel>
        <ProductFormSelect {...register('subcategory_id', { required: true })}>
          <option value="">Select a subcategory</option>
          {subcategories.map(subcategory => (
            <option key={subcategory.subcategory_id} value={subcategory.subcategory_id}>{subcategory.name}</option>
          ))}
        </ProductFormSelect>
        {errors.subcategory_id && <p>Subcategory is required</p>}

        <ProductFormLabel>Product Name</ProductFormLabel>
        <ProductFormInput
          type="text"
          {...register('name', { required: true })}
        />
        {errors.name && <p>Name is required</p>}

        <ProductFormButton type="submit">Create Product</ProductFormButton>
      </ProductForm>
    </ProductContainer>
  );
};

export default ProductManagement;
