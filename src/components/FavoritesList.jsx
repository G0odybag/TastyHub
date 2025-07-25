// src/components/FavoritesList.jsx
import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from './RecipeCard';
import { FaHeartBroken } from 'react-icons/fa';

const FavoritesList = () => {
  const { favorites, removeFromFavorites } = useContext(RecipeContext);

  const handleRemoveFavorite = (recipeId) => {
    removeFromFavorites(recipeId);
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <FaHeartBroken className="mx-auto text-4xl text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-600">No favorites yet</h3>
        <p className="text-gray-500 mt-2">
          Save your favorite recipes by clicking the heart icon
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {favorites.map((recipe) => (
        <div key={recipe.idMeal} className="relative">
          <RecipeCard recipe={recipe} />
          <button
            onClick={() => handleRemoveFavorite(recipe.idMeal)}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-100 transition text-red-500"
            aria-label="Remove from favorites"
          >
            <FaHeartBroken />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;