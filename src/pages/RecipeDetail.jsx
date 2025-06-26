import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiClock, FiUsers, FiBarChart2 } from 'react-icons/fi'
import LoadingSpinner from '../components/LoadingSpinner'
import { useRecipes } from '../context/RecipeContext'
import RecipeRecommendations from '../components/RecipeRecommendations'

const RecipeDetail = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { fetchRecipeById } = useRecipes()

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true)
        const data = await fetchRecipeById(id)
        setRecipe(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadRecipe()
  }, [id, fetchRecipeById])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>
  if (!recipe) return <div className="text-center py-8">Recipe not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  to="/recipes"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-primary md:ml-2"
                >
                  Recipes
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {recipe.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Recipe Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">{recipe.title}</h1>
          <p className="text-gray-600 mb-4">{recipe.summary?.replace(/<[^>]*>/g, '')}</p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-700">
              <FiClock className="mr-2 text-primary" />
              <span>{recipe.readyInMinutes} mins</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FiUsers className="mr-2 text-primary" />
              <span>{recipe.servings} servings</span>
            </div>
            {recipe.healthScore && (
              <div className="flex items-center text-gray-700">
                <FiBarChart2 className="mr-2 text-primary" />
                <span>Health Score: {recipe.healthScore}</span>
              </div>
            )}
          </div>
        </div>

        {/* Recipe Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Recipe Image */}
          <div className="md:w-1/2">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full rounded-lg shadow-md"
            />
          </div>

          {/* Ingredients */}
          <div className="md:w-1/2">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8">
          <h2 className="text-2xl font-serif font-bold mb-4">Instructions</h2>
          {recipe.analyzedInstructions?.[0]?.steps ? (
            <ol className="space-y-4">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number} className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mr-4">
                    {step.number}
                  </span>
                  <span>{step.step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            />
          )}
        </div>

        {/* Nutrition */}
        {recipe.nutrition?.nutrients && (
          <div className="mt-8">
            <h2 className="text-2xl font-serif font-bold mb-4">Nutrition Facts</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recipe.nutrition.nutrients
                  .filter(
                    (nutrient) =>
                      nutrient.name === 'Calories' ||
                      nutrient.name === 'Protein' ||
                      nutrient.name === 'Carbohydrates' ||
                      nutrient.name === 'Fat' ||
                      nutrient.name === 'Fiber' ||
                      nutrient.name === 'Sugar'
                  )
                  .map((nutrient) => (
                    <div key={nutrient.name} className="text-center">
                      <div className="text-lg font-semibold">
                        {Math.round(nutrient.amount)}{' '}
                        {nutrient.unit === 'kcal' ? '' : nutrient.unit}
                      </div>
                      <div className="text-sm text-gray-600">{nutrient.name}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        <RecipeRecommendations recipeId={id} />
      </div>
    </div>
  )
}

export default RecipeDetail