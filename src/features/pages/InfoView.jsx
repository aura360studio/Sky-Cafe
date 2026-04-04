import React, { useState } from 'react';
import { useApp, APP_PAGES } from '../../core/context/AppContext';
import { SectionTitle } from '../../shared/components/SectionTitle';
import { Card } from '../../shared/components/Card';
import { Button } from '../../shared/components/Button';
import { calculateDistance, getDeliveryEstimate } from '../../services/location';

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

  const steps = [
    { icon: 'shopping_cart', label: 'Order', sub: 'Via App' },
    { icon: 'check_circle', label: 'Confirm', sub: 'Kitchen' },
    { icon: 'restaurant', label: 'Prepare', sub: 'Fresh' },
    { icon: 'inventory_2', label: 'Ready', sub: 'Packed' },
    { icon: 'local_shipping', label: 'Book', sub: 'Pickup' },
    { icon: 'home', label: 'Delivery', sub: 'Enjoy' }
  ];

  const partners = ['Dunzo', 'Rapido', 'Uber Parcel', 'Porter', 'Swiggy Genie', 'Shadowfax'];

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
      <SectionTitle title="1. How Delivery Works" />
      <Card style={{ marginBottom: '24px' }}>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
          Ordering from Sky Cafe is simple! Once you place your order via our app and confirm it on WhatsApp, our chefs start preparing your meal. 
          When your food is ready, we'll notify you. You can then book a pickup through services like Dunzo or Rapido, and we'll hand it off to the rider for safe delivery.
        </p>
      </Card>

      {/* 2. Delivery Steps */}
      <SectionTitle title="2. Delivery Steps" />
      <Card style={{ marginBottom: '24px', padding: '20px 10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px 8px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ background: 'var(--background-color)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', border: '1px solid var(--border-color)' }}>
                <span className="material-icons" style={{ fontSize: '20px', color: 'var(--accent-color)' }}>{step.icon}</span>
              </div>
              <div style={{ fontWeight: '600', fontSize: '13px' }}>{step.label}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{step.sub}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Check Distance */}
      <SectionTitle title="3. Check Distance" subtitle="Find out if we deliver to you" />
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
      </Card>

      {/* 5. Pickup Location Map */}
      <SectionTitle title="5. Pickup Location" />
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ background: '#333', width: '100%', height: '140px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
           <span className="material-icons" style={{ fontSize: '40px', color: 'var(--accent-color)' }}>location_on</span>
           <span style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>Google Maps Location</span>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Sky Cafe & Kitchen</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Deepa Complex, Muddinapalya Road, ITI Layout, Nagarabhavi, Bengaluru</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
          <span className="material-icons" style={{ fontSize: '18px', color: '#4caf50' }}>call</span>
          <span style={{ fontWeight: '500' }}>+91 98765 43210</span>
        </div>
      </Card>

      {/* 6. Delivery Partners */}
      <SectionTitle title="6. Delivery Partners" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '40px' }}>
        {partners.map(p => (
          <div key={p} style={{ background: 'var(--surface-color)', padding: '12px 4px', borderRadius: '8px', textAlign: 'center', fontSize: '12px', fontWeight: '500', border: '1px solid var(--border-color)' }}>
            {p}
          </div>
        ))}
      </div>

    </div>
  );
};
