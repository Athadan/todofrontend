// src/components/TodoForm.js
import React, { useState } from 'react';
import { createTodo } from '../services/TodoService';
import './TodoForm.css';  // CSS varsa

const TodoForm = ({ categories, tags, fetchTodos }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('0'); // Varsayılan olarak "0" (numeric string)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedTags(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoData = {
      title,
      description,
      completed: false,
      // Priority alanını numeric değere çevirerek ekliyoruz
      priority: parseInt(priority, 10),
      category: { id: selectedCategory },
      // Seçilen tag ID'lerini nesne dizisine çeviriyoruz
      tags: selectedTags.map((tagId) => ({ id: tagId }))
    };
    try {
      await createTodo(todoData);
      setTitle('');
      setDescription('');
      setPriority('0'); // Priority reset
      setSelectedCategory('');
      setSelectedTags([]);
      fetchTodos();
    } catch (error) {
      console.error('Todo ekleme hatası:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* Priority için numeric input ekliyoruz */}
      <input
        type="number"
        placeholder="Priority (örn. 1-10)"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        required
        className="form-select"
      >
        <option value="" disabled>
          Kategori Seçin
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      {/* Çoklu etiket seçimi */}
      <select
        multiple
        value={selectedTags}
        onChange={handleTagChange}
        className="form-select"
      >
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
