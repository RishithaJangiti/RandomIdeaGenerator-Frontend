export default function FavoriteButton({ idea, favorites, onToggle }) {
  const isFav = favorites.some(f => f.id === idea.id);
  return (
    <button
      className="favorite-btn"
      onClick={() => onToggle(idea)}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFav ? '❤️' : '🤍'}
    </button>
  );
}
