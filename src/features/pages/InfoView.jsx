import React, { useState } from 'react';
import { useApp, APP_PAGES } from '../../core/context/AppContext';
import { SectionTitle } from '../../shared/components/SectionTitle';
import { Card } from '../../shared/components/Card';
import { Button } from '../../shared/components/Button';
import { calculateDistance, getDeliveryEstimate } from '../../services/location';
import { WA_BUSINESS_NUMBER, generateGeneralInquiryUrl } from '../../services/whatsapp';

export const InfoView = () => {

  const { setActivePage } = useApp();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const CAFE_COORDS = { lat: 12.9681586, lng: 77.5013195 };

  const checkDistance = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const dist = calculateDistance(latitude, longitude, CAFE_COORDS.lat, CAFE_COORDS.lng);
        const estimate = getDeliveryEstimate(dist);
        
        setResult({
          distance: dist.toFixed(1),
          time: estimate.time,
          cost: estimate.range
        });
        setLoading(false);
      },
      (err) => {
        setError("Unable to retrieve location. Please enable location permissions.");
        setLoading(false);
      }
    );
  };

  const deliverySteps = [
    { title: 'Place Your Order', icon: 'shopping_cart', text: 'Browse the menu, add items to cart, and send your order through WhatsApp.' },
    { title: 'Confirm Order & Payment', icon: 'payment', text: 'We will confirm your order on WhatsApp. Food preparation will begin after order confirmation and payment to ensure fresh preparation.' },
    { title: 'Fresh Food Preparation', icon: 'restaurant', text: 'Our chefs start preparing your food once the order is confirmed and payment is completed.' },
    { title: 'Ready for Pickup', icon: 'notifications_active', text: 'Once your order is ready, we will notify you on WhatsApp so you can arrange pickup.' },
    { title: 'Book Your Delivery Partner', icon: 'local_shipping', text: 'You can book pickup through your preferred delivery partners like Dunzo, Rapido, Uber Parcel, Porter, or any other service.' }
  ];

  const benefits = [
    { 
      title: 'Lower Prices', 
      icon: 'savings', 
      text: 'Direct orders have lower prices compared to food delivery apps because there are no platform commissions.' 
    },
    { 
      title: 'Fresh Food', 
      icon: 'auto_awesome', 
      text: 'We prepare food only after order confirmation, so your food is always freshly prepared.' 
    },
    { 
      title: 'Choose Your Partner', 
      icon: 'directions_bike', 
      text: 'You can book pickup through Dunzo, Rapido, Uber Parcel, Porter, or any delivery partner you prefer.' 
    },
    { 
      title: 'Better Communication', 
      icon: 'chat', 
      text: 'You can directly contact us on WhatsApp for updates, special instructions, or order changes.' 
    },
    { 
      title: 'Support Local Business', 
      icon: 'storefront', 
      text: 'Ordering directly helps us avoid high commissions and allows us to maintain better food quality and pricing.' 
    }
  ];

  return (
    <div style={{ padding: '16px', paddingBottom: '100px', paddingTop: '20px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <button 
          onClick={() => setActivePage(APP_PAGES.HOME)}
          style={{ background: 'var(--surface-color)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <span className="material-icons" style={{ color: 'var(--text-primary)' }}>arrow_back</span>
        </button>
        <h1 style={{ fontSize: '24px', margin: 0 }}>Delivery Info</h1>
      </div>

      {/* 1. How Delivery Works */}
      <SectionTitle title="1. Overview" />
      <Card style={{ marginBottom: '24px' }}>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
          Ordering from Sky Cafe is simple! Once you place your order via our app and confirm it on WhatsApp, our chefs start preparing your meal. 
          When your food is ready, we'll notify you. You can then book a pickup through services like Dunzo or Rapido, and we'll hand it off to the rider for safe delivery.
        </p>
      </Card>

      {/* 2. Delivery Steps */}
      <SectionTitle title="2. Delivery Process" subtitle="Swipe through the steps" />
      <div style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        gap: '16px', 
        padding: '4px 16px 24px', 
        margin: '0 -16px',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
        {deliverySteps.map((step, i) => (
          <Card key={i} style={{ 
            flexShrink: 0, 
            width: '260px', 
            scrollSnapAlign: 'start',
            marginLeft: i === 0 ? '16px' : '0',
            marginRight: i === deliverySteps.length - 1 ? '16px' : '0',
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            minHeight: '180px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                background: 'var(--accent-color)', 
                width: '40px', 
                height: '40px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(16, 163, 127, 0.3)'
              }}>
                <span className="material-icons" style={{ fontSize: '20px', color: '#fff' }}>{step.icon}</span>
              </div>
              <div style={{ color: 'var(--accent-color)', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Step {i + 1}
              </div>
            </div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>{step.title}</h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {step.text}
            </p>
          </Card>
        ))}
      </div>

      {/* 3. Why Order Directly? */}
      <SectionTitle title="3. Why Order Directly?" subtitle="Swipe through the benefits" />
      <div style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        gap: '16px', 
        padding: '4px 16px 24px', 
        margin: '0 -16px',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
        {benefits.map((benefit, i) => (
          <Card key={i} style={{ 
            flexShrink: 0, 
            width: '280px', 
            scrollSnapAlign: 'center',
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            minHeight: '180px'
          }}>
            <div style={{ 
              background: 'rgba(16, 163, 127, 0.1)', 
              color: 'var(--accent-color)', 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <span className="material-icons" style={{ fontSize: '20px' }}>{benefit.icon}</span>
            </div>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>{benefit.title}</h4>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {benefit.text}
            </p>
          </Card>
        ))}
        
        {/* Summary Card */}
        <Card style={{ 
          flexShrink: 0, 
          width: '260px', 
          scrollSnapAlign: 'start',
          marginRight: '16px',
          background: 'var(--accent-color)', 
          color: '#fff', 
          textAlign: 'center',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Better for You, Better for Us</h4>
          <p style={{ margin: 0, fontSize: '13px', opacity: 0.9, lineHeight: '1.4' }}>
            Direct ordering gives you better prices and helps us serve you better. It's a win-win for everyone.
          </p>
        </Card>
      </div>

      {/* 4. Check Distance & Charges */}
      <SectionTitle title="4. Distance & Charges" subtitle="Calculate your delivery cost" />
      <Card style={{ marginBottom: '24px', textAlign: 'center', border: '1px solid var(--accent-color)', background: 'rgba(255, 107, 107, 0.05)' }}>
        {!result ? (
          <>
            <p style={{ fontSize: '14px', marginBottom: '16px' }}>Click below to calculate distance, time, and estimated delivery charges.</p>
            <Button variant="primary" onClick={checkDistance} disabled={loading}>
              {loading ? "Calculating..." : "Check Distance Now"}
            </Button>
            {error && <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '12px' }}>{error}</p>}
          </>
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Distance</div>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'var(--accent-color)' }}>{result.distance} km</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Est. Time</div>
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{result.time}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Est. Cost</div>
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{result.cost}</div>
              </div>
            </div>
            <Button variant="outline" style={{ marginTop: '16px', fontSize: '12px' }} onClick={() => setResult(null)}>Recalculate</Button>
            <p style={{ 
              fontSize: '11px', 
              color: 'var(--text-secondary)', 
              fontStyle: 'italic', 
              marginTop: '16px', 
              lineHeight: '1.4' 
            }}>
              * Note: This is an estimated calculation based on current location and average rates. Please verify real-time charges and delivery times on your preferred pickup app (Dunzo, Rapido, etc.)
            </p>
          </div>
        )}
      </Card>

      {/* 4. Delivery Charges Guide */}
      <SectionTitle title="4. Delivery Charges Guide" />
      <Card style={{ marginBottom: '24px', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: 'var(--surface-color)', textAlign: 'left' }}>
              <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>Distance</th>
              <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>Approx. Charge</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>0 – 3 km</td>
              <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', fontWeight: 'bold' }}>₹40 – ₹50</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>3 – 6 km</td>
              <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', fontWeight: 'bold' }}>₹60 – ₹80</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px' }}>6 – 10 km</td>
              <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>₹90 – ₹120</td>
            </tr>
          </tbody>
        </table>
        <p style={{ 
          fontSize: '11px', 
          color: 'var(--text-secondary)', 
          fontStyle: 'italic', 
          margin: '12px 16px', 
          lineHeight: '1.4' 
        }}>
          * Note: These are approximate estimates based on average rates. Please verify exact charges and delivery times on your preferred pickup app (Dunzo, Rapido, etc.) before booking.
        </p>
      </Card>

      {/* 5. Pickup Location Map */}
      <SectionTitle title="5. Pickup Location" />
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ background: '#333', width: '100%', height: '140px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
           <span className="material-icons" style={{ fontSize: '40px', color: 'var(--accent-color)' }}>location_on</span>
           <span style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>Google Maps Location</span>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Sky Cafe & Kitchen</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            Deepa Complex, Muddinapalya Road, ITI Layout, Nagarabhavi, Bengaluru
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <Button 
            variant="outline" 
            style={{ flex: 1, fontSize: '12px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            onClick={() => {
              navigator.clipboard.writeText("Sky Cafe & Kitchen, Deepa Complex, Muddinapalya Road, ITI Layout, Nagarabhavi, Bengaluru");
              alert("Address copied to clipboard!");
            }}
          >
            <span className="material-icons" style={{ fontSize: '16px' }}>content_copy</span>
            Copy Address
          </Button>
          <Button 
            variant="outline" 
            style={{ flex: 1, fontSize: '12px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            onClick={() => window.open(`https://www.google.com/maps?q=${CAFE_COORDS.lat},${CAFE_COORDS.lng}`, '_blank')}
          >
            <span className="material-icons" style={{ fontSize: '16px' }}>map</span>
            Google Maps
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
          <span className="material-icons" style={{ fontSize: '18px', color: '#4caf50' }}>call</span>
          <span style={{ fontWeight: '500' }}>{WA_BUSINESS_NUMBER}</span>
        </div>
      </Card>

      {/* 6. Contact & Support */}
      <SectionTitle title="6. Contact & Support" subtitle="Get in touch on WhatsApp" />
      <Card style={{ marginBottom: '40px', textAlign: 'center', border: '1px solid #25d366', background: 'rgba(37, 211, 102, 0.05)' }}>
        <p style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Have a special request, large order, or need a quick update? Ping us on WhatsApp!
        </p>
        <Button 
          variant="primary" 
          style={{ background: '#25d366', border: 'none', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          onClick={() => window.open(generateGeneralInquiryUrl('general support'), '_blank')}
        >
          <span className="material-icons">chat</span>
          Message us on WhatsApp
        </Button>
      </Card>

    </div>
  );
};
