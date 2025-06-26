import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'
import { useRecipes } from '../context/RecipeContext'

const RecipeRecommendations = ({ recipeId }) => {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const { fetchSimilarRecipes } = useRecipes()

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await fetchSimilarRecipes(recipeId)
        setRecommendations(data)
      } catch (err) {
        console.error('Error fetching recommendations:', err)
      } finally {
        setLoading(false)
      }
    }

    loadRecommendations()
  }, [recipeId, fetchSimilarRecipes])

  if (loading) return <div className="text-center py-4">Loading recommendations...</div>
  if (recommendations.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-serif font-bold mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default RecipeRecommendations