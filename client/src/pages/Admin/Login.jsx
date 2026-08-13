import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm]   = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(form.username, form.password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(212,168,67,0.07), transparent)',
      padding: '2rem',
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '3rem 2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '0.25rem' }}>
            KalaVedika
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Admin Dashboard</p>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              placeholder="admin username"
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <div style={{ background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.3)', borderRadius: 'var(--radius-sm)', padding: '0.7rem 1rem', color: 'var(--crimson-light)', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-gold" disabled={loading} style={{ justifyContent: 'center', marginTop: '0.5rem', padding: '0.9rem' }}>
            {loading ? 'Logging in…' : 'Login →'}
          </button>
        </form>
      </div>
    </div>
  );
}
