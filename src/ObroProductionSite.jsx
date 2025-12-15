/**
 * @description      : O'BRO Production Site - Partie 1/3
 * @author           : AbigaelHOMENYA
 * @group            : 
 * @created          : 12/12/2025 - 08:12:30
 * 
**/
import React, { useState } from 'react';
import { Film, Users, Star, Briefcase, Menu, X, Play, Calendar, Eye, Heart, Instagram, Facebook, Award, Camera, Clapperboard, CheckCircle, XCircle, Clock, Mail, Phone, MapPin, BarChart3, UserPlus, FilmIcon, UserCheck } from 'lucide-react';

const ObroProductionSite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  const [productions, setProductions] = useState([
    {
      id: 1,
      titre: "L'Héritage",
      genre: "Drame",
      categorie: "Film",
      date_sortie: "2024-06-15",
      img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
      youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      status: "publiée",
      vues: 15420,
      likes: 892,
      description: "Un drame captivant sur les liens familiaux en Côte d'Ivoire"
    },
    {
      id: 2,
      titre: "Destins Croisés",
      genre: "Romance",
      categorie: "Série",
      date_sortie: "2024-09-20",
      img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
      youtube_url: "https://www.youtube.com/watch?v=example",
      status: "publiée",
      vues: 28350,
      likes: 1543,
      description: "Une série romantique se déroulant à Abidjan"
    }
  ]);

  const [celebrites, setCelebrites] = useState([
    {
      id: 1,
      nom_celebrite: "Konan Joseph",
      fonction: "Acteur Principal",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      url_insta: "https://www.instagram.com/konanjoseph",
      url_face: "https://www.facebook.com/konanjoseph",
      url_tiktok: "https://www.tiktok.com/@konanjoseph",
      status: "publiée",
      bio: "Acteur ivoirien reconnu"
    },
    {
      id: 2,
      nom_celebrite: "Aicha Bamba",
      fonction: "Réalisatrice",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      url_insta: "https://www.instagram.com/aichabamba",
      url_face: "https://www.facebook.com/aichabamba",
      url_tiktok: "https://www.tiktok.com/@aichabamba",
      status: "publiée",
      bio: "Réalisatrice primée"
    }
  ]);

  const [partenaires, setPartenaires] = useState([
    {
      id: 1,
      nom: "Canal+ Afrique",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200",
      status: "publié",
      description: "Partenaire média principal"
    },
    {
      id: 2,
      nom: "Netflix International",
      logo: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200",
      status: "publié",
      description: "Distribution internationale"
    }
  ]);

  const [castings, setCastings] = useState([
    {
      id: 1,
      lib_casting: "Recherche Acteur Principal - Nouveau Film",
      img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800",
      date_publication: "2024-12-01",
      date_cloture: "2025-01-15",
      id_production: 1,
      status: "publié",
      description: "Nous recherchons un acteur principal pour notre prochain long métrage",
      exigences: "Homme, 25-40 ans, expérience théâtre"
    }
  ]);

  const [candidatures, setCandidatures] = useState([
    {
      id: 1,
      nom: "Kouadio Marc",
      email: "marc@email.com",
      telephone: "+225 07 08 09 10 11",
      id_casting: 1,
      cv_url: "#",
      video_url: "#",
      message: "Je suis très motivé pour ce rôle",
      date_candidature: "2024-12-05",
      statut: "en_attente"
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin Principal",
      email: "admin@obro.com",
      role: "Administrateur",
      status: "actif",
      created_at: "2024-01-15"
    }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [showCandidatureForm, setShowCandidatureForm] = useState(false);
  const [selectedCasting, setSelectedCasting] = useState(null);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Film },
    { id: 'productions', label: 'Productions', icon: Clapperboard },
    { id: 'casting', label: 'Casting', icon: Users },
    { id: 'celebrites', label: 'Célébrités', icon: Star },
    { id: 'partenaires', label: 'Partenaires', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Camera }
  ];

  const handleLogin = () => {
    if (loginData.email === 'admin@obro.com' && loginData.password === 'admin') {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setCurrentView('admin');
      setActiveTab('dashboard');
    } else {
      alert('Email ou mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentView('home');
  };

  const getStats = () => {
    return {
      totalProductions: productions.length,
      productionsPubliees: productions.filter(p => p.status === 'publiée').length,
      totalCastings: castings.length,
      castingsActifs: castings.filter(c => c.status === 'publié').length,
      totalCelebrites: celebrites.length,
      totalPartenaires: partenaires.length,
      candidaturesEnAttente: candidatures.filter(c => c.statut === 'en_attente').length,
      totalCandidatures: candidatures.length,
      totalUtilisateurs: users.length,
      utilisateursActifs: users.filter(u => u.status === 'actif').length,
      vuesTotal: productions.reduce((acc, p) => acc + p.vues, 0),
      likesTotal: productions.reduce((acc, p) => acc + p.likes, 0)
    };
  };

  const handleDelete = (id, type) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      switch(type) {
        case 'productions':
          setProductions(productions.filter(p => p.id !== id));
          break;
        case 'celebrites':
          setCelebrites(celebrites.filter(c => c.id !== id));
          break;
        case 'partenaires':
          setPartenaires(partenaires.filter(p => p.id !== id));
          break;
        case 'castings':
          setCastings(castings.filter(c => c.id !== id));
          break;
        case 'utilisateurs':
          setUsers(users.filter(u => u.id !== id));
          break;
        case 'candidatures':
          setCandidatures(candidatures.filter(c => c.id !== id));
          break;
        default:
          break;
      }
      alert('Élément supprimé avec succès !');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'actif' ? 'bloqué' : 'actif'
        };
      }
      return user;
    }));
    alert('Statut de l\'utilisateur modifié avec succès !');
  };
  
  const getActiveData = () => {
    switch(activeTab) {
      case 'productions': return productions;
      case 'celebrites': return celebrites;
      case 'partenaires': return partenaires;
      case 'castings': return castings;
      case 'utilisateurs': return users;
      case 'candidatures': return candidatures;
      default: return [];
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleCandidatureStatus = (candidatureId, newStatus) => {
    setCandidatures(candidatures.map(c => {
      if (c.id === candidatureId) {
        return { ...c, statut: newStatus };
      }
      return c;
    }));
    alert(`Candidature ${newStatus === 'acceptée' ? 'acceptée' : 'rejetée'} avec succès !`);
  };

    const handleSubmit = () => {
    if (editingItem) {
      switch(activeTab) {
        case 'productions':
          setProductions(productions.map(p => p.id === editingItem.id ? {...formData, id: p.id} : p));
          break;
        case 'celebrites':
          setCelebrites(celebrites.map(c => c.id === editingItem.id ? {...formData, id: c.id} : c));
          break;
        case 'partenaires':
          setPartenaires(partenaires.map(p => p.id === editingItem.id ? {...formData, id: p.id} : p));
          break;
        case 'castings':
          setCastings(castings.map(c => c.id === editingItem.id ? {...formData, id: c.id} : c));
          break;
        case 'utilisateurs':
          setUsers(users.map(u => u.id === editingItem.id ? {...formData, id: u.id} : u));
          break;
        default:
          break;
      }
      alert('Elément modifié avec succès!');
    } else {
      const newId = Math.max(...getActiveData().map(i => i.id), 0) + 1;
      const newItem = {...formData, id: newId, created_at: new Date().toISOString().split('T')[0]};
      
      switch(activeTab) {
        case 'productions':
          setProductions([...productions, {...newItem, vues: 0, likes: 0, status: 'publiée'}]);
          break;
        case 'celebrites':
          setCelebrites([...celebrites, {...newItem, status: 'publiée'}]);
          break;
        case 'partenaires':
          setPartenaires([...partenaires, {...newItem, status: 'publié'}]);
          break;
        case 'castings':
          setCastings([...castings, {...newItem, status: 'publié', date_publication: new Date().toISOString().split('T')[0]}]);
          break;
        case 'utilisateurs':
          setUsers([...users, {...newItem, status: 'actif'}]);
          break;
        default:
          break;
      }
      alert('Un élément ajouté avec succès !');
    }
    
    setShowForm(false);
    setEditingItem(null);
    setFormData({});
  };
 const HeroSection = () => (
    <div className="relative min-h-screen">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-black opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1600)',
            filter: 'brightness(0.4)'
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-6xl">
          <div className="mb-8 flex justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all">
              <div className="text-7xl font-bold text-black">O'BRO</div>
              <div className="text-3xl text-red-600 font-bold">PRODUCTION</div>
            
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
          Créateurs d'émotions
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-gray-200 font-light">
            Production audiovisuelle d'excellence
          </p>
          <p className="text-xl md:text-2xl mb-8 text-red-400 font-semibold">
            Films - Séries - Documentaires | Abidjan, Cote d'Ivoire
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4">
            <button 
              onClick={() => setCurrentView('productions')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-2xl w-full sm:w-auto"
            >
              <Play size={24} className="sm:w-7 sm:h-7" />
              <span className="text-center">Découvrir nos productions</span>
            </button>
            <button 
              onClick={() => setCurrentView('casting')}
              className="bg-white hover:bg-gray-100 text-black px-6 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-2xl w-full sm:w-auto"
            >
              <Users size={24} className="sm:w-7 sm:h-7" />
              <span className="text-center">Castings ouverts</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-white mb-6">A propos d'O'BRO Production</h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Basé à Abidjan, O'BRO Production est une maison de production audiovisuelle qui crée des contenus originaux et captivants.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">{productions.length}+</div>
                  <div className="text-gray-400">Productions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">{celebrites.length}+</div>
                  <div className="text-gray-400">Talents</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">{partenaires.length}+</div>
                  <div className="text-gray-400">Partenaires</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="logoObro2.png" 
                alt="O'BRO Production"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
   const ProductionsView = () => (
      <div className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-bold text-white mb-4 text-center">Nos Productions</h2>
          <p className="text-xl text-gray-400 mb-12 text-center">Découvrez nos films et séries </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productions.filter(p => p.status === 'publiée').map(prod => (
              <div key={prod.id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all group">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={prod.img} 
                    alt={prod.titre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {prod.categorie}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{prod.titre}</h3>
                  <p className="text-gray-400 mb-4">{prod.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(prod.date_sortie).toLocaleDateString('fr-FR')}
                    </span>
                    <div className="flex gap-3">
                      <span className="flex items-center gap-1">
                        <Eye size={16} />
                        {prod.vues.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={16} />
                        {prod.likes.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <a 
                    href={prod.youtube_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all block text-center"
                  >
                    <Play size={20} />
                    Regarder sur YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  
    const CastingView = () => (
      <div className="py-20 px-4 bg-black min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-bold text-white mb-4 text-center">Castings Ouverts</h2>
          <p className="text-xl text-gray-400 mb-12 text-center">Rejoignez l'aventure O'BRO Production</p>
          
          {showCandidatureForm && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full my-8">
                <h3 className="text-3xl font-bold text-white mb-4">Postuler au casting</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  submitCandidature({
                    nom: formData.get('nom'),
                    email: formData.get('email'),
                    telephone: formData.get('telephone'),
                    cv_url: formData.get('cv_url'),
                    video_url: formData.get('video_url'),
                    message: formData.get('message')
                  });
                }}>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-white mb-2 font-semibold">Nom complet *</label>
                      <input 
                        name="nom"
                        required
                        type="text" 
                        className="w-full p-2 rounded-xl bg-gray-800 text-white border-2 border-gray-700 focus:border-red-600 outline-none"
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">Email *</label>
                      <input 
                        name="email"
                        required
                        type="email" 
                        className="w-full p-2 rounded-xl bg-gray-800 text-white border-2 border-gray-700 focus:border-red-600 outline-none"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">TÃ©lÃ©phone *</label>
                      <input 
                        name="telephone"
                        required
                        type="tel" 
                        className="w-full p-2 rounded-xl bg-gray-800 text-white border-2 border-gray-700 focus:border-red-600 outline-none"
                        placeholder="+225 XX XX XX XX XX"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">CV (URL) *</label>
                      <input 
                        name="cv_url"
                        required
                        type="url" 
                        className="w-full p-2 rounded-xl bg-gray-800 text-white border-2 border-gray-700 focus:border-red-600 outline-none"
                        placeholder="https://drive.google.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">VidÃ©o de prÃ©sentation (URL)</label>
                      <input 
                        name="video_url"
                        type="url" 
                        className="w-full p-2 rounded-xl bg-gray-800 text-white border-2 border-gray-700 focus:border-red-600 outline-none"
                        placeholder="https://youtube.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">Message de motivation *</label>
                      <textarea 
                        name="message"
                        required
                        rows="4"
                        className="w-full p-2 rounded-xl bg-gray-800 text-white border-2 border-gray-700 focus:border-red-600 outline-none"
                        placeholder="Parlez-nous de vous..."
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button 
                      type="submit"
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg"
                    >
                      Envoyer ma candidature
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowCandidatureForm(false)}
                      className="px-8 bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-xl font-bold"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-8">
            {castings.filter(c => c.status === 'publié').map(casting => {
              const production = productions.find(p => p.id === casting.id_production);
              return (
                <div key={casting.id} className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={casting.img} 
                    alt={casting.lib_casting}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-white mb-4">{casting.lib_casting}</h3>
                    <p className="text-gray-400 mb-4">{casting.description}</p>
                    {casting.date_cloture && (
                      <p className="flex items-center gap-2 text-red-400 mb-4">
                        <Clock size={18} />
                        Cloture: {new Date(casting.date_cloture).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                    <button 
                      onClick={() => handleCandidature(casting.id)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                    >
                      <UserPlus size={24} />
                      Postuler maintenant
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  
 const AdminView = () => (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-red-600 to-red-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-lg">
              <span className="text-2xl font-bold text-black">O'BRO</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Administration</h1>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-white hover:bg-gray-100 text-red-600 px-6 py-2 rounded-lg font-semibold"
          >
            Déconnexion
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['dashboard', 'productions', 'celebrites', 'partenaires', 'castings', 'candidatures', 'utilisateurs'].map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setShowForm(false); }}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab === 'dashboard' ? 'Tableau de bord' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' ? (
          <DashboardView />
        ) : activeTab === 'candidatures' ? (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Candidatures</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left font-semibold">Nom</th>
                    <th className="p-3 text-left font-semibold">Email</th>
                    <th className="p-3 text-left font-semibold">Téléphone</th>
                    <th className="p-3 text-left font-semibold">Statut</th>
                    <th className="p-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidatures.map(candidature => (
                    <tr key={candidature.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold">{candidature.nom}</td>
                      <td className="p-3">{candidature.email}</td>
                      <td className="p-3">{candidature.telephone}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          candidature.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                          candidature.statut === 'acceptée' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {candidature.statut === 'en_attente' ? 'En attente' :
                           candidature.statut === 'acceptée' ? 'Acceptée' : 'Rejettée'}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          {candidature.statut === 'en_attente' && (
                            <>
                              <button 
                                onClick={() => handleCandidatureStatus(candidature.id, 'acceptée')}
                                className="text-green-600 hover:text-green-800 font-semibold"
                              >
                                Accepter
                              </button>
                              <button 
                                onClick={() => handleCandidatureStatus(candidature.id, 'rejettée')}
                                className="text-red-600 hover:text-red-800 font-semibold"
                              >
                                Rejeter
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Gestion des {activeTab}
              </h2>
              <button 
                onClick={() => {
                  if (showForm) {
                    resetForm();
                  } else {
                    setShowForm(true);
                    setEditingItem(null);
                    setFormData({});
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                {showForm ? 'Annuler' : 'Ajouter'}
              </button>
                </div>

              {/* Formulaire Productions */}
            {showForm && activeTab === 'productions' && (
              <div className="mb-8 p-6 bg-red-50 rounded-2xl border-2 border-red-200">
                <h3 className="text-xl font-bold mb-4">
                  {editingItem ? 'Modifier' : 'Nouvelle Production'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    placeholder="Titre" 
                    value={formData.titre || ''}
                    onChange={(e) => setFormData({...formData, titre: e.target.value})}
                    className="p-3 border-2 rounded-xl focus:border-red-600 outline-none" 
                  />
                  <input 
                    placeholder="Genre" 
                    value={formData.genre || ''}
                    onChange={(e) => setFormData({...formData, genre: e.target.value})}
                    className="p-3 border-2 rounded-xl focus:border-red-600 outline-none" 
                  />
                  <select
                    value={formData.categorie || ''}
                    onChange={(e) => setFormData({...formData, categorie: e.target.value})}
                    className="p-3 border-2 rounded-xl focus:border-red-600 outline-none"
                  >
                    <option value="">Catégorie</option>
                    <option value="Film">Film</option>
                    <option value="Série">Série</option>
                  </select>
                  <input 
                    type="date" 
                    value={formData.date_sortie || ''}
                    onChange={(e) => setFormData({...formData, date_sortie: e.target.value})}
                    className="p-3 border-2 rounded-xl focus:border-red-600 outline-none" 
                  />
                  <input 
                    placeholder="URL Image" 
                    value={formData.img || ''}
                    onChange={(e) => setFormData({...formData, img: e.target.value})}
                    className="p-3 border-2 rounded-xl focus:border-red-600 outline-none md:col-span-2" 
                  />
                  <input 
                    placeholder="URL YouTube" 
                    value={formData.youtube_url || ''}
                    onChange={(e) => setFormData({...formData, youtube_url: e.target.value})}
                    className="p-3 border-2 rounded-xl focus:border-red-600 outline-none md:col-span-2" 
                  />
                  <textarea
                    placeholder="Description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                    className="p-3 border-2 rounded-xl focus:border-red-600 outline-none md:col-span-2"
                  />
                  <button 
                    onClick={handleSubmit}
                    className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold md:col-span-2"
                  >
                    {editingItem ? 'Mettre à  jour' : 'Enregistrer'}
                  </button>
                </div>
              </div>
            )}

      
            {/* Formulaire celebritÃƒÂ© */}
            {showForm && activeTab === 'celebrites' && (
              <div className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                <h3 className="text-xl font-bold mb-4">
                  {editingItem ? 'Modifier la Célébritée' : 'Nouvelle Célébritée'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    placeholder="Nom complet" 
                    value={formData.nom_celebrite || ''}
                    onChange={(e) => setFormData({...formData, nom_celebrite: e.target.value})}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none" 
                  />
                  <input 
                    placeholder="Fonction (ex: Acteur, RÃƒÂ©alisateur)" 
                    value={formData.fonction || ''}
                    onChange={(e) => setFormData({...formData, fonction: e.target.value})}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none" 
                  />
                  <input 
                    placeholder="URL Photo" 
                    value={formData.img || ''}
                    onChange={(e) => setFormData({...formData, img: e.target.value})}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none md:col-span-2" 
                  />
                  <textarea
                    placeholder="Biographie courte"
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    rows="2"
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none md:col-span-2"
                  />
                  <input 
                    placeholder="URL Instagram (https://www.instagram.com/...)" 
                    value={formData.url_insta || ''}
                    onChange={(e) => setFormData({...formData, url_insta: e.target.value})}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none" 
                  />
                  <input 
                    placeholder="URL Facebook (https://www.facebook.com/...)" 
                    value={formData.url_face || ''}
                    onChange={(e) => setFormData({...formData, url_face: e.target.value})}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none" 
                  />
                  <input 
                    placeholder="URL TikTok (https://www.tiktok.com/@...)" 
                    value={formData.url_tiktok || ''}
                    onChange={(e) => setFormData({...formData, url_tiktok: e.target.value})}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none md:col-span-2" 
                  />
                  <button 
                    onClick={handleSubmit}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold md:col-span-2"
                  >
                    {editingItem ? 'Mettre à  jour' : 'Enregistrer'}
                  </button>
                </div>
              </div>
            )}

            {/* Formulaire Partenaires */}
            {showForm && activeTab === 'partenaires' && (
              <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold mb-4">
                  {editingItem ? 'Modifier le partenaire' : 'Nouveau Partenaire'}
                </h3>
                <div className="grid gap-4">
                  <input 
                    placeholder="Nom du partenaire" 
                    value={formData.nom || ''}
                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 outline-none" 
                  />
                  <input 
                    placeholder="URL du logo" 
                    value={formData.logo || ''}
                    onChange={(e) => setFormData({...formData, logo: e.target.value})}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 outline-none" 
                  />
                  <textarea
                    placeholder="Description (optionnel)"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="2"
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 outline-none"
                  />
                  <button 
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                  >
                    {editingItem ? 'Mettre à  jour' : 'Enregistrer'}
                  </button>
                </div>
              </div>
            )}

            {/* Formulaire Castings */}
            {showForm && activeTab === 'castings' && (
              <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
                <h3 className="text-xl font-bold mb-4">
                  {editingItem ? 'Modifier le casting' : 'Nouveau Casting'}
                </h3>
                <div className="grid gap-4">
                  <input 
                    placeholder="Libellé du casting" 
                    value={formData.lib_casting || ''}
                    onChange={(e) => setFormData({...formData, lib_casting: e.target.value})}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none" 
                  />
                  <textarea
                    placeholder="Description du castiong"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
                  />
                  <textarea
                    placeholder="Exigences du casting"
                    value={formData.exigences || ''}
                    onChange={(e) => setFormData({...formData, exigences: e.target.value})}
                    rows="2"
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
                  />
                  <input 
                    placeholder="URL de l'image" 
                    value={formData.img || ''}
                    onChange={(e) => setFormData({...formData, img: e.target.value})}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none" 
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Date de cloture</label>
                      <input 
                        type="date"
                        value={formData.date_cloture || ''}
                        onChange={(e) => setFormData({...formData, date_cloture: e.target.value})}
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Production associée</label>
                      <select
                        value={formData.id_production || ''}
                        onChange={(e) => setFormData({...formData, id_production: parseInt(e.target.value)})}
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
                      >
                        <option value="">Sélectionner une production</option>
                        {productions.map(prod => (
                          <option key={prod.id} value={prod.id}>{prod.titre}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button 
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                  >
                    {editingItem ? 'Mettre à  jour' : 'Enregistrer'}
                  </button>
                </div>
              </div>
            )}

            {/* Formulaire Utilisateurs */}
            {showForm && activeTab === 'utilisateurs' && (
              <div className="mb-8 p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-200">
                <h3 className="text-xl font-bold mb-4">
                  {editingItem ? 'Modifier l\'utilisateur' : 'Nouvel Utilisateur'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    placeholder="Nom complet" 
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-yellow-600 outline-none" 
                  />
                  <input 
                    placeholder="Email" 
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-yellow-600 outline-none" 
                  />
                  <select
                    value={formData.role || ''}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-yellow-600 outline-none"
                  >
                    <option value="">Selectionner un role</option>
                    <option value="Administrateur">Administrateur</option>
                    <option value="Auditeur">Auditeur</option>
                    <option value="Contributeur">Contributeur</option>
                  </select>
                  {!editingItem && (
                    <input 
                      placeholder="Mot de passe" 
                      type="password"
                      value={formData.password || ''}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="p-3 border-2 border-gray-300 rounded-xl focus:border-yellow-600 outline-none" 
                    />
                  )}
                  <button 
                    onClick={handleSubmit}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-xl font-semibold md:col-span-2"
                  >
                    {editingItem ? 'Mettre à  jour' : 'Enregistrer'}
                  </button>
                </div>
              </div>
            )}
            
            

            {/* Tableaux pour toutes les sections */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left font-semibold">ID</th>
                    <th className="p-3 text-left font-semibold">
                      {activeTab === 'utilisateurs' ? 'Nom' : 
                       activeTab === 'productions' ? 'Titre' :
                       activeTab === 'celebrites' ? 'Nom' :
                       activeTab === 'partenaires' ? 'Nom' :
                       activeTab === 'castings' ? 'Libelle' : 'Nom/Titre'}
                    </th>
                    {activeTab === 'utilisateurs' && (
                      <>
                        <th className="p-3 text-left font-semibold">Email</th>
                        <th className="p-3 text-left font-semibold">Role</th>
                      </>
                    )}
                    {activeTab === 'productions' && (
                      <>
                        <th className="p-3 text-left font-semibold">Catégorie</th>
                        <th className="p-3 text-left font-semibold">Genre</th>
                        <th className="p-3 text-left font-semibold">Vues</th>
                      </>
                    )}
                    {activeTab === 'celebrites' && (
                      <th className="p-3 text-left font-semibold">Fonction</th>
                    )}
                    {activeTab === 'castings' && (
                      <th className="p-3 text-left font-semibold">Date Cloture</th>
                    )}
                    <th className="p-3 text-left font-semibold">Statut</th>
                    <th className="p-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTab === 'productions' && productions.map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img src={item.img} alt={item.titre} className="w-12 h-12 object-cover rounded-lg" />
                          <div>
                            <div className="font-semibold">{item.titre}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{item.categorie}</td>
                      <td className="p-3">{item.genre}</td>
                      <td className="p-3">{item.vues.toLocaleString()}</td>
                      <td className="p-3">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 font-semibold mr-3 transition-colors"
                        >
                          Modifier
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id, 'productions')}
                          className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {activeTab === 'celebrites' && celebrites.map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img src={item.img} alt={item.nom_celebrite} className="w-12 h-12 object-cover rounded-full" />
                          <span className="font-semibold">{item.nom_celebrite}</span>
                        </div>
                      </td>
                      <td className="p-3">{item.fonction}</td>
                      <td className="p-3">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 font-semibold mr-3 transition-colors"
                        >
                          Modifier
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id, 'celebrites')}
                          className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {activeTab === 'partenaires' && partenaires.map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img src={item.logo} alt={item.nom} className="h-10 w-20 object-contain" />
                          <span className="font-semibold">{item.nom}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 font-semibold mr-3 transition-colors"
                        >
                          Modifier
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id, 'partenaires')}
                          className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {activeTab === 'castings' && castings.map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">
                        <div className="font-semibold">{item.lib_casting}</div>
                      </td>
                      <td className="p-3">
                        {item.date_cloture ? new Date(item.date_cloture).toLocaleDateString('fr-FR') : 'N/A'}
                      </td>
                      <td className="p-3">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 font-semibold mr-3 transition-colors"
                        >
                          Modifier
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id, 'castings')}
                          className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {activeTab === 'utilisateurs' && users.map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3 font-semibold">{item.name}</td>
                      <td className="p-3">{item.email}</td>
                      <td className="p-3">{item.role}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.status === 'actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleToggleUserStatus(item.id)}
                          className={`${
                            item.status === 'actif' ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'
                          } font-semibold mr-3 transition-colors`}
                        >
                          {item.status === 'actif' ? 'Bloquer' : 'RÃƒÂ©activer'}
                        </button>
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 font-semibold mr-3 transition-colors"
                        >
                          Modifier
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id, 'utilisateurs')}
                          className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );


  const CelebritesView = () => (
    <div className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-3 md:mb-4 text-center animate-fade-in">Nos Talents</h2>
        <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-12 text-center">Découvrez les artistes qui font O'BRO Production</p>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {celebrites.filter(c => c.status === 'publiée').map((celeb, index) => (
            <div 
              key={celeb.id} 
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-64 md:h-80">
                <img 
                  src={celeb.img} 
                  alt={celeb.nom_celebrite}
                  className="w-full h-full object-cover transform hover:scale-110 transition-all duration-500"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{celeb.nom_celebrite}</h3>
                <p className="text-sm md:text-base text-red-500 font-semibold mb-4">{celeb.fonction}</p>
                <div className="flex gap-4 justify-center">
                  <a 
                    href={celeb.url_insta} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-3 rounded-full hover:scale-110 transition-all"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href={celeb.url_face} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-3 rounded-full hover:scale-110 transition-all"
                  >
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PartenairesView = () => (
    <div className="py-12 md:py-20 px-4 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-3 md:mb-4 text-center animate-fade-in">Nos Partenaires</h2>
        <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-12 text-center">Ils nous font confiance</p>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {partenaires.filter(p => p.status === 'publié').map((part, index) => (
            <div 
              key={part.id} 
              className="bg-white rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-all transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img 
                src={part.logo} 
                alt={part.nom}
                className="max-w-full h-20 md:h-24 object-contain mb-4"
              />
              <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center">{part.nom}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactView = () => (
    <div className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-3 md:mb-4 text-center animate-fade-in">Contactez-nous</h2>
        <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-12 text-center">Nous sommes à votre écoute</p>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="bg-gray-800 rounded-2xl p-6 md:p-8 transform hover:scale-105 transition-all">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-3 md:p-4 rounded-xl">
                <MapPin size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white">Adresse</h3>
                <p className="text-sm md:text-base text-gray-400">Abidjan, Côte d'Ivoire</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-6 md:p-8 transform hover:scale-105 transition-all">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-3 md:p-4 rounded-xl">
                <Mail size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white">Email</h3>
                <p className="text-sm md:text-base text-gray-400">contact@obroproduction.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-2xl p-6 md:p-8">
          <form onSubmit={(e) => {
            e.preventDefault();
            alert('Votre message a été envoyé avec succès!');
            e.target.reset();
          }}>
            <div className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-white mb-2 font-semibold text-sm md:text-base">Nom complet *</label>
                  <input 
                    required
                    type="text" 
                    className="w-full p-3 md:p-4 rounded-xl bg-gray-700 text-white border-2 border-gray-600 focus:border-red-600 outline-none text-sm md:text-base"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2 font-semibold text-sm md:text-base">Téléphone</label>
                  <input 
                    type="tel" 
                    className="w-full p-3 md:p-4 rounded-xl bg-gray-700 text-white border-2 border-gray-600 focus:border-red-600 outline-none text-sm md:text-base"
                    placeholder="+225 XX XX XX XX XX"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white mb-2 font-semibold text-sm md:text-base">Email *</label>
                <input 
                  required
                  type="email" 
                  className="w-full p-3 md:p-4 rounded-xl bg-gray-700 text-white border-2 border-gray-600 focus:border-red-600 outline-none text-sm md:text-base"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-semibold text-sm md:text-base">Message *</label>
                <textarea 
                  required
                  rows="6" 
                  className="w-full p-3 md:p-4 rounded-xl bg-gray-700 text-white border-2 border-gray-600 focus:border-red-600 outline-none text-sm md:text-base"
                  placeholder="Votre message..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transform hover:scale-105 transition-all"
              >
                Envoyer le message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

 const DashboardView = () => {
    const stats = getStats();
    
    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Tableau de Bord</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <FilmIcon size={40} />
              <div className="text-4xl font-bold">{stats.totalProductions}</div>
            </div>
            <div className="text-lg font-semibold">Productions</div>
            <div className="text-sm opacity-90">{stats.productionsPubliees} publiées</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Users size={40} />
              <div className="text-4xl font-bold">{stats.totalCastings}</div>
            </div>
            <div className="text-lg font-semibold">Castings</div>
            <div className="text-sm opacity-90">{stats.castingsActifs} actifs</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Star size={40} />
              <div className="text-4xl font-bold">{stats.totalCelebrites}</div>
            </div>
            <div className="text-lg font-semibold">Candidatures</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <UserCheck size={40} />
              <div className="text-4xl font-bold">{stats.totalCandidatures}</div>
            </div>
            <div className="text-lg font-semibold">Candidatures</div>
            <div className="text-sm opacity-90">{stats.candidaturesEnAttente} en attente</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Eye size={28} className="text-orange-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.vuesTotal.toLocaleString()}</div>
                <div className="text-gray-600">Vues totales</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-pink-100 p-3 rounded-xl">
                <Heart size={28} className="text-pink-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.likesTotal.toLocaleString()}</div>
                <div className="text-gray-600">J'aime totaux</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Briefcase size={28} className="text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalPartenaires}</div>
                <div className="text-gray-600">Partenaires</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Candidatures Récentes</h3>
          <div className="space-y-3">
            {candidatures.slice(0, 5).map(candidature => {
              const casting = castings.find(c => c.id === candidature.id_casting);
              return (
                <div key={candidature.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-gray-900">{candidature.nom}</div>
                    <div className="text-sm text-gray-600">{casting?.lib_casting}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    candidature.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                    candidature.statut === 'acceptée' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {candidature.statut === 'en_attente' ? 'En attente' :
                     candidature.statut === 'acceptée' ? 'Acceptée' : 'Rejettée'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  
   if (!isLoggedIn && currentView === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-black flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-white inline-block p-4 rounded-xl mb-4">
               <img 
                src="logoObro2.png" 
                alt="O'BRO Production"
                className=""
              />
              {/* <div className="text-4xl font-bold text-white">O'BRO</div>
              <div className="text-xl text-red-600 font-bold">PRODUCTION</div> */}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Administration</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Email</label>
              <input 
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="w-full p-4 border-2 rounded-xl focus:border-red-600 outline-none"
                placeholder="admin@obro.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Mot de passe</label>
              <input 
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full p-4 border-2 rounded-xl focus:border-red-600 outline-none"
                placeholder="....."
              />
            </div>
            <button 
              onClick={handleLogin}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg"
            >
              Se connecter
            </button>
            <div className="bg-gray-100 rounded-xl p-4">
              <p className="text-sm text-gray-600 text-center font-semibold">
                {/* Demo: admin@obro.com / admin */}
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setCurrentView('home')}
            className="w-full mt-6 text-gray-600 hover:text-gray-900 font-semibold"
          >
            Retour au site
          </button>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return <AdminView />;
  }

  return (
    <>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
          animation-delay: 0.2s;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        /* Responsive font sizing */
        @media (max-width: 768px) {
          html {
            font-size: 14px;
          }
        }
        
        @media (max-width: 480px) {
          html {
            font-size: 13px;
          }
        }
      `}</style>
      
      <div className="min-h-screen bg-black">
        <nav className="fixed w-full bg-black/95 backdrop-blur-sm z-50 shadow-2xl border-b border-red-900/30">
          <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={() => setCurrentView('home')}>
              <div className="bg-white p-2 md:p-3 rounded-xl hover:scale-105 transition-all">
                <span className="text-lg md:text-2xl font-bold text-black">O'BRO</span>
              </div>
              <span className="text-red-600 font-bold text-lg md:text-2xl">PRODUCTION</span>
            </div>
            
            <div className="hidden md:flex gap-2 lg:gap-3">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl font-semibold text-sm lg:text-base transition-all ${
                      currentView === item.id 
                        ? 'bg-red-600 text-white scale-105' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentView('admin')}
                className="bg-red-600 hover:bg-red-700 text-white px-3 lg:px-4 py-2 rounded-xl font-semibold text-sm lg:text-base hover:scale-105 transition-all"
              >
                Admin
              </button>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:scale-110 transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-gray-900 px-4 py-4 space-y-2 animate-fade-in">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setCurrentView(item.id); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-2 text-left px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-all text-sm"
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={() => { setCurrentView('admin'); setIsMenuOpen(false); }}
                className="w-full bg-red-600 text-white px-4 py-3 rounded-xl font-semibold text-sm hover:bg-red-700 transition-all"
              >
                Admin
              </button>
            </div>
          )}
        </nav>

        <div className="pt-16 md:pt-20">
          {currentView === 'home' && <HeroSection />}
          {currentView === 'productions' && <ProductionsView />}
          {currentView === 'casting' && <CastingView />}
          {currentView === 'celebrites' && <CelebritesView />}
          {currentView === 'partenaires' && <PartenairesView />}
          {currentView === 'contact' && <ContactView />}
        </div>

        <footer className="bg-black text-white py-12 md:py-16 px-4 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
              <div>
                <div className="flex items-center gap-2 md:gap-3 mb-4">
                  <div className="bg-white inline-block p-2 md:p-3 rounded-xl mb-3">
                    <img 
                      src="logoObro2.png" 
                      alt="O'BRO Production"
                      className="h-8 md:h-10"
                    />
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-400 mb-4">
                  Production audiovisuelle à Abidjan, Côte d'Ivoire
                </p>
                <div className="flex gap-4">
                  <a href="#" className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-3 rounded-full hover:scale-110 transition-all">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:scale-110 transition-all">
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-base md:text-lg font-bold mb-4">Navigation</h3>
                <ul className="space-y-2">
                  {navItems.map(item => (
                    <li key={item.id}>
                      <button 
                        onClick={() => setCurrentView(item.id)}
                        className="text-sm md:text-base text-gray-400 hover:text-white transition-all"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-base md:text-lg font-bold mb-4">Contact</h3>
                <ul className="space-y-3 text-gray-400 text-sm md:text-base">
                  <li className="flex items-center gap-2">
                    <MapPin size={16} />
                    Abidjan, Côte d'Ivoire
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail size={16} />
                    contact@obroproduction.com
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-6 md:pt-8 text-center text-gray-500 text-xs md:text-sm">
              <p>© 2025 O'BRO Production. Tous droits réservés</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ObroProductionSite;