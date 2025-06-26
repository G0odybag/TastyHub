import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { useRecipes } from '../context/RecipeContext'

const Home = () => {
  const { featuredRecipes, loading, error } = useRecipes()

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading featured recipes: {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-primary-light rounded-xl p-8 md:p-12 text-black">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Discover Delicious Recipes
          </h1>
          <p className="text-xl mb-6 max-w-2xl">
            Find and save your favorite recipes from around the world. Cook like
            a pro with our easy-to-follow instructions.
          </p>
          <Link
            to="/recipes"
            className="inline-block bg-white text-primary font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
          >
            Browse Recipes
          </Link>
        </div>
      </section>

      {/* Featured Recipes */}
      <section>
        <h2 className="text-2xl font-serif font-bold mb-6">Featured Recipes</h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-serif font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Italian', image: '/italian-food.jpg' },
            { name: 'Mexican', image: '/mexican-food.jpg' },
            { name: 'Asian', image: '/asian-food.jpg' },
            { name: 'Vegetarian', image: '/vegetarian-food.jpg' },
          ].map((category) => (
            <Link
              key={category.name}
              to={`/recipes?cuisine=${category.name.toLowerCase()}`}
              className="relative group overflow-hidden rounded-lg h-40"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home