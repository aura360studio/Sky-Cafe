import React from 'react';
import { motion } from 'framer-motion';
import { useApp, APP_PAGES } from '../../core/context/AppContext';
import { SectionTitle } from '../../shared/components/SectionTitle';
import { Card } from '../../shared/components/Card';
import { Button } from '../../shared/components/Button';
import { WA_BUSINESS_NUMBER } from '../../services/whatsapp';

export const AboutView = () => {
  const { setActivePage } = useApp();

  return (
    <div style={{ padding: '16px', paddingBottom: '100px', paddingTop: '20px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <button 
          onClick={() => setActivePage(APP_PAGES.HOME)}
          style={{ background: 'var(--surface-color)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <span className="material-icons" style={{ color: 'var(--text-primary)' }}>arrow_back</span>
        </button>
        <h1 style={{ fontSize: '24px', margin: 0 }}>About Sky</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card style={{ padding: '24px', marginBottom: '24px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', 
            background: 'var(--accent-color)', opacity: 0.1, borderRadius: '0 0 0 100%' 
          }} />
          
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px', color: 'var(--accent-color)' }}>
            Sky Cafe & Kitchen
          </h2>
          
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--text-primary)', marginBottom: '20px' }}>
            Sky Cafe & Kitchen is Nagarbhavi's premium rooftop destination. We blend gourmet flavors with a stunning open-air ambiance. 
          </p>
          
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Whether you're here for a quiet coffee, a celebratory dinner under the stars, or our signature Night Life events, we aim to make every moment magical. We pride ourselves on using the freshest ingredients and providing impeccable service to our guests.
          </p>

          <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Established</h4>
              <p style={{ margin: 0, fontWeight: 'bold' }}>2023</p>
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Philosophy</h4>
              <p style={{ margin: 0, fontWeight: 'bold' }}>Fresh & Vibe</p>
            </div>
          </div>
        </Card>

        <SectionTitle title="Visit Us" />
        <Card style={{ padding: '20px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(16, 163, 127, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)', flexShrink: 0 }}>
              <span className="material-icons">location_on</span>
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Our Location</h4>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                Deepa Complex, Muddinapalya Road, ITI Layout, Nagarabhavi, Bengaluru
              </p>
            </div>
          </div>
        </Card>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Have questions or want to host an event?
          </p>
          <Button 
            variant="outline" 
            style={{ width: '100%', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
            onClick={() => window.open(`tel:${WA_BUSINESS_NUMBER}`)}
          >
            <span className="material-icons" style={{ fontSize: '18px', marginRight: '8px' }}>call</span>
            Contact Concierge
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
