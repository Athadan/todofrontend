// src/components/TodoDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TodoComments from './TodoComments';

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        });
        if (!response.ok) {
          throw new Error('Todo bulunamadı');
        }
        const data = await response.json();
        setTodo(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTodo();
  }, [id]);

  if (!todo) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h2>Todo Detayları</h2>
      <p><strong>Başlık:</strong> {todo.title}</p>
      <p><strong>Açıklama:</strong> {todo.description}</p>
      <p><strong>Oluşturulma Tarihi:</strong> {new Date(todo.createdAt).toLocaleString()}</p>
      {todo.updatedAt && (
        <p><strong>Son Güncelleme Tarihi:</strong> {new Date(todo.updatedAt).toLocaleString()}</p>
      )}
      {todo.category && todo.category.name && (
        <p><strong>Kategori:</strong> {todo.category.name}</p>
      )}
      {todo.tags && todo.tags.length > 0 && (
        <p><strong>Etiketler:</strong> {todo.tags.map(tag => tag.name).join(', ')}</p>
      )}
      {/* Yorumları ekliyoruz */}
      <TodoComments todoId={id} />
      <button onClick={() => navigate(-1)}>Geri Dön</button>
    </div>
  );
};

export default TodoDetail;
