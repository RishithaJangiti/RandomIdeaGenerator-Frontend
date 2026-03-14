export default function CategorySelector({ ideas, selected, onSelect }) {
  const categories = ['All', ...new Set(ideas.map(i => i.category).filter(Boolean))];

  return (
    <div className="category-bar">
      {categories.map(cat => (
        <button
          key={cat}
          className={`category-pill ${selected === cat ? 'active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
