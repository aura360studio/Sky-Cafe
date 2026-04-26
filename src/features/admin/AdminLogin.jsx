import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../core/supabase/client';
import { useApp } from '../../core/context/AppContext';

export const AdminLogin = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setIsAdmin, setAdminSession } = useApp();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (authError) throw authError;

      if (data?.session) {
        setAdminSession(data.session);
        setIsAdmin(true);
      }
    } catch (err) {
      console.error('Login error:', err);
      let msg = err.message || 'Failed to login. Please check your credentials.';
      if (msg.includes('fetch')) {
        msg = 'Connection Error: Unable to reach Supabase. Please check if the project is active (not paused) in your dashboard.';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(15px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '40px',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
        }}
      >
        <button 
          onClick={onBack}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'rgba(255,255,255,0.4)', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
            padding: 0
          }}
        >
          <span className="material-icons" style={{ fontSize: '20px' }}>arrow_back</span>
          Back to Home
        </button>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: 'var(--accent-color)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 10px 20px rgba(16, 163, 127, 0.2)'
          }}>
            <span className="material-icons" style={{ color: '#fff', fontSize: '32px' }}>key</span>
          </div>
          <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '800', margin: 0 }}>Admin Login</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '8px' }}>Security Portal</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', fontWeight: '600' }}>Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aura360.com"
              required
              style={{
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '14px 16px',
                color: '#fff',
                fontSize: '15px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', fontWeight: '600' }}>Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '14px 16px',
                color: '#fff',
                fontSize: '15px'
              }}
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ color: '#e5534b', fontSize: '13px', backgroundColor: 'rgba(229, 83, 75, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(229, 83, 75, 0.2)' }}
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '10px',
              padding: '16px',
              backgroundColor: 'var(--accent-color)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'transform 0.2s'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
