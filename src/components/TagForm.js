// src/components/TagForm.js
import React, { useState } from 'react';
import { createTag } from '../services/TagService';

const TagForm = ({ onTagAdded }) => {
  const [tagName, setTagName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTag = await createTag({ name: tagName });
      onTagAdded(newTag); // Yeni eklenen etiketi parent bileşene bildiriyoruz
      setTagName('');
    } catch (error) {
      console.error('Etiket eklenirken hata oluştu:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Yeni Etiket"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
      />
      <button type="submit">Etiket Ekle</button>
    </form>
  );
};

export default TagForm;
