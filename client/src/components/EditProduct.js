import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/products/' + id)
      .then(response => {
        setName(response.data.name);
        setPrice(response.data.price);
        setQuantity(response.data.quantity);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      price,
      quantity
    };

    axios.post('http://localhost:5000/products/update/' + id, updatedProduct)
      .then(res => console.log(res.data));

    navigate('/');
  }

  return (
    <div>
      <h3>Edit Product</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input type="text" required className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Price: </label>
          <input type="number" required className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Quantity: </label>
          <input type="number" required className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Product" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
