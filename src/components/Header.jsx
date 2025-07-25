// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthModal from './AuthModal';
import { FaUser, FaHeart, FaSignOutAlt, FaSearch } from 'react-icons/fa';

const Header = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <Link to="/" className="flex items-center mb-4 md:mb-0">
          <h1 className="text-3xl font-bold">TastyHubb</h1>
        </Link>

        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full py-2 px-4 pr-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link 
            to={`/?search=${searchTerm}`}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-orange-500"
          >
            <FaSearch />
          </Link>
        </div>

        <nav className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/favorites" className="flex items-center hover:text-orange-200">
                <FaHeart className="mr-1" /> Favorites
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center hover:text-orange-200"
              >
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
              <span className="flex items-center">
                <FaUser className="mr-1" /> {user?.username}
              </span>
            </>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-orange-500 px-4 py-1 rounded-full hover:bg-orange-100 transition"
            >
              Login / Register
            </button>
          )}
        </nav>
      </div>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;