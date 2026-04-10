import { motion } from 'framer-motion';
import { Button } from './Button';

export const MenuItemCard = ({ item, onAdd }) => {
  const isAvailable = item.isAvailable !== false; // Default to true if undefined

  return (
    <div 
      className={`menu-item-card card ${!isAvailable ? 'unavailable' : ''}`}
      style={{
        filter: !isAvailable ? 'grayscale(100%)' : 'none',
        opacity: !isAvailable ? 0.6 : 1,
        pointerEvents: !isAvailable ? 'none' : 'auto',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="item-info">
        <h3 className="item-title" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {item.title} {item.isVegetarian && <span className="veg-badge">🌱</span>}
          {!isAvailable && (
            <span style={{ 
              fontSize: '10px', 
              backgroundColor: '#333', 
              color: '#fff', 
              padding: '2px 8px', 
              borderRadius: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Sold Out
            </span>
          )}
        </h3>
        <span className="item-price">₹{Number(item.price).toFixed(2)}</span>
      </div>
      <div className="item-action">
        <motion.div
          whileTap={isAvailable ? { scale: 0.9 } : {}}
          whileHover={isAvailable ? { scale: 1.05 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button 
            variant={isAvailable ? "primary" : "secondary"} 
            size="sm" 
            onClick={() => isAvailable && onAdd(item)}
            disabled={!isAvailable}
          >
            {isAvailable ? 'Add' : 'Off'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

