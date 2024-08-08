import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsList from './components/ProductsList';
import EditProduct from './components/EditProduct';
import CreateProduct from './components/CreateProduct';
import SalesList from './components/SalesList';
import CreateSale from './components/CreateSale';
import WarehousesList from './components/WarehousesList';
import CreateWarehouse from './components/CreateWarehouse';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Routes>
            <Route path="/" exact element={<ProductsList />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="/sales" element={<SalesList />} />
            <Route path="/sales/create" element={<CreateSale />} />
            <Route path="/warehouses" element={<WarehousesList />} />
            <Route path="/warehouses/create" element={<CreateWarehouse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
