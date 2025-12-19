import React, { useState, useEffect } from "react";

const initialUser = {
    name: "",
    email: "",
    role: "",
    password: "",
    status: "actif"
};

export default function FormUtilisateur({ onSubmit, editingItem, onCancel }) {
    const [form, setForm] = useState(initialUser);

    // ⚡️ Fusionner avec l’objet initial si on édite
    useEffect(() => {
        if (editingItem) {
            setForm({ ...initialUser, ...editingItem });
        } else {
            setForm(initialUser);
        }
    }, [editingItem]);

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm(initialUser); // reset après envoi
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-200"
        >
            <h3 className="text-xl font-bold mb-4">
                {editingItem ? "Modifier l'utilisateur" : "Nouvel Utilisateur"}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
                <input
                    placeholder="Nom complet"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-yellow-600 outline-none"
                />
                <input
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-yellow-600 outline-none"
                />

                <select
                    value={form.role}
                    onChange={(e) => updateField("role", e.target.value)}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-yellow-600 outline-none"
                >
                    <option value="">Sélectionner un rôle</option>
                    <option value="Administrateur">Administrateur</option>
                    <option value="Auditeur">Auditeur</option>
                    <option value="Contributeur">Contributeur</option>
                </select>

                {/* Le champ mot de passe n’apparaît que lors de la création */}
                {!editingItem && (
                    <input
                        placeholder="Mot de passe"
                        type="password"
                        value={form.password}
                        onChange={(e) => updateField("password", e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-xl focus:border-yellow-600 outline-none"
                    />
                )}

                {/* Boutons */}
                <div className="md:col-span-2 flex gap-4">
                    <button
                        type="submit"
                        className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-xl font-semibold"
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
