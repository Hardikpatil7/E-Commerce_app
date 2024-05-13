import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Product.css';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useSelector(state => { return state.products.find(product => toString(product.id) === toString(id)) });

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product-view-container">
      <div className='product-details'><h1><center>Product Details</center></h1></div>
      <div className="product-view-details" key={product.id}>
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> {product.price}</p>
        <p><strong>Discount Price:</strong> {product.discountPrice}</p>
        <p><strong>Image :</strong></p>
        <img src={product.image} alt={product.name} className='product-view-details-img'/>
      </div>
      <div>
        <button className='btn-back' onClick={() => navigate('/')}>Back to home</button>
      </div>
    </div>
  );
}

export default ProductView;
