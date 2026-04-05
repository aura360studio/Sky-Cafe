import { Button } from './Button';

export const MenuItemCard = ({ item, onAdd }) => {
  return (
    <div className="menu-item-card card">
      <div className="item-info">
        <h3 className="item-title" style={{ marginBottom: '8px' }}>
          {item.title} {item.isVegetarian && <span className="veg-badge">🌱</span>}
        </h3>
        {/* TODO for future implementation: Make items an accordion and reveal description & image on click */}
        {/* <p className="item-desc">{item.description}</p> */}
        <span className="item-price">₹{item.price.toFixed(2)}</span>
      </div>
      <div className="item-action">
        {/* {item.image && <img src={item.image} alt={item.title} />} */}
        <Button variant="primary" size="sm" onClick={() => onAdd(item)}>Add</Button>
      </div>
    </div>
  );
};
