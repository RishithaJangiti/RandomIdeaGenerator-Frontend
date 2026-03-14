import { useState, useEffect } from 'react';
import { getAllIdeas, getRandomIdea } from '../services/api';
import IdeaCard from '../components/IdeaCard';
import CategorySelector from '../components/CategorySelector';

export default function Home({ favorites, onToggleFavorite }) {
  const [ideas, setIdeas] = useState([]);
  const [randomIdea, setRandomIdea] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    fetchAll();
    fetchRandom();
  }, []);

  const fetchAll = async () => {
    try {
      const res = await getAllIdeas();
      setIdeas(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandom = async () => {
    setSpinning(true);
    try {
      const res = await getRandomIdea();
      setRandomIdea(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setSpinning(false);
    }
  };

  const filtered = selectedCategory === 'All'
    ? ideas
    : ideas.filter(i => i.category === selectedCategory);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Spark your next <em>big idea</em></h1>
        <p className="page-subtitle">Browse all ideas or let the machine decide for you.</p>
      </div>

      {/* Random Hero */}
      <div className="hero-section">
        <div className="hero-label">✦ Idea of the moment</div>
        {randomIdea ? (
          <>
            {randomIdea.category && <div className="hero-category">{randomIdea.category}</div>}
            <h2 className="hero-idea-title">{randomIdea.title}</h2>
            <p className="hero-idea-desc">{randomIdea.description || 'No description provided.'}</p>
          </>
        ) : (
          <p className="hero-idea-desc">No ideas yet. Add some from the Admin panel!</p>
        )}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={fetchRandom} disabled={spinning}>
            {spinning ? '...' : '⟳ New Random Idea'}
          </button>
          {randomIdea && (
            <button
              className="btn btn-outline"
              onClick={() => onToggleFavorite(randomIdea)}
            >
              {favorites.some(f => f.id === randomIdea.id) ? '❤️ Saved' : '🤍 Save'}
            </button>
          )}
        </div>
      </div>

      {/* All Ideas */}
      <div className="section-label">All Ideas ({filtered.length})</div>

      <CategorySelector
        ideas={ideas}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {loading ? (
        <div className="loading">Loading ideas...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💡</div>
          <h3>No ideas yet</h3>
          <p>Head to the Admin panel to add your first idea.</p>
        </div>
      ) : (
        <div className="ideas-grid">
          {filtered.map((idea, i) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              index={i}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
