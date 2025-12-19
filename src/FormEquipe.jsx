import React, { useState, useEffect } from "react";

const initialEquipe = {
    nom_celebrite: "",
    fonction: "",
    bio: "",
    description: "",
    url_insta: "",
    url_face: "",
    url_tiktok: "",
    img: null,
    status: "publiée"
};

export default function FormEquipe({ onSubmit, editingItem, onCancel }) {
    const [form, setForm] = useState(initialEquipe);

    // ⚡️ Si on édite un membre, fusionner avec l’objet initial
    useEffect(() => {
        if (editingItem) {
            setForm({ ...initialEquipe, ...editingItem });
        } else {
            setForm(initialEquipe);
        }
    }, [editingItem]);

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm(initialEquipe); // reset après envoi
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200"
        >
            <h3 className="text-xl font-bold mb-4">
                {editingItem ? "Modifier un Membre" : "Nouveau Membre de l'Équipe"}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
                <input
                    placeholder="Nom complet"
                    value={form.nom_celebrite}
                    onChange={(e) => updateField("nom_celebrite", e.target.value)}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none"
                />
                <input
                    placeholder="Fonction"
                    value={form.fonction}
                    onChange={(e) => updateField("fonction", e.target.value)}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none"
                />

                <input
                    placeholder="Biographie"
                    value={form.bio}
                    onChange={(e) => updateField("bio", e.target.value)}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none"
                />
                <textarea
                    placeholder="Description détaillée"
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    rows="3"
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none"
                />

                {/* Liens sociaux */}
                <div className="md:col-span-2 grid md:grid-cols-3 gap-4">
                    <input
                        placeholder="URL Instagram"
                        value={form.url_insta}
                        onChange={(e) => updateField("url_insta", e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none"
                    />
                    <input
                        placeholder="URL Facebook"
                        value={form.url_face}
                        onChange={(e) => updateField("url_face", e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none"
                    />
                    <input
                        placeholder="URL TikTok"
                        value={form.url_tiktok}
                        onChange={(e) => updateField("url_tiktok", e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none"
                    />
                </div>

                {/* Upload image */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Photo du membre</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => updateField("img", e.target.files[0])}
                        className="p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none w-full"
                    />

                    {form.img && form.img instanceof File && (
                        <img
                            src={URL.createObjectURL(form.img)}
                            alt="Aperçu"
                            className="mt-2 h-32 w-32 object-cover rounded-full border"
                        />
                    )}
                    {editingItem && editingItem.img && !(form.img instanceof File) && (
                        <img
                            src={editingItem.img}
                            alt="Image actuelle"
                            className="mt-2 h-32 w-32 object-cover rounded-full border"
                        />
                    )}
                </div>

                {/* Boutons */}
                <div className="md:col-span-2 flex gap-4">
                    <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold"
                    >
                        {editingItem ? "Mettre à jour" : "Enregistrer"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-400 hover:bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </form>
    );
}
