import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Admin from './pages/Admin';

const routes = (favorites, onToggleFavorite) => [
  {
    path: '/',
    element: <Home favorites={favorites} onToggleFavorite={onToggleFavorite} />,
  },
  {
    path: '/favorites',
    element: <Favorites favorites={favorites} onToggleFavorite={onToggleFavorite} />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
];

export default routes;
