// src/components/TodoSort.js
import React, { useState } from 'react';

const TodoSort = ({ onSortChange }) => {
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSortChange = () => {
    onSortChange({ sortBy, sortOrder });
  };

  return (
    <div>
      <h3>Sıralama</h3>
      <div>
        <label>Sıralama Kriteri:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Tarih</option>
          <option value="title">Başlık</option>
          <option value="priority">Öncelik</option>
          {/* Todo entity'nizde priority alanı varsa, onu da ekleyin */}
        </select>
      </div>
      <div>
        <label>Sıralama Yönü:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Artan</option>
          <option value="desc">Azalan</option>
        </select>
      </div>
      <button onClick={handleSortChange}>Sıralamayı Uygula</button>
    </div>
  );
};

export default TodoSort;
