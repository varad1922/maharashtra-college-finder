import { useState, useEffect } from 'react';
import './MarksForm.css';

const EXAM_CONFIGS = {
  CET:  { label: 'MHT-CET Score', max: 200, min: 0,   placeholder: 'e.g. 145',   unit: '/ 200', icon: '⚙️', color: '#63B3FF', desc: 'Engineering & Pharmacy' },
  NEET: { label: 'NEET Score',    max: 720, min: 0,   placeholder: 'e.g. 620',   unit: '/ 720', icon: '🩺', color: '#FC8181', desc: 'Medical & Dental' },
  JEE:  { label: 'JEE Percentile', max: 100, min: 0,  placeholder: 'e.g. 85',    unit: '%ile',  icon: '💻', color: '#9AE6B4', desc: 'Engineering (IITs/NITs)' },
  HSC:  { label: 'HSC Percentage', max: 100, min: 0,  placeholder: 'e.g. 80',    unit: '%',     icon: '📖', color: '#FBD38D', desc: 'Arts, Science & Commerce' },
};

const MAHARASHTRA_CITIES = [
  'All Cities', 'Mumbai', 'Pune', 'Nagpur', 'Aurangabad', 'Nashik',
  'Kolhapur', 'Solapur', 'Amravati', 'Sangli', 'Islampur', 'Lonere',
  'Thane', 'Nanded', 'Akola', 'Latur', 'Jalgaon',
];

export default function MarksForm({ onSubmit, loading }) {
  const [step, setStep] = useState(1);
  const [examType, setExamType] = useState('');
  const [score, setScore] = useState('');
  const [city, setCity] = useState('All Cities');
  const [useLocation, setUseLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [error, setError] = useState('');

  const config = EXAM_CONFIGS[examType];

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation not supported by your browser.');
      return;
    }
    setLocationStatus('Detecting your location...');
    setUseLocation(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationStatus('📍 Location detected! Searching nearby colleges...');
        setCity('All Cities');
      },
      () => {
        setLocationStatus('Could not detect location. Please select a city manually.');
        setUseLocation(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const numScore = parseFloat(score);
    if (!examType) { setError('Please select your exam type.'); return; }
    if (!score || isNaN(numScore)) { setError('Please enter a valid score.'); return; }
    if (numScore < 0 || numScore > config.max) { setError(`Score must be between 0 and ${config.max}.`); return; }
    onSubmit({ examType, score: numScore, city: city === 'All Cities' ? '' : city });
  };

  const canProceedStep1 = !!examType;
  const canProceedStep2 = score && !isNaN(parseFloat(score)) && parseFloat(score) >= 0 && parseFloat(score) <= (config?.max || 100);

  return (
    <div className="marks-form-wrapper">
      {/* Step indicator */}
      <div className="steps-indicator">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`step-dot ${step >= s ? 'active' : ''} ${step === s ? 'current' : ''}`}>
            <div className="step-num">{step > s ? '✓' : s}</div>
            <span className="step-label">
              {s === 1 ? 'Exam Type' : s === 2 ? 'Your Score' : 'Location'}
            </span>
          </div>
        ))}
        <div className="steps-line"><div className="steps-progress" style={{ width: `${((step - 1) / 2) * 100}%` }} /></div>
      </div>

      <form className="marks-form" onSubmit={handleSubmit}>
        {/* Step 1: Exam Type */}
        {step === 1 && (
          <div className="form-step fade-in-up">
            <h2 className="step-title">Which exam did you appear for?</h2>
            <p className="step-subtitle">Select the entrance exam you gave after 12th standard</p>
            <div className="exam-grid">
              {Object.entries(EXAM_CONFIGS).map(([key, cfg]) => (
                <button
                  key={key}
                  type="button"
                  className={`exam-option ${examType === key ? 'selected' : ''}`}
                  style={{ '--exam-color': cfg.color }}
                  onClick={() => setExamType(key)}
                >
                  <span className="exam-opt-icon">{cfg.icon}</span>
                  <span className="exam-opt-name">{key === 'CET' ? 'MHT-CET' : key}</span>
                  <span className="exam-opt-desc">{cfg.desc}</span>
                  {examType === key && <span className="exam-check">✓</span>}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn-primary step-next"
              onClick={() => canProceedStep1 && setStep(2)}
              disabled={!canProceedStep1}
            >
              Next: Enter Score →
            </button>
          </div>
        )}

        {/* Step 2: Score */}
        {step === 2 && config && (
          <div className="form-step fade-in-up">
            <h2 className="step-title">What is your {examType === 'CET' ? 'MHT-CET' : examType} score?</h2>
            <p className="step-subtitle">Enter your marks honestly to get accurate college suggestions</p>
            <div className="score-input-wrapper" style={{ '--exam-color': config.color }}>
              <div className="score-icon">{config.icon}</div>
              <input
                type="number"
                className="score-input"
                placeholder={config.placeholder}
                value={score}
                min={config.min}
                max={config.max}
                step="0.01"
                onChange={(e) => setScore(e.target.value)}
                autoFocus
              />
              <span className="score-unit">{config.unit}</span>
            </div>
            {score && !isNaN(parseFloat(score)) && (
              <div className="score-preview">
                <div className="score-bar-bg">
                  <div
                    className="score-bar-fill"
                    style={{ width: `${Math.min((parseFloat(score) / config.max) * 100, 100)}%`, background: config.color }}
                  />
                </div>
                <span className="score-pct">{Math.round((parseFloat(score) / config.max) * 100)}% of max score</span>
              </div>
            )}
            <div className="step-nav">
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => canProceedStep2 && setStep(3)}
                disabled={!canProceedStep2}
              >Next: Location →</button>
            </div>
          </div>
        )}

        {/* Step 3: Location + Submit */}
        {step === 3 && (
          <div className="form-step fade-in-up">
            <h2 className="step-title">Where do you want to study?</h2>
            <p className="step-subtitle">Filter colleges by city, or search across all of Maharashtra</p>
            <div className="city-section">
              <div className="city-select-wrapper">
                <span className="city-icon">🏙️</span>
                <select
                  className="city-select"
                  value={city}
                  onChange={(e) => { setCity(e.target.value); setUseLocation(false); setLocationStatus(''); }}
                >
                  {MAHARASHTRA_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="divider-or"><span>or</span></div>
              <button type="button" className="location-btn" onClick={handleLocation}>
                <span>📡</span> Use My Current Location
              </button>
              {locationStatus && <p className="location-status">{locationStatus}</p>}
            </div>

            {/* Summary */}
            <div className="summary-card">
              <h3>📋 Your Summary</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="s-label">Exam</span>
                  <span className="s-value">{examType === 'CET' ? 'MHT-CET' : examType}</span>
                </div>
                <div className="summary-item">
                  <span className="s-label">Score</span>
                  <span className="s-value">{score} {config?.unit}</span>
                </div>
                <div className="summary-item">
                  <span className="s-label">City</span>
                  <span className="s-value">{city}</span>
                </div>
              </div>
            </div>

            {error && <div className="form-error">⚠️ {error}</div>}

            <div className="step-nav">
              <button type="button" className="btn-secondary" onClick={() => setStep(2)}>← Back</button>
              <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                {loading ? <span className="spinner" /> : '🔍'}{' '}
                {loading ? 'Searching...' : 'Find My Colleges!'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
