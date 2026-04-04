import { Button } from './Button';

export const MenuItemCard = ({ item, onAdd }) => {
  return (
    <div className="menu-item-card card">
      <div className="item-info">
        <h3 className="item-title">
          {item.title} {item.isVegetarian && <span className="veg-badge">🌱</span>}
        </h3>
        <p className="item-desc">{item.description}</p>
        <span className="item-price">₹{item.price.toFixed(2)}</span>
      </div>
      <div className="item-action">
        {item.image && <img src={item.image} alt={item.title} />}
        <Button variant="primary" size="sm" onClick={() => onAdd(item)}>Add</Button>
      </div>
    </div>
  );
};
