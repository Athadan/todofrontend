import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18'de bu şekilde import edilmeli
import './index.css';
import App from './App';

// createRoot kullanarak uygulamayı render et
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
