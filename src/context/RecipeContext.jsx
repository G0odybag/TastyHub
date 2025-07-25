// src/context/RecipeContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('tastyhubb_favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const userFavorites = favorites.filter(fav => fav.userId === user.id);
      setFavorites(userFavorites);
    }
  }, [user]);

  const addToFavorites = (recipe) => {
    if (!user) return;
    
    const newFavorite = { ...recipe, userId: user.id };
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('tastyhubb_favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (recipeId) => {
    const updatedFavorites = favorites.filter(fav => fav.idMeal !== recipeId);
    setFavorites(updatedFavorites);
    localStorage.setItem('tastyhubb_favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (recipeId) => {
    if (!user) return false;
    return favorites.some(fav => fav.idMeal === recipeId && fav.userId === user.id);
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      setRecipes,
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      isLoading,
      setIsLoading,
      error,
      setError
    }}>
      {children}
    </RecipeContext.Provider>
  );
};