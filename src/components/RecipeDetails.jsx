// src/components/RecipeDetails.jsx
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { fetchRecipeById } from '../services/api';
import { FaHeart, FaRegHeart, FaClock, FaUtensils, FaGlobeAmericas } from 'react-icons/fa';

const RecipeDetails = () => {
  const { id } = useParams();
  const { addToFavorites, removeFromFavorites, isFavorite } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRecipe = async () => {
      setIsLoading(true);
      const data = await fetchRecipeById(id);
      setRecipe(data);
      setIsLoading(false);
    };

    loadRecipe();
  }, [id]);

  const handleFavoriteClick = () => {
    if (isFavorite(recipe.idMeal)) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!recipe) {
    return <div className="text-center py-10">Recipe not found</div>;
  }

  // Helper function to format ingredients and measures
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push({
          ingredient: recipe[`strIngredient${i}`],
          measure: recipe[`strMeasure${i}`],
        });
      }
    }
    return ingredients;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-1/2">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{recipe.strMeal}</h1>
            <button
              onClick={handleFavoriteClick}
              className="text-2xl"
              aria-label={isFavorite(recipe.idMeal) ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite(recipe.idMeal) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-400" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-6 mb-6 text-gray-600">
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <span>30 mins</span>
            </div>
            <div className="flex items-center">
              <FaUtensils className="mr-2" />
              <span>{recipe.strCategory}</span>
            </div>
            <div className="flex items-center">
              <FaGlobeAmericas className="mr-2" />
              <span>{recipe.strArea}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Ingredients</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {getIngredients().map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  <span>
                    {item.ingredient} - {item.measure}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Instructions</h2>
            <div className="prose max-w-none">
              {recipe.strInstructions.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;