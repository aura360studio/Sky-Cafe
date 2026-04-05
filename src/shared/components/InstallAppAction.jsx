import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../core/context/AppContext';
import { Card } from './Card';
import { Button } from './Button';
import { SectionTitle } from './SectionTitle';
import { iOSInstallGuide } from './iOSInstallGuide';

export const InstallAppAction = () => {
  const { isInstalled, isiOS, handleInstallApp, deferredPrompt } = useApp();
  const [isiOSModalOpen, setIsiOSModalOpen] = useState(false);

  // Don't show if already installed
  if (isInstalled) return null;

  // Don't show if not iOS and no deferred prompt available (not installable on this browser)
  if (!isiOS && !deferredPrompt) return null;

  const onInstallClick = () => {
    if (isiOS) {
      setIsiOSModalOpen(true);
    } else {
      handleInstallApp();
    }
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <SectionTitle title="App Experience" subtitle="Get the full Sky experience" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card style={{ 
          background: 'linear-gradient(135deg, var(--surface-color) 0%, var(--surface-hover) 100%)',
          borderLeft: '4px solid var(--accent-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          padding: '20px'
        }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Sky Web App</h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              Install now for faster access and a better mobile experience!
            </p>
          </div>
          <Button 
            variant="primary" 
            onClick={onInstallClick}
            style={{ padding: '10px 16px', fontSize: '14px', fontWeight: '600', flexShrink: 0 }}
          >
            Install Now
          </Button>
        </Card>
      </motion.div>

      <iOSInstallGuide 
        isOpen={isiOSModalOpen} 
        onClose={() => setIsiOSModalOpen(false)} 
      />
    </div>
  );
};
