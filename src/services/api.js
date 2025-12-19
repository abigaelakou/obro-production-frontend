/**
 * @description      : API Services avec upload d'images
 * @author           : AbigaelHOMENYA
 * @group            : 
 * @created          : 10/12/2025 - 13:11:34
 **/
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/obro-production-backend/api';

export const BASE_URL = API_URL.replace("/api", "");

// Utilisateurs - Ajoutez ces fonctions à la fin de votre api.js

// Lire tous les utilisateurs
export const getUsers = async () => {
    const response = await fetch(`${API_URL}/users/read.php`);
    return response.json();
};

// Créer un utilisateur
export const createUser = async (data) => {
    const response = await fetch(`${API_URL}/users/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};

// Mettre à jour un utilisateur
export const updateUser = async (data) => {
    const response = await fetch(`${API_URL}/users/update.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};

// Mettre à jour le statut d'un utilisateur
export const updateUserStatus = async (id, status) => {
    const response = await fetch(`${API_URL}/users/update_status.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
    });
    return response.json();
};

// Supprimer un utilisateur
export const deleteUser = async (id) => {
    const response = await fetch(`${API_URL}/users/delete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });
    return response.json();
};

// Productions
export const getProductions = async () => {
    const response = await fetch(`${API_URL}/productions/read.php`);
    return response.json();
};

export const createProduction = async (data) => {
    const formData = new FormData();
    formData.append("titre", data.titre);
    formData.append("genre", data.genre || "");
    formData.append("categorie", data.categorie || "");
    formData.append("date_sortie", data.date_sortie || "");
    formData.append("youtube_url", data.youtube_url || "");
    formData.append("description", data.description || "");
    formData.append("status", data.status || "publiée");

    if (data.img instanceof File) {
        formData.append("img", data.img);
    }

    const response = await fetch(`${API_URL}/productions/create.php`, {
        method: 'POST',
        body: formData
    });
    return response.json();
};

export const updateProduction = async (data) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("titre", data.titre);
    formData.append("genre", data.genre || "");
    formData.append("categorie", data.categorie || "");
    formData.append("date_sortie", data.date_sortie || "");
    formData.append("youtube_url", data.youtube_url || "");
    formData.append("description", data.description || "");
    formData.append("status", data.status || "publiée");

    if (data.img instanceof File) {
        formData.append("img", data.img);
    }

    const response = await fetch(`${API_URL}/productions/update.php`, {
        method: 'POST',
        body: formData
    });
    return response.json();
};
export const deleteProduction = async (id) => {
    const response = await fetch(`${API_URL}/productions/delete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });
    return response.json();
};

// Castings
export const getCastings = async () => {
    const response = await fetch(`${API_URL}/castings/read.php`);
    return response.json();
};
export const createCasting = async (data) => {
    const formData = new FormData();
    formData.append("lib_casting", data.lib_casting);
    formData.append("description", data.description || "");
    formData.append("exigences", data.exigences || "");
    formData.append("date_publication", data.date_publication || "");
    formData.append("date_cloture", data.date_cloture || "");
    formData.append("id_production", data.id_production || "");
    formData.append("status", data.status || "publié");

    if (data.img instanceof File) {
        formData.append("img", data.img);
    }

    const response = await fetch(`${API_URL}/castings/create.php`, {
        method: 'POST',
        body: formData
    });
    return response.json();
};

export const updateCasting = async (data) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("lib_casting", data.lib_casting);
    formData.append("description", data.description || "");
    formData.append("exigences", data.exigences || "");
    formData.append("date_publication", data.date_publication || "");
    formData.append("date_cloture", data.date_cloture || "");
    formData.append("id_production", data.id_production || "");
    formData.append("status", data.status || "publié");

    if (data.img instanceof File) {
        formData.append("img", data.img);
    }

    const response = await fetch(`${API_URL}/castings/update.php`, {
        method: 'POST',
        body: formData
    });
    return response.json();
};
export const deleteCasting = async (id) => {
    const response = await fetch(`${API_URL}/castings/delete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });
    return response.json();
};


// Candidatures
// Lire toutes les candidatures
export const getCandidatures = async () => {
    const response = await fetch(`${API_URL}/candidatures/read.php`);
    return response.json();
};

// Créer une candidature
export const createCandidature = async (data) => {
    const response = await fetch(`${API_URL}/candidatures/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};

// Mettre à jour le statut d'une candidature
export const updateCandidatureStatus = async (id, statut) => {
    const response = await fetch(`${API_URL}/candidatures/update_status.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, statut })
    });
    return response.json();
};

// Supprimer une candidature
export const deleteCandidature = async (id) => {
    const response = await fetch(`${API_URL}/candidatures/delete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });
    return response.json();
};
// Célébrités/Équipes
export const getCelebrites = async () => {
    const response = await fetch(`${API_URL}/celebrites/read.php`);
    return response.json();
};

export const createCelebrite = async (data) => {
    const formData = new FormData();
    formData.append("nom_celebrite", data.nom_celebrite);
    formData.append("fonction", data.fonction || "");
    formData.append("bio", data.bio || "");
    formData.append("description", data.description || "");
    formData.append("url_insta", data.url_insta || "");
    formData.append("url_face", data.url_face || "");
    formData.append("url_tiktok", data.url_tiktok || "");
    formData.append("status", data.status || "publiée");

    if (data.img instanceof File) {
        formData.append("img", data.img);
    }

    const response = await fetch(`${API_URL}/celebrites/create.php`, {
        method: 'POST',
        body: formData
    });
    return response.json();
};

export const updateCelebrite = async (data) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("nom_celebrite", data.nom_celebrite);
    formData.append("fonction", data.fonction || "");
    formData.append("bio", data.bio || "");
    formData.append("description", data.description || "");
    formData.append("url_insta", data.url_insta || "");
    formData.append("url_face", data.url_face || "");
    formData.append("url_tiktok", data.url_tiktok || "");
    formData.append("status", data.status || "publiée");

    if (data.img instanceof File) {
        formData.append("img", data.img);
    }

    const response = await fetch(`${API_URL}/celebrites/update.php`, {
        method: 'POST',
        body: formData
    });
    return response.json();
};
export const deleteCelebrite = async (id) => {
    const response = await fetch(`${API_URL}/celebrites/delete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });
    return response.json();
};


// Partenaires
export const getPartenaires = async () => {
    const response = await fetch(`${API_URL}/partenaires/read.php`);
    return response.json();
};

export const createPartenaire = async (data) => {
    const formData = new FormData();
    formData.append("nom", data.nom);
    formData.append("description", data.description || "");
    formData.append("status", data.status || "publié");
    if (data.logo instanceof File) formData.append("logo", data.logo);

    const response = await fetch(`${API_URL}/partenaires/create.php`, {
        method: "POST",
        body: formData,
    });
    return response.json();
};

export const updatePartenaire = async (data) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("nom", data.nom);
    formData.append("description", data.description || "");
    formData.append("status", data.status || "publié");
    if (data.logo instanceof File) formData.append("logo", data.logo);

    const response = await fetch(`${API_URL}/partenaires/update.php`, {
        method: "POST",
        body: formData,
    });
    return response.json();
};
export const deletePartenaire = async (id) => {
    const response = await fetch(`${API_URL}/partenaires/delete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });
    return response.json();
};

// Statistiques
export const getStats = async () => {
    const response = await fetch(`${API_URL}/stats/dashboard.php`);
    return response.json();
};

// Authentification
export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.json();
};

// Upload d'image (fonction utilitaire si nécessaire)
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/upload/image.php`, {
        method: 'POST',
        body: formData
    });
    return response.json();
};