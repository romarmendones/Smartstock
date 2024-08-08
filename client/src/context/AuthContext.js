import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    role: null,
  });

  useEffect(() => {
    if (auth.token) {
      const decoded = jwt_decode(auth.token);
      setAuth({ ...auth, isAuthenticated: true, user: decoded, role: decoded.role, loading: false });
    } else {
      setAuth({ ...auth, loading: false });
    }
  }, []);

  const register = async (formData) => {
    const res = await axios.post('http://localhost:5000/auth/register', formData);
    localStorage.setItem('token', res.data.token);
    const decoded = jwt_decode(res.data.token);
    setAuth({ token: res.data.token, isAuthenticated: true, user: decoded, role: decoded.role });
  };

  const login = async (formData) => {
    const res = await axios.post('http://localhost:5000/auth/login', formData);
    localStorage.setItem('token', res.data.token);
    const decoded = jwt_decode(res.data.token);
    setAuth({ token: res.data.token, isAuthenticated: true, user: decoded, role: decoded.role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, isAuthenticated: false, user: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
