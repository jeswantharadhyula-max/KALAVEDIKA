import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

function AchievementCard({ ach }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
        <img src={ach.image_url} alt={ach.title} className="img-cover"
          style={{ transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(7,7,15,0.85) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '1rem', left: '1rem',
          fontFamily: 'var(--ff-heading)', fontSize: '2rem', color: 'var(--gold)',
          fontWeight: 700,
        }}>{ach.year}</div>
      </div>
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', gap: '1rem' }}>
        {ach.award_image_url && (
          <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0 }}>
            <img src={ach.award_image_url} alt="award" className="img-cover" />
          </div>
        )}
        <div>
          <div className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>🏆 Award</div>
          <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{ach.title}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{ach.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Achievements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAchievements()
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="section-label">Our Glory</div>
          <h1 className="section-title fade-up">Achievements & Honours</h1>
          <div className="divider" style={{ margin: '1rem auto 0' }} />
          <p className="section-desc fade-up-2" style={{ margin: '1rem auto 0' }}>
            Years of dedication, passion, and excellence — honoured on every stage.
          </p>
        </div>
      </div>
      <section>
        <div className="container">
          {loading ? <LoadingSpinner /> : (
            <div className="grid-3">
              {items.map(a => <AchievementCard key={a.id} ach={a} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
