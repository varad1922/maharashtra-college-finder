import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './HeroSection.css';

const stats = [
  { label: 'Colleges Listed', value: '30+', icon: '🏛️' },
  { label: 'Cities Covered', value: '15+', icon: '📍' },
  { label: 'Streams Available', value: '8+', icon: '📚' },
  { label: 'Students Helped', value: '10K+', icon: '🎓' },
];

const examCards = [
  { exam: 'MHT-CET', icon: '⚙️', color: '#63B3FF', desc: 'Engineering & Pharmacy' },
  { exam: 'NEET', icon: '🩺', color: '#FC8181', desc: 'Medical & Dental' },
  { exam: 'JEE Main', icon: '💻', color: '#9AE6B4', desc: 'Top Engineering IITs/NITs' },
  { exam: 'HSC %', icon: '📖', color: '#FBD38D', desc: 'Arts, Science & Commerce' },
];

export default function HeroSection() {
  const countRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero">
      {/* Background orbs */}
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />
      </div>

      <div className="container hero-content">
        <div className="hero-badge animate-on-scroll">
          <span className="badge-dot" />
          🌟 Maharashtra's #1 College Discovery Platform
        </div>

        <h1 className="hero-title animate-on-scroll">
          Find Your <span className="gradient-text">Dream College</span><br />
          in Maharashtra
        </h1>

        <p className="hero-subtitle animate-on-scroll">
          Enter your JEE, MHT-CET, or NEET scores and instantly discover the best colleges across 
          Maharashtra — with admission chances, fees, and personalized stream recommendations.
        </p>

        <div className="hero-actions animate-on-scroll">
          <Link to="/find" className="btn-primary hero-btn-main">
            🔍 Find My College
          </Link>
          <Link to="/about" className="btn-secondary">
            Learn More
          </Link>
        </div>

        {/* Exam cards */}
        <div className="exam-cards animate-on-scroll">
          {examCards.map((card) => (
            <div key={card.exam} className="exam-card" style={{ '--card-color': card.color }}>
              <span className="exam-icon">{card.icon}</span>
              <div>
                <div className="exam-name">{card.exam}</div>
                <div className="exam-desc">{card.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="hero-stats animate-on-scroll">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
