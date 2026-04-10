import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../../shared/components/SectionTitle';
import { Card } from '../../shared/components/Card';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { useApp } from '../../core/context/AppContext';
import { getServices, getAreas } from '../../services/nightLifeService';
import { getSlotsByDate, getStatusLabel, getStatusColor, isDateAllowed } from '../../services/bookingService';
import { 
  generateTableBookingUrl, 
  generateCandleLightUrl, 
  generateBirthdayBookingUrl, 
  generateEventBookingUrl 
} from '../../services/whatsapp';

export const BookingsView = () => {
  const { customerName, setCustomerName } = useApp();
  const services = getServices();
  const areas = getAreas();

  // Booking State
  const [step, setStep] = useState(1); // 1: Type, 2: Details/Date, 3: Slot, 4: Area (if table), 5: Confirm
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedArea, setSelectedArea] = useState(areas[1].title); // Default to Main Section
  const [guestCount, setGuestCount] = useState('2');
  const [phone, setPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [decoration, setDecoration] = useState('No');
  const [cakeCutting, setCakeCutting] = useState('No');

  // Today/Tomorrow for date selection
  const dates = useMemo(() => {
    const today = new Date();
    const result = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      result.push({
        value: d.toISOString().split('T')[0],
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
        allowed: isDateAllowed(d.toISOString().split('T')[0], selectedService?.id === 'table-booking' ? 'dine-in-table' : 'nightlife')
      });
    }
    return result;
  }, [selectedService]);

  const slots = useMemo(() => getSlotsByDate(bookingDate), [bookingDate]);

  const handleBookingTypeSelect = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleFinalBooking = () => {
    if (!customerName || !phone) return alert('Please enter your name and phone number.');

    const commonData = {
      name: customerName,
      phone: phone,
      date: bookingDate,
      slot: selectedSlot?.time || 'Flexible',
      guests: guestCount
    };

    let url = '';
    if (selectedService.id === 'table-booking') {
      url = generateTableBookingUrl({ ...commonData, area: selectedArea });
    } else if (selectedService.id === 'candle-dinner') {
      url = generateCandleLightUrl({ ...commonData, specialRequest });
    } else if (selectedService.id === 'birthday-party') {
      url = generateBirthdayBookingUrl({ ...commonData, decoration, cakeCutting });
    } else {
      url = generateEventBookingUrl(selectedService.title, { ...commonData, description: specialRequest });
    }

    if (url) {
      window.open(url, '_blank');
      setStep(6);
    }
  };

  return (
    <div style={{ padding: '0 16px', paddingBottom: '90px' }}>
      <AnimatePresence mode="wait">
        
        {/* Step 1: Select Service */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <SectionTitle title="Experience Booking" subtitle="Select your preferred rooftop service." />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {services.map(service => (
                <Card 
                  key={service.id} 
                  onClick={() => handleBookingTypeSelect(service)}
                  style={{ padding: '20px', textAlign: 'center', background: 'var(--surface-color)', cursor: 'pointer' }}
                >
                  <span className="material-icons" style={{ color: 'var(--accent-color)', fontSize: '32px', marginBottom: '8px' }}>{service.icon}</span>
                  <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{service.title}</h3>
                </Card>
              ))}
              <Card 
                onClick={() => handleBookingTypeSelect({ id: 'table-booking', title: 'Table Booking', icon: 'restaurant' })}
                style={{ padding: '20px', textAlign: 'center', border: '2px dashed var(--accent-color)', background: 'transparent' }}
              >
                 <span className="material-icons" style={{ color: 'var(--accent-color)', fontSize: '32px', marginBottom: '8px' }}>restaurant</span>
                 <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Table Booking</h3>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Step 2: Date & Basic Info */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <button onClick={() => setStep(1)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: 0 }}><span className="material-icons">arrow_back</span></button>
              <h2 style={{ margin: 0, fontSize: '20px' }}>{selectedService.title}</h2>
            </div>

            <SectionTitle title="Select Date" subtitle={selectedService.id === 'table-booking' ? "Today & Tomorrow bookings only" : "Planning for later? Future dates available."} />
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '24px', scrollbarWidth: 'none' }}>
              {dates.map(date => (
                <button
                  key={date.value}
                  disabled={!date.allowed}
                  onClick={() => setBookingDate(date.value)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: bookingDate === date.value ? 'var(--accent-color)' : 'var(--border-color)',
                    background: bookingDate === date.value ? 'var(--accent-color)' : !date.allowed ? 'rgba(0,0,0,0.05)' : 'var(--surface-color)',
                    color: bookingDate === date.value ? '#fff' : !date.allowed ? 'var(--text-secondary)' : 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    opacity: !date.allowed ? 0.4 : 1,
                    flexShrink: 0,
                    cursor: date.allowed ? 'pointer' : 'default'
                  }}
                >
                  {date.label}
                </button>
              ))}
            </div>

            {selectedService.id === 'table-booking' && (
              <Card style={{ background: 'rgba(100, 65, 165, 0.05)', border: '1px dashed var(--accent-color)', marginBottom: '24px', padding: '16px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--accent-color)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="material-icons" style={{ fontSize: '18px' }}>info</span>
                  Table Booking Information
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  <li>Table bookings are available for dine-in customers.</li>
                  <li>Table booking can be made only one day in advance.</li>
                  <li>Same-day bookings are allowed based on availability.</li>
                  <li>For group bookings or events, please contact us on WhatsApp.</li>
                </ul>
              </Card>
            )}

            <Input label="Your Name *" placeholder="Enter full name" value={customerName || ''} onChange={(e) => setCustomerName(e.target.value)} />
            <Input label="Phone Number *" placeholder="+91" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ marginTop: '16px' }} />
            <Input label="Number of Guests" placeholder="e.g. 4" type="number" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} style={{ marginTop: '16px' }} />

            <Button variant="primary" style={{ width: '100%', marginTop: '32px' }} onClick={() => setStep(3)}>Next: Select Slot</Button>
          </motion.div>
        )}

        {/* Step 3: Slot Selection */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <button onClick={() => setStep(2)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: 0 }}><span className="material-icons">arrow_back</span></button>
              <h2 style={{ margin: 0, fontSize: '20px' }}>Available Slots</h2>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>For {new Date(bookingDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {slots.length > 0 ? slots.map(slot => (
                <button
                  key={slot.time}
                  disabled={slot.status === 'full' || slot.status === 'closed'}
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: selectedSlot?.time === slot.time ? 'var(--accent-color)' : 'var(--border-color)',
                    background: selectedSlot?.time === slot.time ? 'rgba(100, 65, 165, 0.1)' : 'var(--surface-color)',
                    textAlign: 'left',
                    opacity: (slot.status === 'full' || slot.status === 'closed') ? 0.6 : 1,
                    cursor: (slot.status === 'full' || slot.status === 'closed') ? 'default' : 'pointer'
                  }}
                >
                  <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{slot.time}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: getStatusColor(slot.status) }}>{getStatusLabel(slot.status)}</span>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getStatusColor(slot.status) }}></div>
                  </div>
                </button>
              )) : (
                <p>No slots found for this date. Please contact us on WhatsApp.</p>
              )}
            </div>

            <Button 
              variant="primary" 
              style={{ width: '100%', marginTop: '32px' }} 
              disabled={!selectedSlot}
              onClick={() => {
                if (selectedService.id === 'table-booking') setStep(4);
                else setStep(5);
              }}
            >
              Next Step
            </Button>
          </motion.div>
        )}

        {/* Step 4: Area Selection (Table Only) */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <button onClick={() => setStep(3)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: 0 }}><span className="material-icons">arrow_back</span></button>
              <h2 style={{ margin: 0, fontSize: '20px' }}>Where would you like to sit?</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {areas.map(area => (
                <Card 
                  key={area.id}
                  onClick={() => setSelectedArea(area.title)}
                  style={{ 
                    border: selectedArea === area.title ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                    background: selectedArea === area.title ? 'rgba(100, 65, 165, 0.05)' : 'var(--surface-color)',
                    cursor: 'pointer'
                  }}
                >
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold' }}>{area.title}</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>{area.description}</p>
                </Card>
              ))}
            </div>

            <Button variant="primary" style={{ width: '100%', marginTop: '32px' }} onClick={() => setStep(5)}>Next: Final Details</Button>
          </motion.div>
        )}

        {/* Step 5: Final Review & Notes */}
        {step === 5 && (
          <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
               <button onClick={() => selectedService.id === 'table-booking' ? setStep(4) : setStep(3)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: 0 }}><span className="material-icons">arrow_back</span></button>
              <h2 style={{ margin: 0, fontSize: '20px' }}>Finalize Booking</h2>
            </div>

            <Card style={{ padding: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Service:</span><strong>{selectedService.title}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Date:</span><strong>{bookingDate}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Time:</span><strong>{selectedSlot?.time}</strong></div>
                {selectedService.id === 'table-booking' && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Area:</span><strong>{selectedArea}</strong></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Guests:</span><strong>{guestCount}</strong></div>
              </div>
            </Card>

            {selectedService.id === 'birthday-party' ? (
              <>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                   <div style={{ flex: 1 }}>
                     <p style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 'bold' }}>Decoration Required?</p>
                     <select style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} value={decoration} onChange={e => setDecoration(e.target.value)}>
                        <option>Yes</option><option>No</option>
                     </select>
                   </div>
                   <div style={{ flex: 1 }}>
                     <p style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 'bold' }}>Cake Cutting?</p>
                     <select style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} value={cakeCutting} onChange={e => setCakeCutting(e.target.value)}>
                        <option>Yes</option><option>No</option>
                     </select>
                   </div>
                </div>
                <p style={{ fontSize: '12px', color: '#f44336', textAlign: 'center', marginBottom: '16px' }}>* Reminder: External cake charges ₹500 apply.</p>
              </>
            ) : (
              <Input 
                label="Any Special Requests?" 
                placeholder="e.g. Near the edge for city view" 
                value={specialRequest} 
                onChange={e => setSpecialRequest(e.target.value)} 
              />
            )}

            <Button variant="primary" style={{ width: '100%', marginTop: '24px' }} onClick={handleFinalBooking}>
              Confirm & Book on WhatsApp
            </Button>
          </motion.div>
        )}

        {/* Step 6: Success Message */}
        {step === 6 && (
          <motion.div 
            key="step6" 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '40px 20px' }}
          >
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 163, 127, 0.1)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--accent-color)' 
            }}>
              <span className="material-icons" style={{ fontSize: '48px' }}>check_circle</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>Booking Request Sent!</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px' }}>
              Your booking details have been sent via WhatsApp. <br/>
              <strong>Our team will contact you shortly</strong> to confirm your slot and finalize any special requests.
            </p>
            <Button variant="primary" style={{ width: '100%' }} onClick={() => setStep(1)}>
              Done
            </Button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>

  );
};
