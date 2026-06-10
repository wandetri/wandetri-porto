function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="category-filter" aria-label="Filter effects by category">
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={activeCategory === category ? 'active' : ''}
          onClick={() => onChange(category)}
          aria-pressed={activeCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
