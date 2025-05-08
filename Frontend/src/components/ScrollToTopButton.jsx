import React, { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        background: '#e0e0e0',
        color: '#111',
        border: 'none',
        borderRadius: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        width: 54,
        height: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 15,
        cursor: 'pointer',
        gap: 2,
        transition: 'box-shadow .2s, transform .2s, background .2s',
        outline: 'none',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.13)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      aria-label="Quay lại đầu trang"
    >
      <span style={{ fontSize: 20, lineHeight: 1, marginBottom: 2 }}>↑</span>
      <span style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.1 }}>ĐẦU<br/>TRANG</span>
      <style>{`
        button:focus, button:active { outline: none !important; box-shadow: none !important; }
      `}</style>
    </button>
  );
} 