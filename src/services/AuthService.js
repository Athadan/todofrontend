// src/services/AuthService.js
const API_URL = 'http://localhost:8080/api/auth';

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        // Hata durumunda response.text() ile hata mesajını yakalayabilirsiniz
        const errorText = await response.text();
        throw new Error(errorText || 'Giriş sırasında bir hata oluştu.');
    }
    return response.json();
};


export const register = async (username, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
};