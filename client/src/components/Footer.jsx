import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">🎓</div>
            <div>
              <div className="footer-logo-main">Maharashtra</div>
              <div className="footer-logo-sub">Student College Finder</div>
            </div>
          </div>
          <p className="footer-tagline">
            Helping 12th-grade students across Maharashtra find their perfect college and stream — powered by real cutoff data.
          </p>
          <div className="footer-badges">
            <span className="f-badge">🏛️ 30+ Colleges</span>
            <span className="f-badge">📍 15+ Cities</span>
            <span className="f-badge">🎯 4 Exams</span>
          </div>
        </div>

        <div className="footer-links-group">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">🏠 Home</Link></li>
            <li><Link to="/find">🔍 Find College</Link></li>
            <li><Link to="/about">ℹ️ About</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Exams Covered</h4>
          <ul>
            <li><span>⚙️ MHT-CET</span></li>
            <li><span>🩺 NEET</span></li>
            <li><span>💻 JEE Main</span></li>
            <li><span>📖 HSC Board</span></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Top Cities</h4>
          <ul>
            <li><span>📍 Mumbai</span></li>
            <li><span>📍 Pune</span></li>
            <li><span>📍 Nagpur</span></li>
            <li><span>📍 Aurangabad</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {year} Maharashtra Student College Finder. Made with ❤️ for Maharashtra students.</p>
          <p className="footer-disclaimer">Data is indicative. Always verify from official college websites.</p>
        </div>
      </div>
    </footer>
  );
}
