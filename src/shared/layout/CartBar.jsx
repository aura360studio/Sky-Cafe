import { motion, AnimatePresence } from 'framer-motion';
import { useApp, APP_PAGES, APP_MODES } from '../../core/context/AppContext';

export const CartBar = () => {
  const { mode, cartItemCount, cartTotal, setActivePage, activePage } = useApp();

  const isVisible = cartItemCount > 0 && activePage !== APP_PAGES.CART && mode !== APP_MODES.NIGHT_LIFE;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="cart-bar" 
          onClick={() => setActivePage(APP_PAGES.CART)}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <motion.div 
            style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}
            key={cartItemCount}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <span>{cartItemCount} Items | ₹{cartTotal.toFixed(2)}</span>
            <span>Confirm Order &gt;</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
