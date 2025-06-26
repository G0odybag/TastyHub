import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    cuisine: searchParams.get('cuisine') || '',
    diet: searchParams.get('diet') || '',
    intolerances: searchParams.get('intolerances') || '',
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    const params = new URLSearchParams()
    
    if (searchParams.get('search')) {
      params.set('search', searchParams.get('search'))
    }
    
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    }
    
    setSearchParams(params)
  }

  const clearFilters = () => {
    setFilters({
      cuisine: '',
      diet: '',
      intolerances: '',
    })
    
    if (searchParams.get('search')) {
      setSearchParams({ search: searchParams.get('search') })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cuisine
          </label>
          <select
            name="cuisine"
            value={filters.cuisine}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Cuisines</option>
            <option value="african">African</option>
            <option value="american">American</option>
            <option value="british">British</option>
            <option value="chinese">Chinese</option>
            <option value="french">French</option>
            <option value="indian">Indian</option>
            <option value="italian">Italian</option>
            <option value="japanese">Japanese</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="mexican">Mexican</option>
            <option value="middle eastern">Middle Eastern</option>
            <option value="thai">Thai</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Diet
          </label>
          <select
            name="diet"
            value={filters.diet}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Any Diet</option>
            <option value="gluten free">Gluten Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescetarian">Pescetarian</option>
            <option value="paleo">Paleo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Intolerances
          </label>
          <select
            name="intolerances"
            value={filters.intolerances}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">None</option>
            <option value="dairy">Dairy</option>
            <option value="egg">Egg</option>
            <option value="gluten">Gluten</option>
            <option value="peanut">Peanut</option>
            <option value="seafood">Seafood</option>
            <option value="soy">Soy</option>
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={applyFilters}
            className="flex-grow bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition"
          >
            Apply
          </button>
          <button
            onClick={clearFilters}
            className="flex-grow bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar