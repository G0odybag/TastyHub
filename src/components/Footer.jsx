import { Link } from 'react-router-dom'
import { FaInstagram, FaTwitter, FaFacebook, FaPinterest } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">TastyHub</h3>
            <p className="text-gray-400">
              Discover and share delicious recipes from around the world.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaPinterest size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes"
                  className="text-gray-400 hover:text-white transition"
                >
                  Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-gray-400 hover:text-white transition"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/recipes?cuisine=italian"
                  className="text-gray-400 hover:text-white transition"
                >
                  Italian
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?cuisine=mexican"
                  className="text-gray-400 hover:text-white transition"
                >
                  Mexican
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?cuisine=asian"
                  className="text-gray-400 hover:text-white transition"
                >
                  Asian
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?diet=vegetarian"
                  className="text-gray-400 hover:text-white transition"
                >
                  Vegetarian
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TastyHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer