export const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  );
};
