import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LINKS = [
  { to: '/',             label: 'Home'         },
  { to: '/events',       label: 'Events'       },
  { to: '/members',      label: 'Members'      },
  { to: '/activities',   label: 'Activities'   },
  { to: '/achievements', label: 'Achievements' },
  { to: '/founders',     label: 'Founders'     },
  { to: '/feedback',     label: 'Contact'      },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { pathname } = useLocation();
  const { admin, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <span className="navbar-logo-main">KalaVedika</span>
            <span className="navbar-logo-sub">Cultural Arts Club</span>
          </Link>

          <div className={`navbar-links${open ? ' open' : ''}`}>
            {LINKS.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`navbar-link${pathname === l.to ? ' active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
            {admin ? (
              <>
                <Link to="/admin" className="navbar-link" style={{ color: 'var(--gold)' }}>Dashboard</Link>
                <button className="navbar-admin" onClick={logout}>Logout</button>
              </>
            ) : (
              <Link to="/admin/login" className="navbar-admin">Admin</Link>
            )}
          </div>

          <button
            className="navbar-toggle"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span style={{ transform: open ? 'rotate(45deg) translate(5px,5px)' : '' }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? 'rotate(-45deg) translate(5px,-5px)' : '' }} />
          </button>
        </div>
      </div>
    </nav>
  );
}
