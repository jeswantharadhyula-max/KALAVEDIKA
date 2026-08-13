import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const DOMAINS = ['All', 'Dance', 'Music', 'Singing', 'Drama', 'Fine Arts', 'Other'];

function MemberCard({ member }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: 0, overflow: 'hidden' }}>
      <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={member.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1a1a2e&color=d4a843&size=220`}
          alt={member.name}
          className="img-cover"
          style={{ transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(7,7,15,0.9) 0%, transparent 60%)',
        }} />
        <div style={{ position: 'absolute', bottom: '0.75rem', left: 0, right: 0, padding: '0 1rem' }}>
          {member.domain && <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>{member.domain}</span>}
        </div>
      </div>
      <div style={{ padding: '1.25rem' }}>
        <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{member.name}</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--gold)', fontWeight: 500, marginBottom: '0.5rem' }}>{member.position}</p>
        {member.description && (
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            {member.description.slice(0, 100)}{member.description.length > 100 ? '…' : ''}
          </p>
        )}
        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {member.department && <span className="badge badge-crimson" style={{ fontSize: '0.68rem' }}>{member.department}</span>}
          {member.year && <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Year {member.year}</span>}
        </div>
      </div>
    </div>
  );
}

export default function Members() {
  const [members, setMembers]   = useState([]);
  const [domain, setDomain]     = useState('All');
  const [search, setSearch]     = useState('');
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.getMembers()
      .then(setMembers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = members.filter(m => {
    const matchDomain = domain === 'All' || m.domain === domain;
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase())
      || m.position?.toLowerCase().includes(search.toLowerCase());
    return matchDomain && matchSearch;
  });

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="section-label">Our People</div>
          <h1 className="section-title fade-up">Meet the Team</h1>
          <div className="divider" style={{ margin: '1rem auto 0' }} />
          <p className="section-desc fade-up-2" style={{ margin: '1rem auto 0' }}>
            Talented artists, passionate performers, and dedicated hearts who make KalaVedika what it is.
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          {/* Controls */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              className="form-input"
              placeholder="Search members…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ maxWidth: '280px' }}
            />
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {DOMAINS.map(d => (
                <button
                  key={d}
                  onClick={() => setDomain(d)}
                  className={`btn ${domain === d ? 'btn-gold' : 'btn-outline'}`}
                  style={{ fontSize: '0.78rem', padding: '0.45rem 1rem' }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
            {filtered.length} member{filtered.length !== 1 ? 's' : ''} found
          </p>

          {loading ? <LoadingSpinner /> : filtered.length === 0 ? (
            <div className="empty-state">
              <p style={{ color: 'var(--text-secondary)' }}>No members match your search.</p>
            </div>
          ) : (
            <div className="grid-4">
              {filtered.map(m => <MemberCard key={m.id} member={m} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
