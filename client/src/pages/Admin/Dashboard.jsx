import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';

function StatCard({ label, value, icon }) {
  return (
    <div className="card" style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
      <div style={{
        width: '52px', height: '52px', borderRadius: 'var(--radius-md)',
        background: 'var(--gold-dim)', border: '1px solid var(--border-gold)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem', flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{ fontFamily: 'var(--ff-heading)', fontSize: '2rem', color: 'var(--gold)' }}>{value}</div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{label}</div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('feedback');
  const [feedback, setFeedback] = useState([]);
  const [members,  setMembers]  = useState([]);
  const [events,   setEvents]   = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!admin) { navigate('/admin/login'); return; }
    Promise.all([
      api.getFeedback().catch(() => []),
      api.getMembers().catch(() => []),
      api.getEvents().catch(() => []),
    ]).then(([fb, mb, ev]) => {
      setFeedback(fb); setMembers(mb); setEvents(ev);
    }).finally(() => setLoading(false));
  }, [admin]);

  const deleteFb = async (id) => {
    if (!confirm('Delete this feedback?')) return;
    await api.deleteFeedback(id);
    setFeedback(f => f.filter(x => x.id !== id));
  };

  const deleteMember = async (id) => {
    if (!confirm('Delete this member?')) return;
    await api.deleteMember(id);
    setMembers(m => m.filter(x => x.id !== id));
  };

  if (!admin) return null;

  const TABS = ['feedback', 'members', 'events'];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-label">Admin Panel</div>
            <h1 style={{ fontFamily: 'var(--ff-heading)', fontSize: '2rem' }}>Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Welcome, {admin.username}</p>
          </div>
          <button className="btn btn-outline" onClick={() => { logout(); navigate('/'); }}>
            Logout
          </button>
        </div>

        {/* Stats */}
        {loading ? <LoadingSpinner /> : (
          <>
            <div className="grid-3" style={{ marginBottom: '3rem' }}>
              <StatCard icon="💬" label="Feedback Submissions" value={feedback.length} />
              <StatCard icon="👥" label="Total Members"       value={members.length} />
              <StatCard icon="🎭" label="Total Events"        value={events.length} />
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem' }}>
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`btn ${tab === t ? 'btn-gold' : 'btn-outline'}`}
                  style={{ fontSize: '0.82rem', padding: '0.5rem 1.2rem', textTransform: 'capitalize' }}>
                  {t}
                </button>
              ))}
            </div>

            {/* Feedback table */}
            {tab === 'feedback' && (
              feedback.length === 0
                ? <p style={{ color: 'var(--text-muted)' }}>No feedback yet.</p>
                : <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {feedback.map(fb => (
                      <div key={fb.id} className="card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.35rem' }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{fb.name}</span>
                            <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>{fb.category}</span>
                            <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>{'⭐'.repeat(fb.rating)}</span>
                          </div>
                          {fb.email && <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>{fb.email} {fb.phone && `· ${fb.phone}`}</p>}
                          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{fb.message}</p>
                          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{new Date(fb.created_at).toLocaleString()}</p>
                        </div>
                        <button className="btn btn-outline" onClick={() => deleteFb(fb.id)}
                          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', borderColor: 'rgba(192,57,43,0.4)', color: 'var(--crimson-light)' }}>
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
            )}

            {/* Members table */}
            {tab === 'members' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Name', 'Position', 'Domain', 'Dept', 'Year', ''].map(h => (
                        <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {members.map(m => (
                      <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--text-primary)', fontWeight: 500 }}>{m.name}</td>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>{m.position}</td>
                        <td style={{ padding: '0.85rem 1rem' }}><span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>{m.domain}</span></td>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>{m.department}</td>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{m.year}</td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <button className="btn btn-outline" onClick={() => deleteMember(m.id)}
                            style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem', borderColor: 'rgba(192,57,43,0.4)', color: 'var(--crimson-light)' }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Events list */}
            {tab === 'events' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {events.map(ev => (
                  <div key={ev.id} className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                      <span className={`badge ${ev.is_upcoming ? 'badge-green' : 'badge-crimson'}`} style={{ marginRight: '0.5rem', fontSize: '0.65rem' }}>
                        {ev.is_upcoming ? 'Upcoming' : 'Past'}
                      </span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{ev.title}</span>
                      <span style={{ marginLeft: '0.75rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{ev.date} · {ev.location}</span>
                    </div>
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
