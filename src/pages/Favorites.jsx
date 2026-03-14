import IdeaCard from '../components/IdeaCard';

export default function Favorites({ favorites, onToggleFavorite }) {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Your <em>favorites</em></h1>
        <p className="page-subtitle">Ideas you've saved for later.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🤍</div>
          <h3>Nothing saved yet</h3>
          <p>Tap the heart on any idea to save it here.</p>
        </div>
      ) : (
        <>
          <div className="section-label">{favorites.length} saved idea{favorites.length !== 1 ? 's' : ''}</div>
          <div className="ideas-grid">
            {favorites.map((idea, i) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                index={i}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
