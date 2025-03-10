// src/services/TagService.js
const API_URL = 'http://localhost:8080/api/tags';

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const getTags = async () => {
  const response = await fetch(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  if (!response.ok) {
    throw new Error('Etiketler yüklenirken hata oluştu');
  }
  return response.json();
};

export const createTag = async (tag) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(tag),
  });
  if (!response.ok) {
    throw new Error('Etiket eklenirken hata oluştu');
  }
  return response.json();
};

export const deleteTag = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  if (!response.ok) {
    throw new Error('Etiket silinirken hata oluştu');
  }
  return response.json();
};
