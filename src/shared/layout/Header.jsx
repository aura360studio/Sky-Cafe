import { useApp, APP_MODES } from '../../core/context/AppContext';

export const Header = () => {
  const { mode, setMode, setIsHamburgerOpen } = useApp();

  return (
    <header className="header" style={{ justifyContent: 'space-between' }}>
      <h2 style={{ fontSize: '18px', margin: 0, fontWeight: 700 }}>Sky Cafe</h2>
      <select 
        value={mode} 
        onChange={(e) => setMode(e.target.value)}
        style={{
          background: 'var(--bg-color)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '4px',
          padding: '4px 8px',
          fontSize: '14px',
          outline: 'none'
        }}
      >
        <option value={APP_MODES.DINE_IN}>Dine In</option>
        <option value={APP_MODES.DELIVERY}>Delivery</option>
        <option value={APP_MODES.NIGHT_LIFE}>Night Life</option>
      </select>
      <button 
        className="icon-btn" 
        onClick={() => setIsHamburgerOpen(true)}
      >
        ☰
      </button>
    </header>
  );
};
