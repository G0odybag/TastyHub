// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RecipeProvider } from './context/RecipeContext';
import Header from './components/Header';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RecipeProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipe/:id" element={<RecipePage />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
          </div>
        </RecipeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;