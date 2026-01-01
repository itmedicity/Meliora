export const inputStyle = {
    width: '140px',
    padding: '4px 8px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '0.85rem',
};

export const formatDateTime = (dateString) => {
    const d = new Date(dateString);
    const pad = (n) => n.toString().padStart(2, '0');

    const day = pad(d.getDate());
    const month = pad(d.getMonth() + 1);
    const year = d.getFullYear();

    return `${day}-${month}-${year} `;
};

