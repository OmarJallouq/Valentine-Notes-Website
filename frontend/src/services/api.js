// frontend/src/services/api.js
const apiUrl = process.env.BACKEND_URL;

const fetchData = async (endpoint) => {
  const response = await fetch(`${apiUrl}/${endpoint}`);
  const data = await response.json();
  return data;
};

export default fetchData;