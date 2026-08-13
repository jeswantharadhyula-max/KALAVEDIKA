import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

function ActivityCard({ activity }) {
  const [expanded, setExpanded] = useState(false);
  const gallery = Array.isArray(activity.gallery_json) ? activity.gallery_json : [];

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
        <img src={activity.image_url} alt={activity.title} className="img-cover"
          style={{ transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
          <span className="badge badge-gold">{activity.category}</span>
        </div>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{activity.title}</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>🕐 {activity.date}</p>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1rem' }}>
          {activity.description}
        </p>
        {gallery.length > 0 && (
          <>
            <button
              className="btn btn-outline"
              style={{ fontSize: '0.78rem', padding: '0.4rem 1rem', marginBottom: expanded ? '1rem' : 0 }}
              onClick={() => setExpanded(e => !e)}
            >
              {expanded ? 'Hide Gallery ▲' : `Gallery (${gallery.length}) ▼`}
            </button>
            {expanded && (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(gallery.length, 3)}, 1fr)`, gap: '0.5rem' }}>
                {gallery.map((url, i) => (
                  <div key={i} style={{ height: '90px', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                    <img src={url} alt="" className="img-cover" />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getActivities()
      .then(setActivities)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(activities.map(a => a.category).filter(Boolean))];
  const filtered = filter === 'All' ? activities : activities.filter(a => a.category === filter);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="section-label">What We Do</div>
          <h1 className="section-title fade-up">Activities & Workshops</h1>
          <div className="divider" style={{ margin: '1rem auto 0' }} />
          <p className="section-desc fade-up-2" style={{ margin: '1rem auto 0' }}>
            From weekly workshops to annual showcases — there's always something to learn and perform.
          </p>
        </div>
      </div>
      <section>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`btn ${filter === c ? 'btn-gold' : 'btn-outline'}`}
                style={{ fontSize: '0.82rem', padding: '0.5rem 1.1rem' }}>
                {c}
              </button>
            ))}
          </div>
          {loading ? <LoadingSpinner /> : (
            <div className="grid-3">
              {filtered.map(a => <ActivityCard key={a.id} activity={a} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
