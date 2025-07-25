// src/components/SearchBar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search recipes by name, ingredient..."
          className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-10 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 text-orange-500 hover:text-orange-600"
          aria-label="Search"
        >
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;