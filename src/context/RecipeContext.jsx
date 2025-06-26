import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const RecipeContext = createContext()

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([])
  const [featuredRecipes, setFeaturedRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY

  const fetchRecipes = async (query = '', filters = {}) => {
    setLoading(true)
    setError(null)
    try {
      let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=12&addRecipeInformation=true`
      
      if (query) {
        url += `&query=${query}`
      }
      
      if (filters.cuisine) {
        url += `&cuisine=${filters.cuisine}`
      }
      
      if (filters.diet) {
        url += `&diet=${filters.diet}`
      }
      
      if (filters.intolerances) {
        url += `&intolerances=${filters.intolerances}`
      }
      
      const response = await axios.get(url)
      setRecipes(response.data.results)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching recipes:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchFeaturedRecipes = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=4`
      )
      setFeaturedRecipes(response.data.recipes)
    } catch (err) {
      console.error('Error fetching featured recipes:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchRecipeById = async (id) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      )
      return response.data
    } catch (err) {
      console.error('Error fetching recipe:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const fetchSimilarRecipes = async (id) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${API_KEY}&number=4`
      )
      return response.data
    } catch (err) {
      console.error('Error fetching similar recipes:', err)
      return []
    }
  }

  useEffect(() => {
    fetchFeaturedRecipes()
  }, [])

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        featuredRecipes,
        loading,
        error,
        fetchRecipes,
        fetchRecipeById,
        fetchSimilarRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}

export const useRecipes = () => {
  return useContext(RecipeContext)
}