// src/pages/RecipePage.jsx
import { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { AuthContext } from '../context/AuthContext';
import RecipeDetails from '../components/RecipeDetails';
import LoadingSpinner from '../components/LoadingSpinner';

const RecipePage = () => {
  const { id } = useParams();
  const { recipes, setRecipes, isLoading, setIsLoading, error, setError } = useContext(RecipeContext);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        // Check if recipe is already in context (from home page)
        const existingRecipe = recipes.find(r => r.idMeal === id);
        
        if (!existingRecipe) {
          // If not, fetch it from API
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await response.json();
          if (data.meals) {
            setRecipes([...recipes, data.meals[0]]);
          } else {
            setError('Recipe not found');
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id, setRecipes, setIsLoading, setError]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
        <Link 
          to="/" 
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const recipe = recipes.find(r => r.idMeal === id);

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>Recipe data not available</p>
        </div>
        <Link 
          to="/" 
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-orange-500 hover:text-orange-600 transition"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to Recipes
        </Link>
      </div>

      <RecipeDetails recipe={recipe} />

      {isAuthenticated && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Rate this recipe</h3>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star}
                className="text-2xl text-gray-300 hover:text-yellow-400 focus:outline-none"
                aria-label={`Rate ${star} star`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipePage;