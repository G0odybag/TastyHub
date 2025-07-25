// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchRecipes = async (searchTerm = '') => {
  try {
    if (searchTerm) {
      const response = await axios.get(`${API_BASE_URL}/search.php?s=${searchTerm}`);
      return response.data.meals || [];
    } else {
      const response = await axios.get(`${API_BASE_URL}/filter.php?c=Seafood`);
      return response.data.meals || [];
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

export const fetchRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
};

export const fetchRandomRecipes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/random.php`);
    return response.data.meals || [];
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return [];
  }
};