import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import api from '../utils/api';

const LoginPage = ({ setUser }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      setUser({ ...res.data.user, role: res.data.user.role });
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div>
      <Login onLogin={handleLogin} errorMessage={errorMessage} />
    </div>
  );
};

export default LoginPage;