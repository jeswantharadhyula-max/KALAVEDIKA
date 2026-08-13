import { useState } from 'react';
import { api } from '../utils/api';

const CATEGORIES = ['General', 'Event', 'Performance', 'Membership', 'Suggestion', 'Other'];

export default function Feedback() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', category: 'General', rating: 5, message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) { setError('Name and message are required.'); return; }
    setLoading(true); setError('');
    try {
      await api.submitFeedback(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', category: 'General', rating: 5, message: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="section-label">Say Hello</div>
          <h1 className="section-title fade-up">Get In Touch</h1>
          <div className="divider" style={{ margin: '1rem auto 0' }} />
          <p className="section-desc fade-up-2" style={{ margin: '1rem auto 0' }}>
            Share your thoughts, enquiries, or join requests — we'd love to hear from you.
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '4rem', alignItems: 'start' }}>

            {/* Left — info */}
            <div>
              <div className="section-label">Contact Info</div>
              <h2 style={{ fontFamily: 'var(--ff-heading)', fontSize: '2rem', marginBottom: '1rem' }}>
                We're Always Open to<br /><em style={{ color: 'var(--gold)' }}>New Artists</em>
              </h2>
              <div className="divider" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { icon: '📍', title: 'Location', text: 'KALA VEDIKA Main Auditorium, Campus' },
                  { icon: '📧', title: 'Email',    text: 'kalavedika@club.edu' },
                  { icon: '📱', title: 'Phone',    text: '+91 98765 43210' },
                  { icon: '🕐', title: 'Hours',    text: 'Mon–Sat, 9 AM – 6 PM' },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: 'var(--radius-sm)',
                      background: 'var(--gold-dim)', border: '1px solid var(--border-gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.2rem', flexShrink: 0,
                    }}>{item.icon}</div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{item.title}</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="card" style={{ padding: '2.5rem' }}>
              {success ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                  <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                    Thank You!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Your message has been received. We'll get back to you soon.
                  </p>
                  <button className="btn btn-outline" onClick={() => setSuccess(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Name *</label>
                      <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input className="form-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Rating</label>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {[1,2,3,4,5].map(n => (
                        <button key={n} type="button"
                          onClick={() => set('rating', n)}
                          style={{
                            fontSize: '1.5rem', background: 'none', border: 'none',
                            cursor: 'pointer', opacity: n <= form.rating ? 1 : 0.25,
                            transition: 'opacity 0.15s',
                          }}>⭐</button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea className="form-textarea" rows={5} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Write your message here…" />
                  </div>
                  {error && (
                    <div style={{ background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.3)', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', color: 'var(--crimson-light)', fontSize: '0.875rem' }}>
                      {error}
                    </div>
                  )}
                  <button type="submit" className="btn btn-gold" disabled={loading} style={{ justifyContent: 'center', padding: '0.9rem', fontSize: '0.95rem' }}>
                    {loading ? 'Sending…' : 'Send Message ✉️'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
