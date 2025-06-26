import { useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

const SearchBar = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setQuery('')
    }
  }

  const clearSearch = () => {
    setQuery('')
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full py-2 pl-10 pr-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <FiSearch className="absolute left-3 top-3 text-black-400" />
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          <FiX />
        </button>
      )}
    </form>
  )
}

export default SearchBar