// frontend/src/services/api.js
const apiUrl = process.env.BACKEND_URL;

export const fetchData = async (endpoint) => {
  const response = await fetch(`${apiUrl}/${endpoint}`);
  const data = await response.json();
  return data;
};