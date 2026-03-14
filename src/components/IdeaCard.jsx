import FavoriteButton from './FavoriteButton';

export default function IdeaCard({ idea, index, favorites, onToggleFavorite }) {
  return (
    <div className="idea-card">
      <div className="idea-card-number">#{String(index + 1).padStart(2, '0')}</div>
      <h3 className="idea-card-title">{idea.title}</h3>
      <p className="idea-card-desc">{idea.description || 'No description provided.'}</p>
      <div className="idea-card-footer">
        <span className="idea-category-tag">{idea.category || 'General'}</span>
        <FavoriteButton idea={idea} favorites={favorites} onToggle={onToggleFavorite} />
      </div>
    </div>
  );
}
