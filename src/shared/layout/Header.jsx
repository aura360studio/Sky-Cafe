import { useApp, APP_MODES } from '../../core/context/AppContext';

export const Header = () => {
  const { mode, setMode, setIsHamburgerOpen } = useApp();

  return (
    <header className="header" style={{ justifyContent: 'space-between' }}>
      <h2 style={{ fontSize: '18px', margin: 0, fontWeight: 700 }}>Sky Cafe</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <select 
          value={mode} 
          onChange={(e) => setMode(e.target.value)}
          style={{
            background: 'var(--accent-color)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '20px',
            padding: '6px 16px',
            fontSize: '14px',
            fontWeight: '600',
            outline: 'none',
            cursor: 'pointer',
            appearance: 'none',
            WebkitAppearance: 'none',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(16, 163, 127, 0.3)'
          }}
        >
          <option value={APP_MODES.DINE_IN}>Dine In ▼</option>
          <option value={APP_MODES.DELIVERY}>Delivery ▼</option>
          <option value={APP_MODES.NIGHT_LIFE}>Night Life ▼</option>
        </select>
        <button 
          className="icon-btn" 
          onClick={() => setIsHamburgerOpen(true)}
        >
          ☰
        </button>
      </div>
    </header>
  );
};
