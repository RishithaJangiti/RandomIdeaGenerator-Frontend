import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Admin from './pages/Admin';
import './styles/App.css';

export default function App() {
  const [favorites, setFavorites] = useState([]);

  const handleToggleFavorite = (idea) => {
    setFavorites(prev =>
      prev.some(f => f.id === idea.id)
        ? prev.filter(f => f.id !== idea.id)
        : [...prev, idea]
    );
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}
