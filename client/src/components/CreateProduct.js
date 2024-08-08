import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CreateProduct = () => {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated || auth.role !== 'admin') {
    return <Navigate to="/" />;
  }

  // Form submission logic here
};

export default CreateProduct;
