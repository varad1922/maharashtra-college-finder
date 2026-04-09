import { useState } from 'react';
import MarksForm from '../components/MarksForm';
import ResultsSection from '../components/ResultsSection';
import './FindCollege.css';

export default function FindCollege() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [streamSuggestions, setStreamSuggestions] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async ({ examType, score, city }) => {
    setLoading(true);
    setError('');
    setResults(null);
    try {
      const res = await fetch('/api/colleges/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examType, score, city }),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data);
        setStreamSuggestions(data.streamSuggestions || []);
        setSubmittedData({ examType, score });
        // Scroll to results
        setTimeout(() => {
          document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setSubmittedData(null);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="find-page">
      {/* Page header */}
      <div className="find-hero">
        <div className="find-hero-bg">
          <div className="find-orb find-orb-1" />
          <div className="find-orb find-orb-2" />
        </div>
        <div className="container find-hero-inner">
          <div className="find-breadcrumb">Home / Find College</div>
          <h1 className="find-title">
            Find Your <span className="gradient-text">Perfect College</span>
          </h1>
          <p className="find-subtitle">
            Enter your exam scores below and get instant, personalized college recommendations across Maharashtra.
          </p>
        </div>
      </div>

      <div className="container find-content">
        {/* Form */}
        {!results && (
          <div className="form-container">
            <MarksForm onSubmit={handleSubmit} loading={loading} />
            {error && (
              <div className="page-error">
                <span>⚠️</span> {error}
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {results && (
          <div id="results">
            <ResultsSection
              results={results}
              streamSuggestions={streamSuggestions}
              examType={submittedData?.examType}
              score={submittedData?.score}
              onReset={handleReset}
            />
          </div>
        )}
      </div>
    </div>
  );
}
