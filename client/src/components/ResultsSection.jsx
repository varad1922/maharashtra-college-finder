import CollegeCard from './CollegeCard';
import './ResultsSection.css';

const CHANCE_COLORS = {
  'Excellent': '#00C9A7', 'Good': '#48C78E', 'Try Your Luck': '#FFB900', 'Difficult': '#FC8181',
};

export default function ResultsSection({ results, streamSuggestions, examType, score, onReset }) {
  if (!results) return null;

  const { data: colleges, count } = results;
  const excellentCount = colleges.filter(c => c.chance === 'Excellent').length;
  const goodCount = colleges.filter(c => c.chance === 'Good').length;
  const tryCount = colleges.filter(c => c.chance === 'Try Your Luck').length;

  return (
    <div className="results-section">
      {/* Result summary banner */}
      <div className="results-banner">
        <div className="banner-left">
          <h2 className="results-title">
            🎯 Found <span className="gradient-text">{count} colleges</span> for you!
          </h2>
          <p className="results-sub">
            Based on your {examType === 'CET' ? 'MHT-CET' : examType} score of{' '}
            <strong style={{ color: 'var(--primary)' }}>{score}{examType === 'JEE' ? '%ile' : examType === 'HSC' ? '%' : ''}</strong>
          </p>
        </div>
        <div className="banner-stats">
          <div className="b-stat" style={{ '--c': '#00C9A7' }}>
            <span className="b-num">{excellentCount}</span>
            <span className="b-lbl">Excellent Chance</span>
          </div>
          <div className="b-stat" style={{ '--c': '#48C78E' }}>
            <span className="b-num">{goodCount}</span>
            <span className="b-lbl">Good Chance</span>
          </div>
          <div className="b-stat" style={{ '--c': '#FFB900' }}>
            <span className="b-num">{tryCount}</span>
            <span className="b-lbl">Try Your Luck</span>
          </div>
        </div>
        <button className="btn-secondary reset-btn" onClick={onReset}>🔄 Search Again</button>
      </div>

      {/* Stream suggestions */}
      {streamSuggestions?.length > 0 && (
        <div className="stream-suggestions">
          <h3 className="suggestions-title">💡 Recommended Streams for You</h3>
          <div className="suggestions-grid">
            {streamSuggestions.map((s, i) => (
              <div key={i} className="suggestion-card">
                <span className="suggestion-icon">{s.icon}</span>
                <div>
                  <div className="suggestion-stream">{s.stream}</div>
                  <div className="suggestion-reason">{s.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* College cards */}
      {colleges.length > 0 ? (
        <div className="colleges-grid">
          {colleges.map((college, i) => (
            <CollegeCard key={college._id} college={college} index={i} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No colleges found</h3>
          <p>Try adjusting your filters or searching in a different city.</p>
          <button className="btn-primary" onClick={onReset}>Search Again</button>
        </div>
      )}
    </div>
  );
}
