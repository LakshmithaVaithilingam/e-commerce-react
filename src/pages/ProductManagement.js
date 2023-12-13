import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const ProductManagementContainer = styled.div`
  width: calc(100% - 200px);
  height: 100vh;
  padding: 20px;
  background-color: #fff;
`;

const ProductManagementTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const ProductManagementTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const ProductManagementTableHead = styled.thead`
  background-color: #eee;
`;

const ProductManagementTableBody = styled.tbody``;

const ProductManagementTableRow = styled.tr``;

const ProductManagementTableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
`;

const ProductManagementTableData = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

const ProductManagementTableButton = styled.button`
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

const ProductManagementForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const ProductManagementFormLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ProductManagementFormSelect = styled.select`
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
  margin-bottom: 10px;
`;

const ProductManagementFormInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
  margin-bottom: 20px;
`;

const ProductManagementFormTextarea = styled.textarea`
  width: 100%;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  outline: none;
  margin-bottom: 20px;
`;

const ProductManagementFormButton = styled.button`
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
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'update'
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchProducts();
  }, []);

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
      const response = await fetch(`http://localhost:8000/api/subcategory`);
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

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      if (data.status === 200) {
        setProducts(data.products);
      } else {
        console.error('Error fetching products:', data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const onSubmit = async data => {
    try {
      const formData = new FormData();
      console.log('Before appending data:', formData);
      // Append form fields to FormData
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('quantity', data.quantity);
      formData.append('size', data.size);
      formData.append('color', data.color);
      formData.append('price', data.price);
      formData.append('category_id', data.category_id);
      formData.append('subcategory_id', data.subcategory_id);

      // If updating, append the product ID to FormData
      if (formMode === 'update' && selectedProduct) {
        formData.append('product_id', selectedProduct.products_id);
      }

      // Append each file to FormData with the key 'images[]'
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images[]', data.images[i]);
      }
      console.log('After appending data:', formData);

      // Determine the API endpoint based on whether it's an update or create
      const apiEndpoint = formMode === 'update'
        ? `http://localhost:8000/api/products/${selectedProduct.products_id}/edit`
        : 'http://localhost:8000/api/products';

      // Determine the HTTP method based on whether it's an update or create
      const httpMethod = formMode === 'update' ? 'PUT' : 'POST';

      // Make the request with FormData
      const response = await axios({
        method: httpMethod,
        url: apiEndpoint,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
      },
      });

      console.log('Axios Response:', response);

      if (response.data && response.data.product) {
        
        fetchProducts(); // Fetch the updated list of products after successful creation or update
        reset(); // Reset the form after successful submission
        setFormMode('create'); // Switch back to create mode
        setSelectedProduct(null); // Clear the selected product
      } else {
        console.error('Invalid response from the server:', response.data);
      }
    } catch (error) {
      console.error('Error creating/updating product:', error);
    }
  };
  

  const handleEdit = (productId) => {
    // Find the product to edit
    const productToEdit = products.find(product => product.products_id === productId);
    console.log('Product to Edit:', productToEdit);
    // Set the selected product and switch to update mode
    setSelectedProduct(productToEdit);
    setFormMode('update');
    
  
    // Populate the form fields with the existing data
    reset({
      category_id: productToEdit.category_id,
      subcategory_id: productToEdit.subcategory_id,
      name: productToEdit.name,
      description: productToEdit.description,
      quantity: productToEdit.quantity,
      size: productToEdit.size,
      color: productToEdit.color,
      price: productToEdit.price,
    });
    
  
    // Manually set the file input value to the existing images
    const imagesInput = document.querySelector('input[type="file"]');
    imagesInput.value = ''; // Clear the input to handle the case where the same images are selected
    imagesInput.files = null; // Clear the files to allow setting new ones
    
  
    // Create a new FileList with the existing images
    const existingImages = productToEdit.images.map(imageUrl => {
      // Assuming the images are stored with absolute URLs
      return new File([imageUrl], imageUrl.split('/').pop());
    });
  
    const newFileList = new DataTransfer();
    existingImages.forEach(file => newFileList.items.add(file));
  
    // Set the file input value with the new FileList
    imagesInput.files = newFileList.files;
  };
  

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}/delete`);
      setProducts(products.filter(product => product.products_id !== productId));
      reset(); // Reset the form after successful deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <ProductManagementContainer>
      <ProductManagementTitle>Product Management</ProductManagementTitle>
      <ProductManagementForm onSubmit={handleSubmit(onSubmit)}>
        <ProductManagementFormLabel>Select Category</ProductManagementFormLabel>
        <ProductManagementFormSelect {...register('category_id', { required: true })} onChange={(e) => fetchSubcategories(e.target.value)}>
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.category_id} value={category.category_id}>{category.name}</option>
          ))}
        </ProductManagementFormSelect>
        {errors.category_id && <p>Category is required</p>}
        <ProductManagementFormLabel>Select Subcategory</ProductManagementFormLabel>
        <ProductManagementFormSelect {...register('subcategory_id', { required: true })}>
          <option value="">Select a subcategory</option>
          {subcategories.map(subcategory => (
            <option key={subcategory.subcategory_id} value={subcategory.subcategory_id}>{subcategory.name}</option>
          ))}
        </ProductManagementFormSelect>
        {errors.subcategory_id && <p>Subcategory is required</p>}
        <ProductManagementFormLabel>Product Name</ProductManagementFormLabel>
        <ProductManagementFormInput type="text" {...register('name', { required: true })} />
        {errors.name && <p>Name is required</p>}
        <ProductManagementFormLabel>Description</ProductManagementFormLabel>
        <ProductManagementFormTextarea {...register('description', { required: true })} />
        {errors.description && <p>Description is required</p>}
        <ProductManagementFormLabel>Quantity</ProductManagementFormLabel>
        <ProductManagementFormInput type="number" {...register('quantity', { required: true })} />
        {errors.quantity && <p>Quantity is required</p>}
        <ProductManagementFormLabel>Size</ProductManagementFormLabel>
        <ProductManagementFormInput type="text" {...register('size', { required: true })} />
        {errors.size && <p>Size is required</p>}
        <ProductManagementFormLabel>Color</ProductManagementFormLabel>
        <ProductManagementFormInput type="text" {...register('color', { required: true })} />
        {errors.color && <p>Color is required</p>}
        <ProductManagementFormLabel>Price</ProductManagementFormLabel>
        <ProductManagementFormInput type="number" step="0.01" {...register('price', { required: true })} />
        {errors.price && <p>Price is required</p>}
        <ProductManagementFormLabel>Images</ProductManagementFormLabel>
        <ProductManagementFormInput type="file" {...register('images[]', { required: true, multiple: true })} />
        {errors.images && <p>Images are required</p>}
        <ProductManagementFormButton type="submit">
        {formMode === 'create' ? 'Create' : 'Update'}
        </ProductManagementFormButton>
      </ProductManagementForm>
      <ProductManagementTable>
        <ProductManagementTableHead>
          <ProductManagementTableRow>
            <ProductManagementTableHeader>ID</ProductManagementTableHeader>
            <ProductManagementTableHeader>Name</ProductManagementTableHeader>
            <ProductManagementTableHeader>Images</ProductManagementTableHeader>
            <ProductManagementTableHeader>Quantity</ProductManagementTableHeader>
            <ProductManagementTableHeader>Price</ProductManagementTableHeader>
            <ProductManagementTableHeader>Actions</ProductManagementTableHeader>
          </ProductManagementTableRow>
        </ProductManagementTableHead>
        <ProductManagementTableBody>
          {Array.isArray(products) && products.map(product => (
            <ProductManagementTableRow key={product.products_id}>
              <ProductManagementTableData>{product.products_id}</ProductManagementTableData>
              <ProductManagementTableData>{product.name}</ProductManagementTableData>
              <ProductManagementTableData>
              {/* Render images */}
              {product.images.map((image, index) => (
              <img key={index} src={image} alt={`Product ${product.products_id} - ${index + 1}`} style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '5px' }} />
              ))}
              </ProductManagementTableData>
              <ProductManagementTableData>{product.quantity}</ProductManagementTableData>
              <ProductManagementTableData>{product.price}</ProductManagementTableData>
              <ProductManagementTableData>
                <ProductManagementTableButton
                  color="#333"
                  hoverColor="#555"
                  onClick={() => handleEdit(product.products_id)}
                >
                  Edit
                </ProductManagementTableButton>
                <ProductManagementTableButton
                  color="#f00"
                  hoverColor="#f33"
                  onClick={() => handleDelete(product.products_id)}
                >
                  Delete
                </ProductManagementTableButton>
              </ProductManagementTableData>
            </ProductManagementTableRow>
          ))}
        </ProductManagementTableBody>
      </ProductManagementTable>
    </ProductManagementContainer>
  );
};

export default ProductManagement;
