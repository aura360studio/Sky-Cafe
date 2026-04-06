import { motion } from 'framer-motion';
import { SectionTitle } from '../../shared/components/SectionTitle';
import { Card } from '../../shared/components/Card';
import { getEvents } from '../../services/nightLifeService';
import { Button } from '../../shared/components/Button';

export const EventsView = () => {
  const events = getEvents();

  return (
    <div style={{ padding: '0 16px', paddingBottom: '80px' }}>
      <SectionTitle title="Upcoming Events" subtitle="Experience the magic under the stars." />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ 
                height: '140px', 
                background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop") center/cover',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '20px'
              }}>
                <span style={{ 
                  background: 'var(--accent-color)', color: '#fff', padding: '4px 10px', 
                  borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' 
                }}>
                  {event.status}
                </span>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{event.title}</h3>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', color: 'var(--accent-color)' }}>{event.date}</p>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)' }}>{event.time}</p>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                  {event.description}
                </p>
                <Button 
                  variant="outline" 
                  style={{ width: '100%' }}
                  onClick={() => window.open('https://wa.me/917411116694?text=Hi, I want to inquire about the ' + event.title + ' event.', '_blank')}
                >
                  Inquire via WhatsApp
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div style={{ 
        marginTop: '32px', padding: '24px', background: 'rgba(100, 65, 165, 0.05)', 
        borderRadius: '16px', border: '1px dashed var(--border-color)', textAlign: 'center' 
      }}>
        <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>Scheduling Note</h4>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          Events are scheduled on selected dates and weekends. Follow our updates or contact us on WhatsApp for upcoming events and availability.
        </p>
      </div>
    </div>
  );
};
