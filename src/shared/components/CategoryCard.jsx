export const CategoryCard = ({ category, onClick, isActive }) => {
  return (
    <div 
      className={`category-card ${isActive ? 'active' : ''}`} 
      onClick={() => onClick(category.id)}
    >
      <div className="icon">{category.icon}</div>
      <span>{category.name}</span>
    </div>
  );
};
