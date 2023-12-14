import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

// Create styled elements using Styled Components
const SubcategoryContainer = styled.div`
  width: calc(100% - 200px);
  height: 100vh;
  padding: 20px;
  background-color: #fff;
`;

const SubcategoryTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const SubcategoryForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 20px;
`;

const SubcategoryFormLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const SubcategoryFormSelect = styled.select`
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
  margin-bottom: 10px;
`;

const SubcategoryFormInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
  margin-bottom: 20px;
`;

const SubcategoryFormButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #555;
  }
`;

const SubcategoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const SubcategoryTableHead = styled.thead`
  background-color: #eee;
`;

const SubcategoryTableBody = styled.tbody``;

const SubcategoryTableRow = styled.tr``;

const SubcategoryTableHeader = styled.th`
  padding: 15px;
  border: 1px solid #ccc;
  text-align: left;
  font-weight: bold;
  font-size: 16px;
`;

const SubcategoryTableData = styled.td`
  padding: 15px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const SubcategoryTableButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.hoverColor};
    color: #fff;
  }
`;

const Subcategory = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'update'
  const [categories, setCategories] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchSubcategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/subcategory');
      const data = await response.json();
      console.log('Fetched subcategories:', data);
      //console.log('Updated subcategories:', subcategories);
      if (data.status === 200) {
        setSubcategories(data.subcategory);
      } else {
        console.error('Error fetching subcategories:', data.message);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

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

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  const onSubmit = async data => {
    try {
        console.log('Data to be sent:', data);
        if (formMode === 'create') {
          const response = await axios.post('http://localhost:8000/api/subcategory', data);
          if (response.data && response.data.subcategory) {
            // Fetch the updated list of subcategories after successful creation
            fetchSubcategories();
          } else {
            console.error('Invalid response from the server:', response.data);
          }
        
      } else if (formMode === 'update') {
        try {
          const response = await fetch(`http://localhost:8000/api/subcategory/${selectedSubcategory?.id}/edit`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          const responsedata = await response.json();
          if (responsedata && responsedata.subcategory) {
            setSubcategories(
              Array.isArray(subcategories) && subcategories.map(subcategory =>
                subcategory.id === selectedSubcategory.id ? data.subcategory : subcategory
              )
            );
          } else {
            console.error('Invalid response from the server:', data);
          }
        } catch (error) {
          console.error(error);
        }
      }
      reset();
      setFormMode('create');
      setSelectedSubcategory(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = subcategory => {
    if (subcategory.id || subcategory.subcategory_id) {
      const subcategoryId = subcategory.id || subcategory.subcategory_id;
      setSelectedSubcategory({ ...subcategory, id: subcategoryId });
      setFormMode('update');
      reset({
        name: subcategory.name,
        category_id: subcategory.category_id
      });
    } else {
      console.error('Subcategory does not have an id:', subcategory);
    }
  };

  const handleDelete = async subcategory => {
    try {
      if (subcategory.subcategory_id) {
        await axios.delete(`http://localhost:8000/api/subcategory/${subcategory.subcategory_id}/delete`);
        setSubcategories(subcategories.filter(s => s.subcategory_id !== subcategory.subcategory_id));
        reset();
        setFormMode('create');
        setSelectedSubcategory(null);
      } else {
        console.error('Subcategory does not have an id:', subcategory);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SubcategoryContainer>
      <SubcategoryTitle>Subcategory Management</SubcategoryTitle>
      <SubcategoryForm onSubmit={handleSubmit(onSubmit)}>
        <SubcategoryFormLabel>Select Category</SubcategoryFormLabel>
        <SubcategoryFormSelect {...register('category_id', { required: true })}>
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.category_id} value={(category.category_id)}>{category.name}</option>
          ))}
        </SubcategoryFormSelect>
        {errors.category_id && <p>Category is required</p>}
        <SubcategoryFormLabel>Subcategory Name</SubcategoryFormLabel>
        <SubcategoryFormInput
          type="text"
          {...register('name', { required: true })}
        />
        {errors.name && <p>Name is required</p>}
        <SubcategoryFormButton type="submit">
          {formMode === 'create' ? 'Create' : 'Update'}
        </SubcategoryFormButton>
      </SubcategoryForm>
      <SubcategoryTable>
        <SubcategoryTableHead>
          <SubcategoryTableRow>
            <SubcategoryTableHeader>ID</SubcategoryTableHeader>
            <SubcategoryTableHeader>Category</SubcategoryTableHeader>
            <SubcategoryTableHeader>Name</SubcategoryTableHeader>
            <SubcategoryTableHeader>Actions</SubcategoryTableHeader>
          </SubcategoryTableRow>
        </SubcategoryTableHead>
        <SubcategoryTableBody>
          {Array.isArray(subcategories) && subcategories.map(subcategory => (
            <SubcategoryTableRow key={subcategory.subcategory_id}>
              <SubcategoryTableData>{subcategory.subcategory_id}</SubcategoryTableData>
              <SubcategoryTableData>
              {/* Find the category name based on category_id */}
              {categories.find(category => category.category_id === subcategory.category_id)?.name}
             </SubcategoryTableData>
              <SubcategoryTableData>{subcategory.name}</SubcategoryTableData>
              <SubcategoryTableData>
                <SubcategoryTableButton
                  color="#333"
                  hoverColor="#555"
                  onClick={() => handleEdit(subcategory)}
                >
                  Edit
                </SubcategoryTableButton>
                <SubcategoryTableButton
                  color="#f00"
                  hoverColor="#f33"
                  onClick={() => handleDelete(subcategory)}
                >
                  Delete
                </SubcategoryTableButton>
              </SubcategoryTableData>
            </SubcategoryTableRow>
          ))}
        </SubcategoryTableBody>
      </SubcategoryTable>
    </SubcategoryContainer>
  );
};

export default Subcategory;
