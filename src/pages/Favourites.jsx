import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { useRecipes } from '../context/RecipeContext'

const Favorites = () => {
  const { user } = useAuth()
  const { fetchRecipeById } = useRecipes()
  const [favoriteRecipes, setFavoriteRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFavoriteRecipes = async () => {
      if (!user?.favorites?.length) {
        setLoading(false)
        return
      }

      try {
        const recipes = []
        for (const fav of user.favorites) {
          try {
            const recipe = await fetchRecipeById(fav.id)
            recipes.push(recipe)
          } catch (err) {
            console.error(`Error loading recipe ${fav.id}:`, err)
          }
        }
        setFavoriteRecipes(recipes)
      } catch (err) {
        console.error('Error loading favorites:', err)
      } finally {
        setLoading(false)
      }
    }

    loadFavoriteRecipes()
  }, [user, fetchRecipeById])

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-serif font-bold mb-6">Your Favorite Recipes</h1>

      {favoriteRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">
            You haven't saved any recipes yet.
          </p>
          <Link
            to="/recipes"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites