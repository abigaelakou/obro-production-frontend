import React, { useState, useEffect } from "react";

const initialProduction = {
    titre: "",
    genre: "",
    categorie: "",
    date_sortie: "",
    img: null,
    youtube_url: "",
    description: "",
    status: "publiée"
};

export default function FormProduction({ onSubmit, editingItem, onCancel }) {
    const [form, setForm] = useState(initialProduction);

    // ⚡️ Si on édite une production, fusionner avec l’objet initial
    useEffect(() => {
        if (editingItem) {
            setForm({...initialProduction, ...editingItem });
        } else {
            setForm(initialProduction);
        }
    }, [editingItem]);

    const updateField = (field, value) => {
        setForm(prev => ({...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm(initialProduction); // reset après envoi
    };

    return ( <
        form onSubmit = { handleSubmit }
        className = "mb-8 p-6 bg-red-50 rounded-2xl border-2 border-red-200" >
        <
        h3 className = "text-xl font-bold mb-4" > { editingItem ? "Modifier une Production" : "Nouvelle Production" } <
        /h3>

        <
        div className = "grid md:grid-cols-2 gap-4" >
        <
        input placeholder = "Titre"
        value = { form.titre }
        onChange = {
            (e) => updateField("titre", e.target.value) }
        className = "p-3 border-2 rounded-xl focus:border-red-600 outline-none" /
        >
        <
        input placeholder = "Genre"
        value = { form.genre }
        onChange = {
            (e) => updateField("genre", e.target.value) }
        className = "p-3 border-2 rounded-xl focus:border-red-600 outline-none" /
        >

        <
        select value = { form.categorie }
        onChange = {
            (e) => updateField("categorie", e.target.value) }
        className = "p-3 border-2 rounded-xl focus:border-red-600 outline-none" >
        <
        option value = "" > Catégorie < /option> <
        option value = "Film" > Film < /option> <
        option value = "Série" > Série < /option> <
        /select>

        <
        input type = "date"
        value = { form.date_sortie }
        onChange = {
            (e) => updateField("date_sortie", e.target.value) }
        className = "p-3 border-2 rounded-xl focus:border-red-600 outline-none" /
        >

        { /* Upload image */ } <
        div className = "md:col-span-2" >
        <
        label className = "block text-sm font-semibold mb-2" > Image de la production < /label> <
        input type = "file"
        accept = "image/*"
        onChange = {
            (e) => updateField("img", e.target.files[0]) }
        className = "p-3 border-2 rounded-xl focus:border-red-600 outline-none w-full" /
        >

        {
            form.img && form.img instanceof File && ( <
                img src = { URL.createObjectURL(form.img) }
                alt = "Aperçu"
                className = "mt-2 h-32 w-auto object-cover rounded-xl border" /
                >
            )
        } {
            editingItem && editingItem.img && !(form.img instanceof File) && ( <
                img src = { editingItem.img }
                alt = "Image actuelle"
                className = "mt-2 h-32 w-auto object-cover rounded-xl border" /
                >
            )
        } <
        /div>

        <
        input placeholder = "URL YouTube"
        value = { form.youtube_url }
        onChange = {
            (e) => updateField("youtube_url", e.target.value) }
        className = "p-3 border-2 rounded-xl focus:border-red-600 outline-none md:col-span-2" /
        >

        <
        textarea placeholder = "Description"
        value = { form.description }
        onChange = {
            (e) => updateField("description", e.target.value) }
        rows = "3"
        className = "p-3 border-2 rounded-xl focus:border-red-600 outline-none md:col-span-2" /
        >

        { /* Boutons */ } <
        div className = "md:col-span-2 flex gap-4" >
        <
        button type = "submit"
        className = "bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold" >
        { editingItem ? "Mettre à jour" : "Enregistrer" } <
        /button> <
        button type = "button"
        onClick = { onCancel }
        className = "bg-gray-400 hover:bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold" >
        Annuler <
        /button> <
        /div> <
        /div> <
        /form>
    );
}