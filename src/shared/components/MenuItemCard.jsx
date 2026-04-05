import { motion } from 'framer-motion';
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
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button variant="primary" size="sm" onClick={() => onAdd(item)}>Add</Button>
        </motion.div>
      </div>
    </div>
  );
};
