import { Link } from 'react-router-dom';
import './About.css';

const TEAM_STATS = [
  { icon: '🏛️', value: '30+', label: 'Colleges Listed' },
  { icon: '📍', value: '15+', label: 'Cities Covered' },
  { icon: '🎓', value: '8', label: 'Streams Available' },
  { icon: '⚡', value: '4', label: 'Exams Covered' },
];

const EXAM_INFO = [
  {
    exam: 'MHT-CET', icon: '⚙️', color: '#63B3FF', max: '200',
    streams: 'Engineering, Pharmacy',
    desc: 'Maharashtra Common Entrance Test conducted by State CET Cell. Score out of 200.',
  },
  {
    exam: 'NEET', icon: '🩺', color: '#FC8181', max: '720',
    streams: 'MBBS, BDS, BAMS, B.Pharm',
    desc: 'National Eligibility cum Entrance Test for medical admissions. Score out of 720.',
  },
  {
    exam: 'JEE Main', icon: '💻', color: '#9AE6B4', max: '100%ile',
    streams: 'Engineering (IITs, NITs)',
    desc: 'Joint Entrance Examination for centrally funded technical institutions. Percentile based.',
  },
  {
    exam: 'HSC Board', icon: '📖', color: '#FBD38D', max: '100%',
    streams: 'Arts, Science, Commerce, Law',
    desc: 'Maharashtra Higher Secondary Certificate result percentage for general stream colleges.',
  },
];

const CITIES = [
  'Mumbai', 'Pune', 'Nagpur', 'Aurangabad', 'Nashik',
  'Kolhapur', 'Solapur', 'Amravati', 'Sangli', 'Islampur',
  'Lonere', 'Thane', 'Nanded', 'Akola', 'Latur',
];

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero-bg">
          <div className="about-orb about-orb-1" />
          <div className="about-orb about-orb-2" />
        </div>
        <div className="container about-hero-inner">
          <div className="about-badge">About Us</div>
          <h1 className="about-title">
            Helping Maharashtra students make<br />
            <span className="gradient-text">informed college decisions</span>
          </h1>
          <p className="about-subtitle">
            Maharashtra Student College Finder was built to eliminate the confusion 12th-grade students 
            face when choosing a college. We combine real cutoff data with smart algorithms to give you 
            honest, accurate suggestions — for free.
          </p>
          <div className="about-stats">
            {TEAM_STATS.map((s, i) => (
              <div key={i} className="about-stat">
                <span className="about-stat-icon">{s.icon}</span>
                <span className="about-stat-val">{s.value}</span>
                <span className="about-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container about-content">
        {/* Mission */}
        <section className="about-section mission-section">
          <div className="about-section-label">Our Mission</div>
          <h2 className="about-section-title">Every student deserves the right college</h2>
          <div className="mission-grid">
            <div className="mission-text">
              <p>
                Every year, lakhs of students in Maharashtra appear for JEE, MHT-CET, NEET and HSC board exams. 
                Yet, many students end up in wrong colleges simply because they don't have access to accurate, 
                up-to-date admission information.
              </p>
              <p>
                Maharashtra Student College Finder bridges this gap. By combining real cutoff data with a 
                smart matching algorithm, we help students find colleges where they have a genuine chance of 
                admission — saving time, money, and emotional stress.
              </p>
              <p>
                Our platform covers government, private, autonomous, and deemed colleges across the state, 
                from IIT Bombay to local government colleges — ensuring every student finds their best fit.
              </p>
              <Link to="/find" className="btn-primary" style={{ marginTop: '8px', alignSelf: 'flex-start', display: 'inline-flex' }}>
                Start Finding Colleges →
              </Link>
            </div>
            <div className="mission-cards">
              {[
                { icon: '🎯', title: 'Accurate Cutoffs', desc: 'Based on previous year admission data from universities' },
                { icon: '💡', title: 'Smart Algorithm', desc: 'Calculates your exact admission chance at each college' },
                { icon: '🆓', title: 'Completely Free', desc: 'No registration, no fees, no hidden charges ever' },
                { icon: '📱', title: 'Mobile Friendly', desc: 'Works perfectly on all devices and screen sizes' },
              ].map((c, i) => (
                <div key={i} className="mission-card">
                  <span className="mc-icon">{c.icon}</span>
                  <div>
                    <div className="mc-title">{c.title}</div>
                    <div className="mc-desc">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exams */}
        <section className="about-section">
          <div className="about-section-label">Supported Exams</div>
          <h2 className="about-section-title">Which exams do we support?</h2>
          <div className="exams-grid">
            {EXAM_INFO.map((e) => (
              <div key={e.exam} className="exam-info-card" style={{ '--ec': e.color }}>
                <div className="ei-header">
                  <span className="ei-icon">{e.icon}</span>
                  <div>
                    <div className="ei-name">{e.exam}</div>
                    <div className="ei-max">Max: {e.max}</div>
                  </div>
                </div>
                <p className="ei-desc">{e.desc}</p>
                <div className="ei-streams">
                  <span className="ei-streams-label">Streams:</span>
                  <span className="ei-streams-val">{e.streams}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cities */}
        <section className="about-section">
          <div className="about-section-label">Coverage</div>
          <h2 className="about-section-title">Cities we cover across Maharashtra</h2>
          <div className="cities-cloud">
            {CITIES.map((city, i) => (
              <span key={i} className="city-chip">📍 {city}</span>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="about-section disclaimer-section">
          <div className="disclaimer-box">
            <div className="disclaimer-icon">⚠️</div>
            <div>
              <h3>Important Disclaimer</h3>
              <p>
                Cutoff data and fees shown on this platform are based on previous year admissions and may vary each year. 
                Always verify the latest cutoffs and fees from official university/college websites before making any 
                admission decisions. Maharashtra Student College Finder is a guidance tool and not an official admission platform.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
