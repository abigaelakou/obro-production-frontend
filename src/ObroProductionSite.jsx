/**
 * @description      : O'BRO Production Site - Partie 1/3
 * @author           : AbigaelHOMENYA
 * @group            : 
 * @created          : 12/12/2025 - 08:12:30
 * 
**/
import React, { useState , useEffect,useCallback} from 'react';
import { Film, Users, Star, Briefcase, Menu, X, Play, Calendar, Eye, Heart, Instagram, Facebook,TikTok, Award, Camera, Clapperboard, CheckCircle, XCircle, Clock, Mail, Phone, MapPin, BarChart3, UserPlus, FilmIcon, UserCheck } from 'lucide-react';
import { BASE_URL } from "./services/api";
import { formatNumber } from "./utils/formatNumber";
import FormEquipe from "./FormEquipe";
import FormCasting from "./FormCasting";
import FormPartenaire from "./FormPartenaire";
import FormProduction from "./FormProduction";
import FormUtilisateur from "./FormUtilisateur";


import {
  getPartenaires,
  createPartenaire,
  updatePartenaire,
  deletePartenaire,

//Productions
  getProductions,
  createProduction,
  updateProduction,
  deleteProduction,

  //Celebrites
  getCelebrites,
  createCelebrite,
  updateCelebrite,
  deleteCelebrite,

 //Castings
  getCastings,
  createCasting,
  updateCasting,
  deleteCasting,
  // Candidatures
 getCandidatures,
  createCandidature,
  updateCandidatureStatus,
  deleteCandidature,

// Utilisateurs
  getUsers,
  createUser,
  updateUser,
  updateUserStatus,
  deleteUser

} from "./services/api";

const ObroProductionSite = () => {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  const [productions, setProductions] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [partenaires, setPartenaires] = useState([]);
  
    // Charger toutes les données au démarrage
  useEffect(() => {
    loadAllData();
  }, []);

const handleCandidature = (castingId) => {
  setSelectedCasting(castingId);
  setShowCandidatureForm(true);
  };
  // ÉTAPE 4: Ajouter la fonction submitCandidature
const submitCandidature = async (formData) => {
  try {
    const candidatureData = {
      ...formData,
      id_casting: selectedCasting,
    };

    const response = await createCandidature(candidatureData);

    if (response.message) {
      alert('Candidature envoyée avec succès !');
      setShowCandidatureForm(false);
      setSelectedCasting(null);
      
      // Recharger les candidatures
      const data = await getCandidatures();
      if (data.records) setCandidatures(data.records);
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi de la candidature:", error);
    alert("Erreur lors de l'envoi de la candidature");
  }
};
  
 const loadAllData = async () => {
  try {
    const partData = await getPartenaires();
    if (partData.records) setPartenaires(partData.records);

    const prodData = await getProductions();
    if (prodData.records) setProductions(prodData.records);

    const equipesData = await getCelebrites();
    console.log("Réponse API célébrites:", equipesData);
    if (equipesData.records) setEquipes(equipesData.records);

    // Castings
      const castingData = await getCastings();
    if (castingData.records) setCastings(castingData.records);

    // ✅ Charger les candidatures
    const candidaturesData = await getCandidatures();
    if (candidaturesData.records) setCandidatures(candidaturesData.records);
  
      // ✅ AJOUT: Charger les utilisateurs
    const usersData = await getUsers();
    if (usersData.records) setUsers(usersData.records);
  }
  
  catch (error) {
    console.error("Erreur lors du chargement des données:", error);
  }
};
const [castings, setCastings] = useState([]);
const [candidatures, setCandidatures] = useState([]);


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

  const [showCandidatureForm, setShowCandidatureForm] = useState(false);
  const [selectedCasting, setSelectedCasting] = useState(null);


  const initialForms = {
    partenaires: { nom: '', description: '', logo: null, status: 'publié' },
    castings: { lib_casting: '', description: '', exigences: '', img: null, date_publication: '', date_cloture: '', id_production: '', status: 'publié' },
    productions: { titre: '', genre: '', categorie: '', date_sortie: '', img: null, youtube_url: '', description: '', status: 'publiée' },
    equipes: { nom_celebrite: '', fonction: '', bio: '', description: '', img: null, url_insta: '', url_face: '', url_tiktok: '', status: 'publiée' },
    utilisateurs: { name: '', email: '', role: '', password: '' }
  };
  // State dynamique basé sur l’onglet actif
  const [formData, setFormData] = useState(initialForms[activeTab]);

const navItems = [
    { id: 'home', label: 'Accueil', icon: Film },
    { id: 'productions', label: 'Productions', icon: Clapperboard },
    { id: 'casting', label: 'Casting', icon: Users },
    { id: 'equipes', label: 'Equipes', icon: Star },
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
      totalCelebrites: equipes.length,
      totalPartenaires: partenaires.length,
      candidaturesEnAttente: candidatures.filter(c => c.statut === 'en_attente').length,
      totalCandidatures: candidatures.length,
      totalUtilisateurs: users.length,
      utilisateursActifs: users.filter(u => u.status === 'actif').length,
      vuesTotal: productions.reduce((acc, p) => acc + Number(p.vues || 0), 0),
      likesTotal: productions.reduce((acc, p) => acc + Number(p.likes || 0), 0),

    };
  };

  const handleDelete = async (id, type) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
    switch (type) {
      case "productions":
         try { 
         await deleteProduction(id); 
          setProductions(productions.filter((p) => p.id !== id)); 
          alert("Production supprimée avec succès !"); 
        } catch (err) { 
          console.error("Erreur suppression production:", err); 
          alert("Échec de la suppression de la production."); 
        } 
        break;
      
     case "equipes": 
        try { 
          await deleteCelebrite(id); 
          setEquipes(equipes.filter((c) => c.id !== id)); 
          alert("Membre supprimé avec succès !"); 
        } catch (err) { 
          console.error("Erreur suppression membre:", err); 
          alert("Échec de la suppression du membre."); 
        } break;

      case "partenaires":
        try {
          await deletePartenaire(id); // appel backend
          setPartenaires(partenaires.filter((p) => p.id !== id));
          alert("Partenaire supprimé avec succès !");
        } catch (err) {
          console.error("Erreur suppression partenaire:", err);
          alert("Échec de la suppression du partenaire.");
        }
        break;

      case "castings":
         try { 
          await deleteCasting(id); 
          setCastings(castings.filter((c) => c.id !== id)); 
          alert("Casting supprimé avec succès !"); 
        } catch (err) { 
          console.error("Erreur suppression casting:", err); 
          alert("Échec de la suppression du casting."); 
        } break;
      
      case "utilisateurs":
        try {
          await deleteUser(id);
          setUsers(users.filter((u) => u.id !== id));
          alert("Utilisateur supprimé avec succès !");
        } catch (err) {
          console.error("Erreur suppression utilisateur:", err);
          alert("Échec de la suppression de l'utilisateur.");
        }
        break;

       case "candidatures":
        try {
          await deleteCandidature(id);
          setCandidatures(candidatures.filter((c) => c.id !== id));
          alert("Candidature supprimée avec succès !");
        } catch (err) {
          console.error("Erreur suppression candidature:", err);
          alert("Échec de la suppression de la candidature.");
        }
        break;

      default:
        break;
    }
  }
};
const updateFormField = useCallback((field, value) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
}, []);

  const handleEdit = useCallback((item) => {
  setEditingItem(item);
  setFormData({...item}); // ✅ Copie profonde
  setShowForm(true);
}, []);

const handleToggleUserStatus = async (userId) => {
  try {
    const user = users.find(u => u.id === userId);
    const newStatus = user.status === 'actif' ? 'bloqué' : 'actif';
    
    const response = await updateUserStatus(userId, newStatus);
    
    if (response.message) {
      // Mettre à jour l'état local
      setUsers(users.map(u => {
        if (u.id === userId) {
          return { ...u, status: newStatus };
        }
        return u;
      }));
      
      alert(`Utilisateur ${newStatus === 'actif' ? 'réactivé' : 'bloqué'} avec succès !`);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    alert("Erreur lors de la mise à jour du statut");
  }
};
  
  const getActiveData = () => {
    switch(activeTab) {
      case 'productions': return productions;
      case 'equipes': return equipes;
      case 'partenaires': return partenaires;
      case 'castings': return castings;
      case 'utilisateurs': return users;
      case 'candidatures': return candidatures;
      default: return [];
    }
  };

const resetForm = useCallback(() => {
  setShowForm(false);
  setEditingItem(null);
  setFormData(initialForms[activeTab]);
}, []);
  
  const handleCandidatureStatus = async (candidatureId, newStatus) => {
  try {
    const response = await updateCandidatureStatus(candidatureId, newStatus);
    
    if (response.message) {
      // Mettre à jour l'état local
      setCandidatures(candidatures.map(c => {
        if (c.id === candidatureId) {
          return { ...c, statut: newStatus };
        }
        return c;
      }));
      
      alert(`Candidature ${newStatus === 'acceptée' ? 'acceptée' : 'rejetée'} avec succès !`);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    alert("Erreur lors de la mise à jour du statut");
  }
};

const handleSubmit = async () => {
  try {
    let response;

    if (activeTab === 'productions') {
      if (editingItem) {
        response = await updateProduction({ ...formData, id: editingItem.id });
      } else {
        response = await createProduction(formData);
      }
      if (response && response.message) {
        const data = await getProductions();
        if (data.records) setProductions(data.records);
      }
    } 
    else if (activeTab === 'equipes') {
      if (editingItem) {
        response = await updateCelebrite({ ...formData, id: editingItem.id });
      } else {
        response = await createCelebrite(formData);
      }
      if (response && response.message) {
        const data = await getCelebrites();
        if (data.records) setEquipes(data.records);
      }
    } 
    else if (activeTab === 'partenaires') {
      if (editingItem) {
        response = await updatePartenaire({ ...formData, id: editingItem.id });
      } else {
        response = await createPartenaire(formData);
      }
      if (response && response.message) {
        const data = await getPartenaires();
        if (data.records) setPartenaires(data.records);
      }
    }
    // ✅ CORRECTION ICI - Passer formData comme objet, pas FormData vide
    else if (activeTab === "castings") {
      if (editingItem) {
        response = await updateCasting({ ...formData, id: editingItem.id });
      } else {
        response = await createCasting(formData);
      }
      if (response && response.message) {
        const data = await getCastings();
        if (data.records) setCastings(data.records);
      }
    }

     else if (activeTab === 'utilisateurs') {
      if (editingItem) {
        response = await updateUser({ 
          id: editingItem.id,
          name: formData.name,
          email: formData.email,
          role: formData.role
        });
      } else {
        response = await createUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
      }
      
      if (response && response.message) {
        const data = await getUsers();
        if (data.records) setUsers(data.records);
      }
    }

  if (response && response.message) {
    alert(response.message);
      resetForm();
    } else {
      alert("Enregistrement effectué (vérifier la base de données)");
      resetForm();
      await loadAllData();
    }
  } catch (error) {
    console.error("Erreur:", error);
    alert("Enregistrement effectué malgré l'erreur. Rechargement des données...");
    setShowForm(false);
    setEditingItem(null);
    // setFormData({});
    await loadAllData();
  }
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
              <h2 className="text-5xl font-bold text-white mb-6">QUI SOMMES-NOUS ?</h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  <em className="text-3xl text-red-400 font-bold">O'BRO PRODUCTION</em> est une société bidimensionnelle dont le business model est basé sur deux composantes :
              </p>
            <ul className="space-y-4 text-gray-300">
              <li className='text-justify'>✔ Une composante audiovisuelle avec pour domaine d’intervention la fiction, la création de 
                    contenu télé, la production de films documentaire et la couverture médiatique pour les 
                    déplacements et/ou évènements officiels
              </li>
              <li className='text-justify'>✔ Une composante Conseils en accompagnant les entreprises dans leurs études de marché et 
                    dans l’optimisation de la réalisation de leurs vidéos .
              </li>

                <li className='text-justify'>S’appuyant sur un personnel jeune mais expérimenté, O’BRO Production jouit d’une grande 
                  expérience sur les différentes étapes de la production audiovisuelle notamment l’écriture, la 
                  production et la post-production.
              </li>
            </ul>

           
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">{productions.length}+</div>
                  <div className="text-gray-400">Productions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">{equipes.length}+</div>
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
                    src={`${BASE_URL}/${prod.img}`}
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
                        {/* {prod.vues.toLocaleString()} */}
                        {formatNumber(prod.vues)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={16} />
                        {formatNumber(prod.likes)}
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
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full my-8 max-h-screen overflow-y-auto">
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
                      <label className="block text-white mb-2 font-semibold">Téléphone *</label>
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
                      <label className="block text-white mb-2 font-semibold">Vidéo de présentation (URL)</label>
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
                  
                    <img src={`${BASE_URL}/${casting.img}`}
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
               <img 
                src="/logoObro2.png"   
                alt="O'BRO Production" 
                className="h-full max-h-12 object-contain" 
              />
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
          {['dashboard', 'productions', 'equipes', 'partenaires', 'castings', 'candidatures', 'utilisateurs'].map(tab => (
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
        // ✅ SECTION CANDIDATURES
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Candidatures</h2>
          
          {candidatures.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">Aucune candidature pour le moment</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left font-semibold">ID</th>
                    <th className="p-3 text-left font-semibold">Nom</th>
                    <th className="p-3 text-left font-semibold">Email</th>
                    <th className="p-3 text-left font-semibold">Téléphone</th>
                    <th className="p-3 text-left font-semibold">Casting</th>
                    <th className="p-3 text-left font-semibold">Date</th>
                    <th className="p-3 text-left font-semibold">Statut</th>
                    <th className="p-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidatures.map(candidature => {
                    const casting = castings.find(c => c.id === candidature.id_casting);
                    return (
                      <tr key={candidature.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{candidature.id}</td>
                        <td className="p-3 font-semibold">{candidature.nom}</td>
                        <td className="p-3">{candidature.email}</td>
                        <td className="p-3">{candidature.telephone}</td>
                        <td className="p-3">
                          <span className="text-sm text-gray-600">
                            {candidature.lib_casting || casting?.lib_casting || 'N/A'}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-gray-600">
                          {candidature.date_candidature 
                            ? new Date(candidature.date_candidature).toLocaleDateString('fr-FR')
                            : 'N/A'}
                        </td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            candidature.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                            candidature.statut === 'acceptée' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {candidature.statut === 'en_attente' ? 'En attente' :
                            candidature.statut === 'acceptée' ? 'Acceptée' : 
                            candidature.statut === 'rejetée' ? 'Rejetée' : candidature.statut}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2 flex-wrap">
                            {candidature.statut === 'en_attente' && (
                              <>
                                <button 
                                  onClick={() => handleCandidatureStatus(candidature.id, 'acceptée')}
                                  className="text-green-600 hover:text-green-800 font-semibold text-sm"
                                >
                                  ✓ Accepter
                                </button>
                                <button 
                                  onClick={() => handleCandidatureStatus(candidature.id, 'rejetée')}
                                  className="text-orange-600 hover:text-orange-800 font-semibold text-sm"
                                >
                                  ✗ Rejeter
                                </button>
                              </>
                            )}
                            {candidature.cv_url && (
                              <a 
                                href={candidature.cv_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                              >
                                📄 CV
                              </a>
                            )}
                            {candidature.video_url && (
                              <a 
                                href={candidature.video_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:text-purple-800 font-semibold text-sm"
                              >
                                🎥 Vidéo
                              </a>
                            )}
                            <button 
                              onClick={() => handleDelete(candidature.id, 'candidatures')}
                              className="text-red-600 hover:text-red-800 font-semibold text-sm"
                            >
                              🗑️ Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )  :
           (
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
                   setFormData(initialForms[activeTab]);
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                {showForm ? 'Annuler' : 'Ajouter'}
              </button>
                </div>
          {/* /PRODUCTION */}
           {showForm && activeTab === "productions" && (
            <FormProduction
              editingItem={editingItem}
              onSubmit={async (form) => {
                let response;
                if (editingItem) {
                  response = await updateProduction({ ...form, id: editingItem.id });
                } else {
                  response = await createProduction(form);
                }
                if (response && response.message) {
                  const data = await getProductions();
                  if (data.records) setProductions(data.records);
                  alert(response.message);
                }
                setEditingItem(null);
                setShowForm(false);
              }}
              onCancel={() => {
                setEditingItem(null);
                setShowForm(false);
              }}
            />
          )}

               {/* ÉQUIPE */}
          {showForm && activeTab === "equipes" && (
            <FormEquipe
              editingItem={editingItem}
              onSubmit={async (form) => {
                let response;
                if (editingItem) {
                  response = await updateCelebrite({ ...form, id: editingItem.id });
                } else {
                  response = await createCelebrite(form);
                }
                if (response && response.message) {
                  const data = await getCelebrites();
                  if (data.records) setEquipes(data.records);
                  alert(response.message);
                }
                setEditingItem(null);
                setShowForm(false);
              }}
              onCancel={() => {
                setEditingItem(null);
                setShowForm(false);
              }}
            />
          )}

            {/* Partenaires */}
         {showForm && activeTab === "partenaires" && (
          <FormPartenaire
            editingItem={editingItem}
            onSubmit={async (form) => {
              let response;
              if (editingItem) {
                response = await updatePartenaire({ ...form, id: editingItem.id });
              } else {
                response = await createPartenaire(form);
              }
              if (response && response.message) {
                const data = await getPartenaires();
                if (data.records) setPartenaires(data.records);
                alert(response.message);
              }
              setEditingItem(null);
              setShowForm(false);
            }}
            onCancel={() => {
              setEditingItem(null);
              setShowForm(false);
            }}
          />
          )}


           {/* CASTING */}
        {showForm && activeTab === "castings" && (
          <FormCasting
            productions={productions}
            editingItem={editingItem}
            onSubmit={async (form) => {
              let response;
              if (editingItem) {
                response = await updateCasting({ ...form, id: editingItem.id });
              } else {
                response = await createCasting(form);
              }
              if (response && response.message) {
                const data = await getCastings();
                if (data.records) setCastings(data.records);
                alert(response.message);
              }
              setEditingItem(null);
              setShowForm(false);
            }}
            onCancel={() => {
              setEditingItem(null);
              setShowForm(false);
            }}
          />
        )}


          {/* Utilisateurs */}
           {showForm && activeTab === "utilisateurs" && (
            <FormUtilisateur
              editingItem={editingItem}
              onSubmit={async (form) => {
                let response;
                if (editingItem) {
                  response = await updateUser({
                    id: editingItem.id,
                    name: form.name,
                    email: form.email,
                    role: form.role
                  });
                } else {
                  response = await createUser({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    role: form.role
                  });
                }
                if (response && response.message) {
                  const data = await getUsers();
                  if (data.records) setUsers(data.records);
                  alert(response.message);
                }
                setEditingItem(null);
                setShowForm(false);
              }}
              onCancel={() => {
                setEditingItem(null);
                setShowForm(false);
              }}
            />
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
                       activeTab === 'equipes' ? 'Nom' :
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
                    {activeTab === 'equipes' && (
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
                          <img src={`${BASE_URL}/${item.img}`}
                            alt={item.titre} className="w-12 h-12 object-cover rounded-lg" />
                          <div>
                            <div className="font-semibold">{item.titre}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{item.categorie}</td>
                      <td className="p-3">{item.genre}</td>
                      <td className="p-3">{formatNumber(item.vues)}</td>

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
                  
                  {activeTab === 'equipes' && equipes.map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img src={`http://localhost/obro-production-backend/${item.img}`} 
                          alt={item.img} className="w-12 h-12 object-cover rounded-full" />
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
                          onClick={() => handleDelete(item.id, 'equipes')}
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
                          <img src={`http://localhost/obro-production-backend/${item.logo}`} alt={item.nom} className="h-10 w-20 object-contain" />
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
                          {item.status === 'actif' ? 'Bloquer' : 'Réactiver'}
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

const EquipeDirigeanteView = () => (
  <div className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-900 to-black min-h-screen">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-6xl font-bold text-white mb-3 md:mb-4 text-center animate-fade-in">
        Notre Équipe Dirigeante
      </h2>
      <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-12 text-center">
        Découvrez les leaders qui portent O'BRO Production
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {equipes.map((membre, index) => (
          <div 
            key={membre.id} 
            className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Photo */}
            <div className="h-96 md:h-[28rem]">
    
              <img 
                src={`http://localhost/obro-production-backend/${membre.img}`} 
                alt={membre.nom_celebrite}
              className="w-full h-full object-cover transform hover:scale-110 transition-all duration-500"
              />
            </div>

            {/* Contenu */}
            <div className="p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{membre.nom_celebrite}</h3>
              <h2 className="text-xl md:text-2xl text-red-500 font-bold mb-4">{membre.fonction}</h2>
              <p className="text-sm md:text-base text-gray-300 font-semibold mb-4">{membre.bio}</p>
              
              <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4 text-justify">
                {membre.description}
              </p>

              {/* Liens sociaux */}
              <div className="flex gap-4 justify-center">
                <a 
                  href={membre.url_insta} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-3 rounded-full hover:scale-110 transition-all"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href={membre.url_face} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-3 rounded-full hover:scale-110 transition-all"
                >
                  <Facebook size={20} />
                </a>
                {/* <a 
                  href={membre.url_tiktok} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-3 rounded-full hover:scale-110 transition-all"
                >
                  <TikTok size={20} />
                </a> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);


const PartenairesView = () => (
  <div className="bg-black text-white min-h-screen">
    <div>
       <h3 className="text-4xl md:text-4xl font-bold text-center mb-4 animate-fade-in">
          POURQUOI TRAVAILLER AVEC NOUS… ?
        </h3>
    </div>
   

    {/* SECTION SUCCÈS */}
    <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Texte */}
        <div className="space-y-5 animate-slide-in-left">
          <h3 className="text-3xl md:text-4xl font-bold">
            Les facteurs clés de notre succès
          </h3>

          <ul className="space-y-4 text-gray-300">
            <li>✔ Une équipe qualifiée, typiquement africaine et multilingue</li>
            <li>✔ Une structure en plein développement avec des projets originaux</li>
            <li>✔ Des séries à succès :
              <span className="italic"> Une femme pour Dibi Kan </span>
              et
              <span className="italic"> Les aventures de Papa Notchet</span>
            </li>
            <li>✔ Des partenaires de confiance : RTI2, LIFE TV, Cinered</li>
            <li>✔ Une optimisation du placement de vos produits grâce à notre équipe d’experts</li>
          </ul>
        </div>

        {/* Visuel */}
        <div className="animate-slide-in-right">
          <img
            src="/success.png"
            alt="Succès"
            className="rounded-2xl shadow-lg"
          />
        </div>

      </div>
    </section>
 {/* SECTION PARTENAIRES */}
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
       
        <p className="text-gray-400 text-center mb-12">
          Ils nous font confiance
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partenaires
            .filter(p => p.status === 'publié')
            .map((part, index) => (
              <div
                key={part.id}
                className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center
                hover:shadow-2xl transition-all transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={`${BASE_URL}/${part.logo}`}
                  alt={part.nom}
                  className="h-24 object-contain mb-4"
                />
                <h3 className="text-gray-900 font-bold text-center">
                  {part.nom}
                </h3>
              </div>
            ))}
        </div>
      </div>
    </section>
    {/* SECTION SERVICES */}
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Visuel */}
        <div className="order-2 md:order-1 animate-slide-in-left">
          <img
            src="/services.png"
            alt="Services"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Texte */}
        <div className="order-1 md:order-2 space-y-6 animate-slide-in-right">
          <h3 className="text-3xl md:text-4xl font-bold">
            Les services que nous proposons
          </h3>

          <ul className="space-y-4 text-gray-300">
            <li>✔ Apposition du logo de l’annonceur dans :
              <ul className="ml-6 list-disc text-gray-400">
                <li>Vidéos (début, milieu, fin)</li>
                <li>Capsules publicitaires</li>
              </ul>
            </li>

            <li>✔ Expositions :
              <ul className="ml-6 list-disc text-gray-400">
                <li>Site internet (bandeau partenaires)</li>
                <li>Mentions lors des entretiens avec la presse</li>
              </ul>
            </li>

            <li>
              ✔ Publicité d’un article spécifique intégré dans les scènes de tournage
            </li>
          </ul>
        </div>

      </div>
    </section>

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
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer" 
              onClick={() => setCurrentView('home')}
            >
              <img 
                src="/logoObro2.png"   
                alt="O'BRO Production" 
                className="h-full max-h-12 object-contain rounded-lg" 
              />
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
          {currentView === 'equipes' && <EquipeDirigeanteView />}
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
                  Siège Social | Angré 8è tranche Immeuble BRAKA. 22 BP 35 Abidjan 22 | Numéro du CC (NCC) : 1925322 L
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