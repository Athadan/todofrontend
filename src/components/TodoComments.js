// src/components/TodoComments.js
import React, { useEffect, useState } from 'react';

const TodoComments = ({ todoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/todos/${todoId}/comments`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
      });
      if (!response.ok) {
        throw new Error('Yorumlar yüklenirken hata oluştu');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [todoId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/todos/${todoId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({ content: newComment }),
      });
      if (!response.ok) {
        throw new Error('Yorum eklenirken hata oluştu');
      }
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/todos/${todoId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
      });
      if (!response.ok) {
        throw new Error('Yorum silinirken hata oluştu');
      }
      fetchComments();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h3>Yorumlar</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.username}</strong>: {comment.content} ({new Date(comment.createdAt).toLocaleString()})
            <button onClick={() => handleDeleteComment(comment.id)}>Sil</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          placeholder="Yorum ekleyin..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit">Yorum Ekle</button>
      </form>
    </div>
  );
};

export default TodoComments;
