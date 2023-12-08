// Import React, Axios, and React Hook Form
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

// Create styled elements using Styled Components
const CategoryContainer = styled.div`
  width: calc(100% - 200px);
  height: 100vh;
  padding: 20px;
  background-color: #fff;
`;

const CategoryTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const CategoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const CategoryTableHead = styled.thead`
  background-color: #eee;
`;

const CategoryTableBody = styled.tbody``;

const CategoryTableRow = styled.tr``;

const CategoryTableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
`;

const CategoryTableData = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

const CategoryTableButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.color};
  color: #fff;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: ${props => props.hoverColor};
  }
`;

const CategoryForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const CategoryFormLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const CategoryFormInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
  margin-bottom: 20px;
`;

const CategoryFormButton = styled.button`
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

// Create the category component using the styled elements and the state
const Category = () => {
  // Create a state variable to store the categories
  const [categories, setCategories] = useState([]);

  // Create a state variable to store the selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Create a state variable to store the mode of the form
  const [formMode, setFormMode] = useState('create'); // 'create' or 'update'

  // Use the useForm hook to create and validate the form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Create a function to fetch the categories from the API
  const fetchCategories = async () => {
    try {
      // Make a GET request to the API endpoint
      const response = await axios.get('http://localhost:8000/api/category');
      const data = response.data;
      // Set the categories state with the response data
      setCategories(data);
      //setCategories(response.data);
    } catch (error) {
      // Handle the error
      console.error('Axios Error:', error);
    }
  };

  // Create a function to handle the form submission
  const onSubmit = async data => {
    try {
      // Check the mode of the form
      if (formMode === 'create') {
        // Make a POST request to the API endpoint with the form data
        const response = await axios.post(
          'http://localhost:8000/api/category',
          data
        );
        // Add the new category to the categories state
        setCategories([...categories, response.data]);
      } else if (formMode === 'update') {
        // Make a PUT request to the API endpoint with the form data and the selected category id
        const response = await axios.put(
          `http://localhost:8000/api/category/${selectedCategory.id}/edit`,
          data
        );
        // Update the categories state with the updated category
        setCategories(
          categories.map(category =>
            category.id === selectedCategory.id ? response.data : category
          )
        );
      }
      // Reset the form
      reset();
      // Set the form mode to 'create'
      setFormMode('create');
      // Set the selected category to null
      setSelectedCategory(null);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  // Create a function to handle the edit button click
  const handleEdit = category => {
    // Set the selected category to the clicked category
    setSelectedCategory(category);
    // Set the form mode to 'update'
    setFormMode('update');
    // Reset the form with the selected category data
    reset({
      name: category.name,
    });
  };

  // Create a function to handle the delete button click
  const handleDelete = async category => {
    try {
      // Make a DELETE request to the API endpoint with the selected category id
      await axios.delete(`http://localhost:8000/api/category/${category.id}/delete`);
      // Remove the deleted category from the categories state
      setCategories(categories.filter(c => c.id !== category.id));
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  // Use the useEffect hook to fetch the categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Return the JSX for the category component
  return (
    <CategoryContainer>
      <CategoryTitle>Category Management</CategoryTitle>
      <CategoryTable>
        <CategoryTableHead>
          <CategoryTableRow>
            <CategoryTableHeader>ID</CategoryTableHeader>
            <CategoryTableHeader>Name</CategoryTableHeader>
            <CategoryTableHeader>Actions</CategoryTableHeader>
          </CategoryTableRow>
        </CategoryTableHead>
        <CategoryTableBody>
          {Array.isArray(categories) && categories.map((category, idx) => (
            <CategoryTableRow key={category.id}>
              <CategoryTableData>{category.id}</CategoryTableData>
              <CategoryTableData>{category.name}</CategoryTableData>
              <CategoryTableData>
                <CategoryTableButton
                  color="#333"
                  hoverColor="#555"
                  onClick={() => handleEdit(category)}
                >
                  Edit
                </CategoryTableButton>
                <CategoryTableButton
                  color="#f00"
                  hoverColor="#f33"
                  onClick={() => handleDelete(category)}
                >
                  Delete
                </CategoryTableButton>
              </CategoryTableData>
            </CategoryTableRow>
          ))}
        </CategoryTableBody>
      </CategoryTable>
      <CategoryForm onSubmit={handleSubmit(onSubmit)}>
        <CategoryFormLabel>Category Name</CategoryFormLabel>
        <CategoryFormInput
          type="text"
          {...register('name', { required: true })}
        />
        {errors.name && <p>Name is required</p>}
        <CategoryFormButton type="submit">
          {formMode === 'create' ? 'Create' : 'Update'}
        </CategoryFormButton>
      </CategoryForm>
    </CategoryContainer>
  );
};

// Export the category component
export default Category;