import { Link } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

const RecipeCard = ({ recipe }) => {
  const { user, updateFavorites } = useAuth()
  const [isFavorite, setIsFavorite] = useState(
    user?.favorites?.some((fav) => fav.id === recipe.id) || false
  )

  const toggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) return

    let newFavorites = [...(user.favorites || [])]
    
    if (isFavorite) {
      newFavorites = newFavorites.filter((fav) => fav.id !== recipe.id)
    } else {
      newFavorites.push({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      })
    }
    
    setIsFavorite(!isFavorite)
    updateFavorites(newFavorites)
  }

  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={recipe.image || '/placeholder-recipe.jpg'}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full ${isFavorite ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiHeart className={`${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{recipe.title}</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            {recipe.readyInMinutes} mins
          </span>
          <span>
            {recipe.servings} servings
          </span>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard