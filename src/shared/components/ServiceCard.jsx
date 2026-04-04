import { Button } from './Button';

export const ServiceCard = ({ service, onBook }) => {
  return (
    <div className="service-card card">
      <div className="service-header">
        <h3>{service.title}</h3>
        <span className="service-price">₹{service.price}</span>
      </div>
      <p className="service-desc">{service.description}</p>
      <Button variant="secondary" onClick={() => onBook(service)}>Book Now</Button>
    </div>
  );
};
