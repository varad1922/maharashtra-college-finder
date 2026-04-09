import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import './Home.css';

const HOW_IT_WORKS = [
  { step: '01', icon: '📋', title: 'Select Your Exam', desc: 'Choose between MHT-CET, JEE, NEET, or HSC — the exam you appeared for after 12th.' },
  { step: '02', icon: '🔢', title: 'Enter Your Score', desc: 'Input your actual marks or percentile. We calculate your chances at each college instantly.' },
  { step: '03', icon: '📍', title: 'Choose Your City', desc: 'Filter by your preferred city in Maharashtra, or use geolocation to find nearby colleges.' },
  { step: '04', icon: '🎯', title: 'Get Suggestions', desc: 'Receive a ranked list of colleges with your admission chance, fees, and stream recommendations.' },
];

const FEATURES = [
  { icon: '🤖', title: 'Smart Matching', desc: 'AI-powered algorithm matches your score to real college cutoffs to predict admission chances accurately.' },
  { icon: '💰', title: 'Transparent Fees', desc: 'View last year\'s actual annual fees for every college — no hidden charges or surprises.' },
  { icon: '📡', title: 'Location Aware', desc: 'Use your GPS or select a city to filter colleges near you across all of Maharashtra.' },
  { icon: '🎓', title: 'Stream Advice', desc: 'Get personalized stream recommendations based on your score, interests, and career prospects.' },
  { icon: '🏛️', title: 'Verified Data', desc: 'College data sourced from official university websites for accuracy and reliability.' },
  { icon: '⚡', title: 'Instant Results', desc: 'No waiting — get your college list in seconds with real-time filtering and sorting.' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', city: 'Pune', score: 'CET 168', text: 'Found my dream college in 30 seconds! The chance meter helped me understand exactly where to apply.', college: 'COEP Pune' },
  { name: 'Rahul Patil', city: 'Mumbai', score: 'NEET 612', text: 'Was confused about which medical college to apply to. This tool showed me 6 colleges where I had a real chance!', college: 'GMC Nagpur' },
  { name: 'Sneha Desai', city: 'Nagpur', score: 'HSC 82%', text: 'The stream suggestions were super helpful. I had no idea about BCA until this site recommended it to me.', college: 'Fergusson College' },
];

export default function Home() {
  return (
    <div className="home-page">
      <HeroSection />

      {/* How It Works */}
      <section className="section hiw-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">How It Works</div>
            <h2 className="section-title">Get your college list in <span className="gradient-text">4 simple steps</span></h2>
            <p className="section-subtitle">No registration needed. No spam. Just your scores and the best colleges matched to you.</p>
          </div>
          <div className="hiw-grid">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className="hiw-card">
                <div className="hiw-step">{item.step}</div>
                <div className="hiw-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && <div className="hiw-arrow">→</div>}
              </div>
            ))}
          </div>
          <div className="hiw-cta">
            <Link to="/find" className="btn-primary">Start Finding Colleges →</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Why Choose Us</div>
            <h2 className="section-title">Everything you need to <span className="gradient-text">make the right choice</span></h2>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Success Stories</div>
            <h2 className="section-title">Students who found their <span className="gradient-text">perfect college</span></h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="t-quote">"</div>
                <p className="t-text">{t.text}</p>
                <div className="t-footer">
                  <div className="t-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <div className="t-name">{t.name}</div>
                    <div className="t-info">{t.score} • {t.city} → {t.college}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-orb" />
            <h2>Ready to find <span className="gradient-text">your college?</span></h2>
            <p>Join thousands of Maharashtra students who used our platform to make the right choice.</p>
            <Link to="/find" className="btn-primary cta-btn">🔍 Find My College Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
