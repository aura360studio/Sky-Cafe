import React from 'react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { Button } from './Button';

export const iOSInstallGuide = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Install Sky Cafe App">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px 0' }}>
        <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          Follow these 3 simple steps to add Sky Cafe to your iPhone home screen:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-color)', 
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 
            }}>1</div>
            <p style={{ margin: 0, fontSize: '14px' }}>
              Tap the <strong>Share</strong> button at the bottom of your Safari screen <span style={{ fontSize: '18px' }}>📤</span>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-color)', 
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 
            }}>2</div>
            <p style={{ margin: 0, fontSize: '14px' }}>
              Scroll down and select <strong>"Add to Home Screen"</strong> <span style={{ fontSize: '18px' }}>➕</span>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-color)', 
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 
            }}>3</div>
            <p style={{ margin: 0, fontSize: '14px' }}>
              Tap <strong>"Add"</strong> in the top right corner to finish! ✨
            </p>
          </div>
        </div>

        <Button variant="primary" style={{ width: '100%', marginTop: '10px' }} onClick={onClose}>
          Got it!
        </Button>
      </div>
    </Modal>
  );
};
