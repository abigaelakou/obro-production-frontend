/**
 * @description      : 
 * @author           : AbigaelHOMENYA
 * @group            : 
 * @created          : 10/12/2025 - 13:11:34
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 10/12/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    : 
 **/
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/obro-production-backend/api';

// Productions
export const getProductions = async() => {
    const response = await fetch(`${API_URL}/productions/read.php`);
    return response.json();
};

export const createProduction = async(data) => {
    const response = await fetch(`${API_URL}/productions/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};

// Castings
export const getCastings = async() => {
    const response = await fetch(`${API_URL}/castings/read.php`);
    return response.json();
};

// Candidatures
export const createCandidature = async(data) => {
    const response = await fetch(`${API_URL}/candidatures/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};

// Célébrités
export const getCelebrites = async() => {
    const response = await fetch(`${API_URL}/celebrites/read.php`);
    return response.json();
};

// Partenaires
export const getPartenaires = async() => {
    const response = await fetch(`${API_URL}/partenaires/read.php`);
    return response.json();
};

// Statistiques
export const getStats = async() => {
    const response = await fetch(`${API_URL}/stats/dashboard.php`);
    return response.json();
};

// Authentification
export const login = async(email, password) => {
    const response = await fetch(`${API_URL}/auth/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.json();
};

// Upload d'image
export const uploadImage = async(file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/upload/image.php`, {
        method: 'POST',
        body: formData
    });
    return response.json();
};