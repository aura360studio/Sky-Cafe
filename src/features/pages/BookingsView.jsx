import { SectionTitle } from '../../shared/components/SectionTitle';
import { ServiceCard } from '../../shared/components/ServiceCard';
import { servicePackages } from '../../data/events';
import { generateNightlifeUrl } from '../../services/whatsapp';

export const BookingsView = () => {
  const handleBooking = (service) => {
    window.open(generateNightlifeUrl(service, "20:00", "2"), '_blank');
  };

  return (
    <div style={{ padding: '0 16px' }}>
      <SectionTitle title="Exclusive Services" subtitle="Secure your luxury table or event packages." />
      <div>
        {servicePackages.map(pkg => (
          <ServiceCard key={pkg.id} service={pkg} onBook={handleBooking} />
        ))}
      </div>
    </div>
  );
};
