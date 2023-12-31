
export const formatDateToYYYYMMDD = (date) => date.toISOString().slice(0, 10);

export function formatNaiveDatetime(dateString) {
     const date = new Date(dateString);
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JS
     const day = String(date.getDate()).padStart(2, '0');
     const hour = String(date.getHours()).padStart(2, '0');
     const minute = String(date.getMinutes()).padStart(2, '0');
     const second = String(date.getSeconds()).padStart(2, '0');

     return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}

