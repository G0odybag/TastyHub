import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import LoadingSpinner from '../components/LoadingSpinner'
import SearchBar from '../components/SearchBar'
import FilterSidebar from '../components/FilterSidebar'
import { useRecipes } from '../context/RecipeContext'

const Recipes = () => {
  const [searchParams] = useSearchParams()
  const { recipes, loading, error, fetchRecipes } = useRecipes()

  useEffect(() => {
    const searchQuery = searchParams.get('search') || ''
    const cuisine = searchParams.get('cuisine') || ''
    const diet = searchParams.get('diet') || ''
    const intolerances = searchParams.get('intolerances') || ''

    fetchRecipes(searchQuery, { cuisine, diet, intolerances })
  }, [searchParams, fetchRecipes])

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        Error loading recipes: {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="sticky top-24 space-y-6">
            <SearchBar
              onSearch={(query) => {
                const params = new URLSearchParams(searchParams)
                params.set('search', query)
                window.location.search = params.toString()
              }}
            />
            <FilterSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          <h1 className="text-2xl font-serif font-bold mb-6">
            {searchParams.get('search')
              ? `Search Results for "${searchParams.get('search')}"`
              : 'All Recipes'}
          </h1>

          {loading ? (
            <LoadingSpinner />
          ) : recipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                No recipes found. Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Recipes