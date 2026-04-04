export const Drawer = ({ isOpen, onClose, direction = 'bottom', children }) => {
  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={onClose} />}
      <div className={`drawer drawer-${direction} ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </>
  );
};
