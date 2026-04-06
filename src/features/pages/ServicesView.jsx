import { motion } from 'framer-motion';
import { SectionTitle } from '../../shared/components/SectionTitle';
import { Card } from '../../shared/components/Card';
import { getServices } from '../../services/nightLifeService';
import { useApp, APP_PAGES } from '../../core/context/AppContext';
import { Button } from '../../shared/components/Button';

export const ServicesView = () => {
  const services = getServices();
  const { setActivePage } = useApp();

  return (
    <div style={{ padding: '0 16px', paddingBottom: '80px' }}>
      <SectionTitle title="Rooftop Services" subtitle="Tailored experiences for every occasion." />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '10px', background: 'var(--accent-color)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 
                }}>
                  <span className="material-icons">{service.icon}</span>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{service.title}</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {service.description}
                  </p>
                  
                  {service.id === 'birthday-party' && (
                    <div style={{ 
                      marginTop: '12px', padding: '8px 12px', background: 'rgba(244, 67, 54, 0.1)', 
                      borderRadius: '6px', borderLeft: '3px solid #f44336'
                    }}>
                      <p style={{ margin: 0, fontSize: '12px', color: '#f44336', fontWeight: '600' }}>
                        Policy: External cake cutting charges: ₹500.
                      </p>
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    size="sm" 
                    style={{ marginTop: '16px' }}
                    onClick={() => setActivePage(APP_PAGES.BOOKINGS)}
                  >
                    Check Availability
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '32px', textAlign: 'center', padding: '20px', background: 'var(--surface-color)', borderRadius: '12px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
          Custom packages for large groups and private gatherings available on request.
        </p>
      </div>
    </div>
  );
};
