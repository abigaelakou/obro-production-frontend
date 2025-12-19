import React, { useState, useEffect } from "react";

const initialPartenaire = {
    nom: "",
    description: "",
    logo: null,
    status: "publié"
};

export default function FormPartenaire({ onSubmit, editingItem, onCancel }) {
    const [form, setForm] = useState(initialPartenaire);

    // ⚡️ Fusionner avec l’objet initial si on édite
    useEffect(() => {
        if (editingItem) {
            setForm({ ...initialPartenaire, ...editingItem });
        } else {
            setForm(initialPartenaire);
        }
    }, [editingItem]);

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm(initialPartenaire); // reset après envoi
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200"
        >
            <h3 className="text-xl font-bold mb-4">
                {editingItem ? "Modifier le partenaire" : "Nouveau Partenaire"}
            </h3>

            <div className="grid gap-4">
                <input
                    placeholder="Nom du partenaire"
                    value={form.nom}
                    onChange={(e) => updateField("nom", e.target.value)}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 outline-none"
                />

                {/* Upload logo */}
                <div>
                    <label className="block text-sm font-semibold mb-2">Logo du partenaire</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => updateField("logo", e.target.files[0])}
                        className="p-3 border-2 border-gray-300 rounded-xl w-full"
                    />

                    {form.logo && form.logo instanceof File && (
                        <img
                            src={URL.createObjectURL(form.logo)}
                            alt="Aperçu logo"
                            className="mt-2 h-24 w-24 object-contain rounded-xl border"
                        />
                    )}
                    {editingItem && editingItem.logo && !(form.logo instanceof File) && (
                        <img
                            src={editingItem.logo}
                            alt="Logo actuel"
                            className="mt-2 h-24 w-24 object-contain rounded-xl border"
                        />
                    )}
                </div>

                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    rows={3}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 outline-none"
                />

                {/* Boutons */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold"
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
