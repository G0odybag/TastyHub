// src/components/RecipeCard.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const RecipeCard = ({ recipe }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useContext(RecipeContext);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isFavorite(recipe.idMeal)) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <Link
      to={`/recipe/${recipe.idMeal}`}
      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
    >
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-100 transition"
          aria-label={isFavorite(recipe.idMeal) ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite(recipe.idMeal) ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-500" />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{recipe.strMeal}</h3>
        <p className="text-gray-600 text-sm">
          {recipe.strCategory} • {recipe.strArea}
        </p>
      </div>
    </Link>
  );
};

export default RecipeCard;