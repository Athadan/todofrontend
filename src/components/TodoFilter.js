// src/components/TodoFilter.js
import React, { useState } from 'react';

const TodoFilter = ({ onFilterChange, categories, tags }) => {
  const [completed, setCompleted] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tagId, setTagId] = useState('');

  const handleFilterChange = () => {
    // 'completed' seçeneğini boolean'a çevirelim (eğer boşsa null olsun)
    const filterCompleted = completed === '' ? null : completed === 'true';
    onFilterChange({
      completed: filterCompleted,
      categoryId: categoryId === '' ? null : Number(categoryId),
      tagId: tagId === '' ? null : Number(tagId)
    });
  };

  return (
    <div>
      <h3>Filtrele</h3>
      <div>
        <label>Durum:</label>
        <select value={completed} onChange={(e) => setCompleted(e.target.value)}>
          <option value="">Tümü</option>
          <option value="true">Tamamlandı</option>
          <option value="false">Tamamlanmadı</option>
        </select>
      </div>
      <div>
        <label>Kategori:</label>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Tümü</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Etiket:</label>
        <select value={tagId} onChange={(e) => setTagId(e.target.value)}>
          <option value="">Tümü</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleFilterChange}>Filtrele</button>
    </div>
  );
};

export default TodoFilter;
