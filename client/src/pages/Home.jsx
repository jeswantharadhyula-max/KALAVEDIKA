import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

/* ── Hero ──────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', paddingTop: '5rem',
    }}>
      {/* Background layers */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(212,168,67,0.1), transparent), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(192,57,43,0.07), transparent)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(212,168,67,0.06) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '780px' }}>
          <div className="section-label fade-up">Cultural Arts Club</div>
          <h1 className="fade-up-2" style={{
            fontFamily: 'var(--ff-heading)',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            lineHeight: 1.08,
            marginBottom: '1.5rem',
          }}>
            Where <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Art</em><br />
            Finds Its Voice
          </h1>
          <p className="section-desc fade-up-3" style={{ fontSize: '1.15rem', marginBottom: '2.5rem' }}>
            KalaVedika is a premier cultural club celebrating classical dance, music,
            drama, and the timeless performing arts of India. We nurture talent,
            preserve traditions, and give artists a stage to shine.
          </p>
          <div className="fade-up-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/events" className="btn btn-gold">Upcoming Events</Link>
            <Link to="/members" className="btn btn-outline">Meet the Team</Link>
          </div>
        </div>
      </div>

      {/* Decorative orbs */}
      <div style={{
        position: 'absolute', right: '-100px', top: '20%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}

/* ── Stats bar ─────────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { value: '50+',  label: 'Active Members'    },
    { value: '15+',  label: 'Events Per Year'   },
    { value: '10+',  label: 'Years of Legacy'   },
    { value: '20+',  label: 'Awards & Honours'  },
  ];
  return (
    <div style={{
      background: 'rgba(212,168,67,0.06)',
      borderTop: '1px solid var(--border-gold)',
      borderBottom: '1px solid var(--border-gold)',
      padding: '2.5rem 0',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: '2rem', textAlign: 'center' }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'var(--ff-heading)', fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '0.25rem' }}>{s.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Event card (mini) ─────────────────────────────────────── */
function MiniEventCard({ event }) {
  const date = new Date(event.date);
  const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
  const day   = date.getDate();
  return (
    <div className="card" style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem', alignItems: 'flex-start' }}>
      <div style={{
        minWidth: '56px', textAlign: 'center',
        background: 'var(--gold-dim)', borderRadius: 'var(--radius-sm)',
        padding: '0.5rem',
        border: '1px solid var(--border-gold)',
      }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em' }}>{month}</div>
        <div style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.8rem', color: 'var(--text-primary)', lineHeight: 1 }}>{day}</div>
      </div>
      <div>
        <div className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Upcoming</div>
        <h4 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.05rem', marginBottom: '0.35rem' }}>{event.title}</h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>📍 {event.location} · {event.time}</p>
      </div>
    </div>
  );
}

/* ── About section ─────────────────────────────────────────── */
function About() {
  return (
    <section>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <div>
            <div className="section-label">About Us</div>
            <h2 className="section-title">A Stage for Every<br /><em style={{ color: 'var(--gold)' }}>Art Form</em></h2>
            <div className="divider" />
            <p className="section-desc" style={{ marginBottom: '1.25rem' }}>
              Founded over a decade ago, KalaVedika has grown into one of the most
              celebrated cultural clubs in the region, bringing together artists
              across dance, music, drama, and fine arts.
            </p>
            <p className="section-desc" style={{ marginBottom: '2rem' }}>
              We host workshops led by renowned gurus, annual festivals drawing
              thousands of attendees, and competitions that have launched careers.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/founders" className="btn btn-gold">Our Story</Link>
              <Link to="/activities" className="btn btn-outline">What We Do</Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { icon: '🎭', title: 'Classical Dance',    desc: 'Bharatnatyam, Kathak, Odissi & more' },
              { icon: '🎵', title: 'Vocal & Instrumental', desc: 'Hindustani & Carnatic traditions' },
              { icon: '🎨', title: 'Fine Arts',          desc: 'Painting, sculpture & folk art' },
              { icon: '🎬', title: 'Drama & Theatre',    desc: 'Stagecraft and performance art' },
            ].map(item => (
              <div key={item.title} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h4 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1rem', marginBottom: '0.35rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Main Home page ────────────────────────────────────────── */
export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEvents({ upcoming: 'true' })
      .then(data => setEvents(data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Hero />
      <StatsBar />
      <About />

      {/* Upcoming Events Preview */}
      <section style={{ background: 'var(--bg-primary)', padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">What's On</div>
            <h2 className="section-title">Upcoming Events</h2>
            <div className="divider" />
          </div>
          {loading ? <LoadingSpinner /> : events.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No upcoming events at the moment.</p>
          ) : (
            <div className="grid-3">
              {events.map(e => <MiniEventCard key={e.id} event={e} />)}
            </div>
          )}
          <div style={{ marginTop: '2.5rem' }}>
            <Link to="/events" className="btn btn-outline">View All Events →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '6rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(212,168,67,0.1), rgba(192,57,43,0.08))',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-xl)',
            padding: '4rem 2rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div className="section-label">Join Us</div>
            <h2 className="section-title">Ready to Share Your Art?</h2>
            <p className="section-desc" style={{ margin: '0 auto 2rem' }}>
              Whether you dance, sing, paint, or perform — KalaVedika is your home.
            </p>
            <Link to="/feedback" className="btn btn-gold" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
