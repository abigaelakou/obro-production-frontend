// src/utils/formatNumber.js
export const formatNumber = (value) => {
    const num = Number(value);
    if (isNaN(num)) return "0";

    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toLocaleString("fr-FR");
};