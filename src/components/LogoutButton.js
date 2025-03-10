// src/components/LogoutButton.js
import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    // Token'ı silip login sayfasına yönlendiriyoruz
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <button onClick={handleLogout}>Çıkış Yap</button>
  );
};

export default LogoutButton;
