import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">SmartStocks Manager</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">Products</Link>
          </li>
          {auth.isAuthenticated && auth.role === 'admin' && (
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Product</Link>
            </li>
          )}
          <li className="navbar-item">
            <Link to="/sales" className="nav-link">Sales</Link>
          </li>
          {auth.isAuthenticated && (auth.role === 'admin' || auth.role === 'manager') && (
            <li className="navbar-item">
              <Link to="/sales/create" className="nav-link">Create Sale</Link>
            </li>
          )}
          <li className="navbar-item">
            <Link to="/warehouses" className="nav-link">Warehouses</Link>
          </li>
          {auth.isAuthenticated && (auth.role === 'admin' || auth.role === 'manager') && (
            <li className="navbar-item">
              <Link to="/warehouses/create" className="nav-link">Create Warehouse</Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav ml-auto">
          {auth.isAuthenticated ? (
            <li className="navbar-item">
              <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
