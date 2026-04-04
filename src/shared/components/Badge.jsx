export const Badge = ({ children, variant = 'primary' }) => {
  return <span className={`badge badge-${variant}`}>{children}</span>;
};
