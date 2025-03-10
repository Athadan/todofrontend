// src/components/Login.js
import React, { useState } from 'react';
import { login } from '../services/AuthService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      console.log("Login response:", response);
      if (response.token) {
        // Token'ı sessionStorage'e kaydediyoruz
        sessionStorage.setItem('token', response.token);
        window.location.href = '/';
      } else {
        console.error("Giriş başarısız oldu, response:", response);
      }
    } catch (error) {
      console.error("Giriş hatası:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
