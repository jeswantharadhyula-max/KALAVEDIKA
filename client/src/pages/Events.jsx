import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

function EventCard({ event }) {
  const date    = new Date(event.date);
  const month   = date.toLocaleString('default', { month: 'short' }).toUpperCase();
  const day     = date.getDate();
  const year    = date.getFullYear();
  const isPast  = !event.is_upcoming;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src={event.image_url}
          alt={event.title}
          className="img-cover"
          style={{ transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute', top: '1rem', left: '1rem',
          background: 'rgba(7,7,15,0.85)', backdropFilter: 'blur(8px)',
          borderRadius: 'var(--radius-sm)', padding: '0.4rem 0.7rem',
          border: '1px solid var(--border-gold)', textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em' }}>{month}</div>
          <div style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.5rem', color: 'var(--text-primary)', lineHeight: 1 }}>{day}</div>
          <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{year}</div>
        </div>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <span className={`badge ${isPast ? 'badge-crimson' : 'badge-green'}`}>
            {isPast ? 'Past' : 'Upcoming'}
          </span>
        </div>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.2rem', lineHeight: 1.3 }}>{event.title}</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>
          {event.description}
        </p>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            🕐 {event.time}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            📍 {event.location}
          </p>
          {event.registration_info && (
            <p style={{ fontSize: '0.78rem', color: 'var(--gold)', marginTop: '0.25rem' }}>
              🎫 {event.registration_info}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [events, setEvents]   = useState([]);
  const [filter, setFilter]   = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEvents()
      .then(setEvents)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? events
    : filter === 'upcoming' ? events.filter(e => e.is_upcoming)
    : events.filter(e => !e.is_upcoming);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="section-label">Calendar</div>
          <h1 className="section-title fade-up">Events & Performances</h1>
          <div className="divider" style={{ margin: '1rem auto 0' }} />
          <p className="section-desc fade-up-2" style={{ margin: '1rem auto 0' }}>
            From intimate recitals to grand festivals — every event is a celebration of art.
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {['all', 'upcoming', 'past'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`btn ${filter === f ? 'btn-gold' : 'btn-outline'}`}
                style={{ fontSize: '0.85rem', padding: '0.55rem 1.25rem', textTransform: 'capitalize' }}
              >
                {f === 'all' ? 'All Events' : f === 'upcoming' ? '🗓 Upcoming' : '📚 Past'}
              </button>
            ))}
          </div>

          {loading ? <LoadingSpinner /> : filtered.length === 0 ? (
            <div className="empty-state">
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>No events found.</p>
            </div>
          ) : (
            <div className="grid-3">
              {filtered.map(e => <EventCard key={e.id} event={e} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
