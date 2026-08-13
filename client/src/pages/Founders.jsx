import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

function FounderCard({ founder }) {
  return (
    <div className="card" style={{ display: 'flex', gap: '2rem', padding: '2rem', alignItems: 'flex-start' }}>
      <div style={{
        width: '110px', height: '110px', borderRadius: '50%',
        overflow: 'hidden', flexShrink: 0,
        border: '3px solid var(--border-gold)',
        boxShadow: '0 0 24px rgba(212,168,67,0.2)',
      }}>
        <img
          src={founder.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(founder.name)}&background=1a1a2e&color=d4a843&size=110`}
          alt={founder.name}
          className="img-cover"
        />
      </div>
      <div style={{ flex: 1 }}>
        <div className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
          Est. {founder.year_founded}
        </div>
        <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.4rem', marginBottom: '0.25rem' }}>
          {founder.name}
        </h3>
        <p style={{ color: 'var(--gold)', fontWeight: 500, fontSize: '0.9rem', marginBottom: '1rem' }}>
          {founder.role}
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.925rem' }}>
          {founder.description}
        </p>
      </div>
    </div>
  );
}

export default function Founders() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.getFounders()
      .then(setFounders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="section-label">Our Legacy</div>
          <h1 className="section-title fade-up">The Visionaries Behind<br /><em style={{ color: 'var(--gold)' }}>KalaVedika</em></h1>
          <div className="divider" style={{ margin: '1rem auto 0' }} />
          <p className="section-desc fade-up-2" style={{ margin: '1rem auto 0' }}>
            Born from a vision to unite art and education, KalaVedika was founded by those
            who believed great artists deserve a great stage.
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          {/* Timeline accent */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(212,168,67,0.08), rgba(192,57,43,0.05))',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 3rem 1rem',
            marginBottom: '3rem',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--ff-heading)', fontSize: 'clamp(3rem,8vw,6rem)', color: 'var(--gold)', opacity: 0.15, lineHeight: 1 }}>
              2010
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: '-1rem', fontSize: '0.9rem' }}>
              Year KalaVedika was established
            </p>
          </div>

          {loading ? <LoadingSpinner /> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {founders.map(f => <FounderCard key={f.id} founder={f} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
