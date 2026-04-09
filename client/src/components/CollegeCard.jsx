import './CollegeCard.css';

const streamBadgeClass = {
  Engineering: 'badge-engineering', Medical: 'badge-medical',
  Science: 'badge-science', Commerce: 'badge-commerce',
  Arts: 'badge-arts', Pharmacy: 'badge-pharmacy',
  Management: 'badge-management', Law: 'badge-law',
};

const chanceClass = {
  'Excellent': 'chance-excellent', 'Good': 'chance-good',
  'Try Your Luck': 'chance-try', 'Difficult': 'chance-difficult',
};

const chanceIcon = {
  'Excellent': '🚀', 'Good': '✅', 'Try Your Luck': '🎯', 'Difficult': '⚠️',
};

const chanceWidth = { 'Excellent': '95%', 'Good': '72%', 'Try Your Luck': '45%', 'Difficult': '20%' };

export default function CollegeCard({ college, index }) {
  const {
    name, shortName, city, district, type, affiliation,
    website, streams, suggestedStreams, chance, relevantFees,
    cutoffScore, rating, ranking, established, totalSeats, description,
  } = college;

  const displayStreams = suggestedStreams?.length ? suggestedStreams : streams?.slice(0, 3);

  return (
    <div className="college-card fade-in-up" style={{ animationDelay: `${index * 0.08}s` }}>
      {/* Top row */}
      <div className="card-header">
        <div className="card-rank">#{index + 1}</div>
        <div className="card-type-badge">{type}</div>
        {chance && (
          <div className={`badge ${chanceClass[chance]} card-chance`}>
            {chanceIcon[chance]} {chance}
          </div>
        )}
      </div>

      {/* College info */}
      <div className="card-body">
        <div className="college-avatar">
          <span>{(shortName || name).charAt(0)}</span>
        </div>
        <div className="college-info">
          <h3 className="college-name">{name}</h3>
          {shortName && <span className="college-short">{shortName}</span>}
          <div className="college-meta">
            <span className="meta-item">📍 {city}, {district}</span>
            {established && <span className="meta-item">📅 Est. {established}</span>}
            {totalSeats && <span className="meta-item">🪑 {totalSeats} seats</span>}
          </div>
          {affiliation && <div className="college-affiliation">🏛️ {affiliation}</div>}
        </div>
      </div>

      {/* Description */}
      {description && <p className="college-desc">{description}</p>}

      {/* Chance meter */}
      {chance && (
        <div className="chance-meter">
          <div className="chance-meter-label">
            <span>Admission Chance</span>
            <span className={`badge ${chanceClass[chance]}`}>{chance}</span>
          </div>
          <div className="chance-bar-bg">
            <div
              className={`chance-bar-fill chance-fill-${chance.replace(' ', '-').toLowerCase()}`}
              style={{ width: chanceWidth[chance] }}
            />
          </div>
          {cutoffScore != null && (
            <div className="cutoff-info">
              Required cutoff: <strong>{cutoffScore}</strong>
            </div>
          )}
        </div>
      )}

      {/* Streams */}
      {displayStreams?.length > 0 && (
        <div className="card-streams">
          <span className="streams-label">Streams:</span>
          <div className="streams-list">
            {displayStreams.map(s => (
              <span key={s} className={`badge ${streamBadgeClass[s] || 'badge-science'}`}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="card-footer">
        <div className="fee-info">
          {relevantFees ? (
            <>
              <span className="fee-label">Annual Fees</span>
              <span className="fee-value">₹{relevantFees.toLocaleString('en-IN')}</span>
            </>
          ) : (
            <span className="fee-na">Fees: Contact College</span>
          )}
        </div>
        <div className="card-rating">
          {'⭐'.repeat(Math.round(rating || 4))}
          <span className="rating-num">{rating || '4.0'}</span>
        </div>
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer" className="btn-secondary card-link">
            Visit →
          </a>
        )}
      </div>
    </div>
  );
}
