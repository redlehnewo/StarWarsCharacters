const BASE_URL = "http://localhost:3000";
const API_URL = `${BASE_URL}/species`;

export const getList = params => {
  return fetch(API_URL).then(response => response.json());
};
