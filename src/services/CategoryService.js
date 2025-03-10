// src/services/CategoryService.js
const API_URL = 'http://localhost:8080/api/categories';

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const getCategories = async () => {
  const response = await fetch(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  if (!response.ok) {
    throw new Error('Kategori yüklenirken hata oluştu');
  }
  return response.json();
};

export const createCategory = async (category) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(category),
  });
  if (!response.ok) {
    throw new Error('Kategori eklenirken hata oluştu');
  }
  return response.json();
};

export const deleteCategory = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  if (!response.ok) {
    throw new Error('Kategori silinirken hata oluştu');
  }
  return response.json();
};
