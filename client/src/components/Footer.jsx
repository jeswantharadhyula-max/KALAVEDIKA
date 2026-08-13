import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">KalaVedika</div>
            <p className="footer-brand-desc">
              A premier cultural arts club celebrating the richness of classical dance,
              music, drama, and India's timeless performing arts heritage.
            </p>
          </div>

          <div>
            <div className="footer-col-title">Navigate</div>
            <ul className="footer-links">
              {[['/', 'Home'], ['/events', 'Events'], ['/members', 'Members'], ['/activities', 'Activities']].map(([to, label]) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">About</div>
            <ul className="footer-links">
              {[['/achievements', 'Achievements'], ['/founders', 'Our Founders'], ['/feedback', 'Contact Us']].map(([to, label]) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Connect</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Join us in preserving and celebrating the beauty of classical arts.
            </p>
            <Link to="/feedback" className="btn btn-outline" style={{ marginTop: '1rem', fontSize: '0.82rem', padding: '0.55rem 1.25rem' }}>
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} KalaVedika. All rights reserved.</p>
          <p className="footer-copy">Made with ❤️ for the love of art</p>
        </div>
      </div>
    </footer>
  );
}
