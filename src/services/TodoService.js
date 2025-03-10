// src/services/TodoService.js
const API_URL = 'http://localhost:8080/api/todos';

const getAuthHeaders = () => {
    const token = sessionStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const getTodos = async () => {
    const response = await fetch(API_URL, {
        headers: {
            ...getAuthHeaders(),
        },
    });

    if (!response.ok) {
        // Hata mesajını konsola yazdırabilir veya özel hata fırlatabilirsiniz.
        throw new Error('İstek sırasında bir hata oluştu.');
    }

    return response.json();
};

export const createTodo = async (todo) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify(todo),
    });
    
    if (!response.ok) {
        throw new Error('İstek sırasında bir hata oluştu.');
    }
    
    return response.json();
};

export const updateTodo = async (id, todo) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify(todo),
    });
    
    if (!response.ok) {
        throw new Error('İstek sırasında bir hata oluştu.');
    }
    
    return response.json();
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            ...getAuthHeaders(),
        },
    });
    
    if (!response.ok) {
        throw new Error('İstek sırasında bir hata oluştu.');
    }
    
    // Eğer delete isteğinde de JSON dönüş yapıyorsa
    return response.json();
};
