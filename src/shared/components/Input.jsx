export const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label>{label}</label>}
      <input className={`input ${error ? 'error' : ''}`} {...props} />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};
