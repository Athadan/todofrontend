// src/components/CategoryForm.js
import React, { useState } from 'react';
import { createCategory } from '../services/CategoryService';

const CategoryForm = ({ onCategoryAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCategory = await createCategory({ name });
      onCategoryAdded(newCategory); // Parent bileşene bildiriyoruz
      setName('');
    } catch (error) {
      console.error('Kategori eklenirken hata oluştu:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Kategori Adı"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Kategori Ekle</button>
    </form>
  );
};

export default CategoryForm;
