import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const deleteProduct = (id) => {
    axios.delete('http://localhost:5000/products/' + id)
      .then(response => {
        console.log(response.data);
        setProducts(products.filter(el => el._id !== id));
      });
  }

  return (
    <div>
      <h3>Products List</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <Link to={"/edit/" + product._id}>edit</Link> | <button onClick={() => { deleteProduct(product._id) }}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;
