import { useState } from 'react';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { analyzePlantDisease } from '../services/ai';
import { regions, soilTypes, seasons, waterAvailability } from '../data/sdgData';
import './CropAdvisor.css';

export default function CropAdvisor() {
  const [form, setForm] = useState({
    region: '',
    soilType: '',
    season: '',
    water: '',
    budget: 'Medium',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.region || !form.soilType || !form.season || !form.water) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await getCropRecommendations(form);
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crop-advisor">
      <div className="container">
        <div className="page-header">
          <h1 className="section-title">
            🌱 Smart <span className="gradient-text">Crop Advisor</span>
          </h1>
          <p className="section-subtitle">
            Tell us about your farming conditions, and our AI will recommend the best crops
            for maximum yield and profitability.
          </p>
        </div>

        {!result && !loading && (
          <form className="ca-form-card glass-card-static" onSubmit={handleSubmit}>
            <div className="ca-form-grid">
              <div className="form-group">
                <label className="form-label">Region</label>
                <select className="select-field" value={form.region} onChange={(e) => handleChange('region', e.target.value)}>
                  <option value="">Select region...</option>
                  {regions.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Soil Type</label>
                <select className="select-field" value={form.soilType} onChange={(e) => handleChange('soilType', e.target.value)}>
                  <option value="">Select soil...</option>
                  {soilTypes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Season</label>
                <select className="select-field" value={form.season} onChange={(e) => handleChange('season', e.target.value)}>
                  <option value="">Select season...</option>
                  {seasons.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Water Availability</label>
                <select className="select-field" value={form.water} onChange={(e) => handleChange('water', e.target.value)}>
                  <option value="">Select water...</option>
                  {waterAvailability.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 'var(--space-8)' }}>
              <label className="form-label">Budget Level</label>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                {['Low', 'Medium', 'High'].map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={`btn ${form.budget === b ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleChange('budget', b)}
                    style={{ flex: 1 }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="ca-error" style={{ marginBottom: 'var(--space-6)' }}><AlertTriangle size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {error}</div>}

            <div className="ca-form-actions">
              <button type="submit" className="btn btn-primary btn-lg">
                <Sparkles size={20} />
                Get AI Recommendations
              </button>
            </div>
          </form>
        )}

        {loading && (
          <div className="ca-loading">
            <div className="spinner" style={{ width: 40, height: 40 }} />
            <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
              AI is analyzing your conditions and finding the best crops...
            </div>
          </div>
        )}

        {result && (
          <div className="ca-results animate-fade-in-up">
            <div className="ca-results-header">
              <div className="badge badge-green" style={{ marginBottom: 'var(--space-4)' }}>
                <Sparkles size={12} /> AI Recommendations Ready
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-2xl)' }}>
                Top Crop Picks for Your Farm
              </h2>
            </div>

            <div className="ca-results-grid">
              {result.recommendations?.map((crop, i) => (
                <div key={i} className="ca-crop-card glass-card">
                  <div className="ca-crop-rank">{i + 1}</div>
                  <div className="ca-crop-emoji">{crop.emoji || '🌿'}</div>
                  <div className="ca-crop-name">{crop.crop_name}</div>
                  <div className="ca-score-bar">
                    <div className="ca-score-fill" style={{ width: `${crop.suitability_score || 80}%` }} />
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-green)', marginBottom: 'var(--space-3)', fontWeight: 600 }}>
                    {crop.suitability_score || 80}% Match
                  </div>

                  <div className="ca-crop-details">
                    <div className="ca-crop-detail">
                      <span className="ca-crop-detail-label">Expected Yield</span>
                      <span className="ca-crop-detail-value">{crop.expected_yield}</span>
                    </div>
                    <div className="ca-crop-detail">
                      <span className="ca-crop-detail-label">Investment</span>
                      <span className="ca-crop-detail-value">{crop.investment_level}</span>
                    </div>
                    <div className="ca-crop-detail">
                      <span className="ca-crop-detail-label">Water Needs</span>
                      <span className="ca-crop-detail-value">{crop.water_needs}</span>
                    </div>
                    <div className="ca-crop-detail">
                      <span className="ca-crop-detail-label">Duration</span>
                      <span className="ca-crop-detail-value">{crop.growth_duration}</span>
                    </div>
                    <div className="ca-crop-detail">
                      <span className="ca-crop-detail-label">Climate Resilience</span>
                      <span className="ca-crop-detail-value">{crop.climate_resilience}</span>
                    </div>
                  </div>

                  {crop.tips?.length > 0 && (
                    <div className="ca-crop-tips">
                      <div className="ca-crop-tips-title">Pro Tips</div>
                      <ul className="ca-crop-tips-list">
                        {crop.tips.map((t, j) => <li key={j}>{t}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {result.general_advice && (
              <div className="ca-advice glass-card-static">
                <div className="ca-advice-title">💡 General Advice</div>
                <p className="ca-advice-text">{result.general_advice}</p>
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
              <button className="btn btn-secondary" onClick={() => setResult(null)}>
                Get New Recommendations
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
