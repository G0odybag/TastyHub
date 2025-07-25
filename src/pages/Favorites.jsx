// src/pages/Favorites.jsx
import { useContext } from 'react';
import RecipeCard from '../components/RecipeCard';
import { AuthContext } from '../context/AuthContext';
import { RecipeContext } from '../context/RecipeContext';

const Favorites = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { favorites } = useContext(RecipeContext);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Please login to view your favorites</h2>
        <p className="text-gray-600">You need to be logged in to see your saved recipes.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Favorite Recipes</h2>

      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">You haven't saved any recipes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;