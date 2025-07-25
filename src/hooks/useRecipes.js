// src/hooks/useRecipes.js
import { useState, useEffect } from 'react';
import { fetchRecipes, fetchRecipeById, fetchRandomRecipes } from '../services/api';

const useRecipes = (initialSearchTerm = '') => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchRecipes = async (term = '') => {
    try {
      setIsLoading(true);
      setError(null);
      const data = term ? await fetchRecipes(term) : await fetchRandomRecipes();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getRecipeById = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      const recipe = await fetchRecipeById(id);
      return recipe;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchRecipes(initialSearchTerm);
  }, [initialSearchTerm]);

  return {
    recipes,
    isLoading,
    error,
    searchRecipes,
    getRecipeById,
  };
};

export default useRecipes;