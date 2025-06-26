import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiSearch, FiHeart, FiUser, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import SearchBar from './SearchBar'
import { useState } from 'react'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const handleLogout = () => {
    logout()
    setShowMobileMenu(false)
  }

  const handleSearch = (query) => {
    navigate(`/recipes?search=${query}`)
    setShowSearch(false)
    setShowMobileMenu(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-bold text-primary">
            TastyHub
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-primary ${isActive ? 'text-primary font-medium' : 'text-gray-700'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                `hover:text-primary ${isActive ? 'text-primary font-medium' : 'text-gray-700'}`
              }
            >
              Recipes
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `hover:text-primary ${isActive ? 'text-primary font-medium' : 'text-gray-700'}`
                  }
                >
                  <div className="flex items-center">
                    <FiHeart className="mr-1" />
                    Favorites
                  </div>
                </NavLink>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-primary"
                  >
                    <FiLogOut />
                  </button>
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-primary ${isActive ? 'text-primary font-medium' : 'text-gray-700'}`
                }
              >
                <div className="flex items-center">
                  <FiUser className="mr-1" />
                  Login
                </div>
              </NavLink>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-gray-700 hover:text-primary"
            >
              <FiSearch size={20} />
            </button>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-gray-700 hover:text-primary"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="mt-4 md:hidden">
            <SearchBar onSearch={handleSearch} />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <NavLink
                to="/"
                onClick={() => setShowMobileMenu(false)}
                className={({ isActive }) =>
                  `py-2 hover:text-primary ${
                    isActive ? 'text-primary font-medium' : 'text-gray-700'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/recipes"
                onClick={() => setShowMobileMenu(false)}
                className={({ isActive }) =>
                  `py-2 hover:text-primary ${
                    isActive ? 'text-primary font-medium' : 'text-gray-700'
                  }`
                }
              >
                Recipes
              </NavLink>

              {user ? (
                <>
                  <NavLink
                    to="/favorites"
                    onClick={() => setShowMobileMenu(false)}
                    className={({ isActive }) =>
                      `py-2 hover:text-primary ${
                        isActive ? 'text-primary font-medium' : 'text-gray-700'
                      }`
                    }
                  >
                    <div className="flex items-center">
                      <FiHeart className="mr-2" />
                      Favorites
                    </div>
                  </NavLink>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700">{user.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-gray-500 hover:text-primary"
                    >
                      <FiLogOut />
                    </button>
                  </div>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setShowMobileMenu(false)}
                  className={({ isActive }) =>
                    `py-2 hover:text-primary ${
                      isActive ? 'text-primary font-medium' : 'text-gray-700'
                    }`
                  }
                >
                  <div className="flex items-center">
                    <FiUser className="mr-2" />
                    Login
                  </div>
                </NavLink>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header