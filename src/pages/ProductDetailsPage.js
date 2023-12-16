// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import styled from 'styled-components';

// Styled components

const ProductDetailsContainer = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProductDetailsInfo = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductImagesContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
  color: #333;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: #555;
`;

const ProductDetailsButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  outline: none;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 10px; 
  max-width: 200px;    
  display: block;  /* Ensures it takes full width even if less content */
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #555;
  }
`;

const RelatedProductsContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  margin-left: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const RelatedProductCard = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
`;

const RelatedProductImagesContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  overflow: hidden;
`;

const RelatedProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const RelatedProductTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const StyledPrice = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  color: #555;
`;

const ViewDetailsButton = styled(ProductDetailsButton)`
  background-color: #ddd;
  color: #333;
  text-decoration: none; // Remove the underline
  display: inline-block;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 10px; 
  max-width: 200px;    
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #ccc;
    text-decoration: none; // Remove the underline on hover
  }
`;

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
      const data = response.data;
      if (data.status === 200) {
        setProductDetails(data.product);
        setProduct(data.product);
      } else {
        console.error('Error fetching product details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const category_id = product.category_id;

      const response = await axios.get(`http://localhost:8000/api/related-products/${category_id}/${productId}`);
      const data = response.data;

      if (data.status === 200) {
        setRelatedProducts(data.relatedProducts);
      } else {
        console.error('Error fetching related products:', data.message);
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const handleBuyNow = () => {
    console.log('Buy Now clicked!');
  };

  const handleAddToCart = () => {
    console.log('Add to Cart clicked!');
  };

  return (
    <ProductDetailsContainer>
      <ProductDetailsInfo>
        <ProductImagesContainer>
          {productDetails.images &&
            productDetails.images.map((image, index) => (
              <ProductImage key={index} src={image} alt={`Product ${productId} - ${index + 1}`} />
            ))}
        </ProductImagesContainer>
        <ProductTitle>{productDetails.name}</ProductTitle>
        <ProductDescription>{productDetails.description}</ProductDescription>
        <p>Quantity: {productDetails.quantity}</p>
        <p>Color: {productDetails.color}</p>
        <StyledPrice>Price: ${productDetails.price}</StyledPrice>
        <ProductDetailsButton onClick={handleBuyNow}>Buy Now</ProductDetailsButton>
        <ProductDetailsButton onClick={handleAddToCart}>
          {productDetails.inCart ? 'Remove from Cart' : 'Add to Cart'}
        </ProductDetailsButton>
      </ProductDetailsInfo>

      <RelatedProductsContainer>
        <h3>Related Products</h3>
        {relatedProducts.map((relatedProduct) => (
          <RelatedProductCard key={relatedProduct.products_id}>
            <RelatedProductImagesContainer>
              {relatedProduct.images &&
                relatedProduct.images.map((image, index) => (
                  <RelatedProductImage
                    key={index}
                    src={image}
                    alt={`Related Product ${relatedProduct.products_id} - ${index + 1}`}
                  />
                ))}
            </RelatedProductImagesContainer>
            <RelatedProductTitle>{relatedProduct.name}</RelatedProductTitle>
            <ProductDescription>{relatedProduct.description}</ProductDescription>
            <StyledPrice>Price: ${relatedProduct.price}</StyledPrice>
            <Link to={`/products/${relatedProduct.products_id}`}>
            <ViewDetailsButton onClick={() => console.log('View Details clicked')}>
              View Details
            </ViewDetailsButton>
            </Link>
          </RelatedProductCard>
        ))}
      </RelatedProductsContainer>
    </ProductDetailsContainer>
  );
};

export default ProductDetailsPage;
