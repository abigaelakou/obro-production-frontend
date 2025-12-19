import React, { useState, useEffect } from "react";

const initialCasting = {
    lib_casting: "",
    description: "",
    exigences: "",
    img: null,
    date_publication: "",
    date_cloture: "",
    id_production: "",
    status: "publié"
};

export default function FormCasting({ productions, onSubmit, editingItem, onCancel }) {
    const [form, setForm] = useState(initialCasting);

    // ⚡️ Fusionner avec l’objet initial si on édite
    useEffect(() => {
        if (editingItem) {
            setForm({ ...initialCasting, ...editingItem });
        } else {
            setForm(initialCasting);
        }
    }, [editingItem]);

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm(initialCasting); // reset après envoi
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200"
        >
            <h3 className="text-xl font-bold mb-4">
                {editingItem ? "Modifier le casting" : "Nouveau Casting"}
            </h3>

            <div className="grid gap-4">
                {/* Libellé */}
                <input
                    placeholder="Libellé du casting"
                    value={form.lib_casting}
                    onChange={(e) => updateField("lib_casting", e.target.value)}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
                />

                {/* Description */}
                <textarea
                    placeholder="Description du casting"
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    rows={3}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
                />

                {/* Exigences */}
                <textarea
                    placeholder="Exigences du casting"
                    value={form.exigences}
                    onChange={(e) => updateField("exigences", e.target.value)}
                    rows={2}
                    className="p-3 border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
                />

                {/* Upload image */}
                <div>
                    <label className="block text-sm font-semibold mb-2">Image du casting</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => updateField("img", e.target.files[0])}
                        className="p-3 border-2 border-gray-300 rounded-xl w-full"
                    />

                    {form.img && form.img instanceof File && (
                        <img
                            src={URL.createObjectURL(form.img)}
                            alt="Aperçu image"
                            className="mt-2 h-32 w-32 object-cover rounded-xl border"
                        />
                    )}
                    {editingItem && editingItem.img && !(form.img instanceof File) && (
                        <img
                            src={editingItem.img}
                            alt="Image actuelle"
                            className="mt-2 h-32 w-32 object-cover rounded-xl border"
                        />
                    )}
                </div>

                {/* Dates + Production associée */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Date de création</label>
                        <input
                            type="date"
                            value={form.date_publication}
                            onChange={(e) => updateField("date_publication", e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Date de clôture</label>
                        <input
                            type="date"
                            value={form.date_cloture}
                            onChange={(e) => updateField("date_cloture", e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Production associée</label>
                        <select
                            value={form.id_production}
                            onChange={(e) => updateField("id_production", parseInt(e.target.value))}
                            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
                        >
                            <option value="">Sélectionner une production</option>
                            {productions.map((prod) => (
                                <option key={prod.id} value={prod.id}>
                                    {prod.titre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Boutons */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold"
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
