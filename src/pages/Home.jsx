// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchRecipes, fetchRandomRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import { RecipeContext } from '../context/RecipeContext';
import { useContext } from 'react';

const Home = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const { recipes, setRecipes, isLoading, setIsLoading } = useContext(RecipeContext);
  const [error, setError] = useState(null);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setIsLoading(true);
        let data;
        if (searchTerm) {
          data = await fetchRecipes(searchTerm);
          setRecipes(data);
        } else {
          // Load 3 random recipes for featured section
          const randomData = await fetchRandomRecipes();
          setFeaturedRecipes(randomData.slice(0, 3));
          
          // Load more recipes for the main list
          data = await fetchRandomRecipes();
          setRecipes(data);
        }
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, [searchTerm, setRecipes, setIsLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      {!searchTerm && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredRecipes.map((recipe) => (
              <RecipeCard 
                key={`featured-${recipe.idMeal}`} 
                recipe={recipe} 
                featured={true}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">More Recipes</h2>
        </>
      )}

      {searchTerm && (
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Search Results for "{searchTerm}"
        </h2>
      )}

      {recipes.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">No recipes found. Try a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;