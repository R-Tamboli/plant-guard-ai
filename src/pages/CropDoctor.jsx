import { useState, useRef } from 'react';
import { Upload, Camera, Trash2, Zap, Bug, Shield, Leaf, AlertTriangle } from 'lucide-react';
import { analyzePlantDisease } from '../services/ai';
import './CropDoctor.css';

function getSeverityBadge(severity) {
  const s = (severity || '').toLowerCase();
  if (s === 'critical') return 'badge badge-red';
  if (s === 'high') return 'badge badge-amber';
  if (s === 'medium') return 'badge badge-blue';
  return 'badge badge-green';
}

export default function CropDoctor() {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImage(URL.createObjectURL(file));
    setResult(null);
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => setImageBase64(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleAnalyze = async () => {
    
    setLoading(true);
    setError('');
    try {
      const res = await analyzePlantDisease(imageBase64, description);
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setImage(null);
    setImageBase64('');
    setDescription('');
    setResult(null);
    setError('');
  };

  return (
    <div className="crop-doctor">
      <div className="container">
        <div className="page-header">
          <h1 className="section-title">
            🩺 AI <span className="gradient-text">Crop Doctor</span>
          </h1>
          <p className="section-subtitle">
            Upload a photo of your plant and let our AI diagnose diseases, suggest treatments,
            and help you protect your harvest.
          </p>
        </div>

        {!image ? (
          <div className="cd-upload-area">
            <div
              className={`cd-dropzone${dragging ? ' dragging' : ''}`}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <div className="cd-dropzone-icon">
                <Upload size={32} />
              </div>
              <div className="cd-dropzone-title">Drop your plant image here</div>
              <div className="cd-dropzone-sub">or click to browse • JPG, PNG up to 10MB</div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="cd-preview">
              <img src={image} alt="Uploaded plant" />
              <div className="cd-preview-overlay">
                <span style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.8)' }}>
                  <Camera size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Plant image uploaded
                </span>
                <button className="btn btn-secondary" onClick={handleClear} style={{ padding: '0.4rem 1rem', fontSize: 'var(--text-xs)' }}>
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>

            <div className="cd-desc-input">
              <textarea
                className="input-field"
                placeholder="(Optional) Describe what you see — e.g., 'Yellow spots on tomato leaves, curling edges'..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                style={{ resize: 'vertical' }}
              />
            </div>

            {!result && !loading && (
              <div className="cd-analyze-btn">
                <button className="btn btn-primary btn-lg" onClick={handleAnalyze}>
                  <Zap size={20} />
                  Analyze with AI
                </button>
              </div>
            )}
          </>
        )}

        {loading && (
          <div className="cd-loading">
            <div className="spinner" style={{ width: 40, height: 40 }} />
            <div className="cd-loading-text">
              AI is analyzing your plant image...<br />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>This may take a few seconds</span>
            </div>
          </div>
        )}

        {error && <div className="cd-error"><AlertTriangle size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {error}</div>}

        {result && (
          <div className="cd-results animate-fade-in-up">
            <div className="cd-result-header glass-card-static">
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                  Diagnosis Result
                </div>
                <div className="cd-disease-name gradient-text">{result.disease_name}</div>
              </div>
              <div className="cd-badges">
                <span className={getSeverityBadge(result.severity)}>
                  {result.severity} Severity
                </span>
                <span className="badge badge-blue">
                  {result.confidence} Confidence
                </span>
              </div>
            </div>

            <div className="cd-detail-grid">
              {result.symptoms?.length > 0 && (
                <div className="cd-detail-card glass-card-static">
                  <div className="cd-detail-title"><Bug size={18} style={{ color: 'var(--color-accent-amber)' }} /> Symptoms</div>
                  <ul className="cd-detail-list">
                    {result.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}

              {result.causes?.length > 0 && (
                <div className="cd-detail-card glass-card-static">
                  <div className="cd-detail-title"><AlertTriangle size={18} style={{ color: 'var(--color-accent-red)' }} /> Causes</div>
                  <ul className="cd-detail-list">
                    {result.causes.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              )}

              {result.treatment?.immediate?.length > 0 && (
                <div className="cd-detail-card glass-card-static">
                  <div className="cd-detail-title"><Zap size={18} style={{ color: 'var(--color-accent-green)' }} /> Immediate Actions</div>
                  <ul className="cd-detail-list">
                    {result.treatment.immediate.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              )}

              {result.treatment?.organic?.length > 0 && (
                <div className="cd-detail-card glass-card-static">
                  <div className="cd-detail-title"><Leaf size={18} style={{ color: 'var(--color-accent-emerald)' }} /> Organic Treatments</div>
                  <ul className="cd-detail-list">
                    {result.treatment.organic.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              )}

              {result.treatment?.chemical?.length > 0 && (
                <div className="cd-detail-card glass-card-static">
                  <div className="cd-detail-title"><Shield size={18} style={{ color: 'var(--color-accent-blue)' }} /> Chemical Treatments</div>
                  <ul className="cd-detail-list">
                    {result.treatment.chemical.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              )}

              {result.prevention?.length > 0 && (
                <div className="cd-detail-card glass-card-static">
                  <div className="cd-detail-title"><Shield size={18} style={{ color: 'var(--color-accent-teal)' }} /> Prevention Tips</div>
                  <ul className="cd-detail-list">
                    {result.prevention.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              )}
            </div>

            {result.additional_notes && (
              <div className="glass-card-static" style={{ padding: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
                <div className="cd-detail-title" style={{ marginBottom: 'var(--space-3)' }}>📝 Additional Notes</div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                  {result.additional_notes}
                </p>
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
              <button className="btn btn-secondary" onClick={handleClear}>
                Analyze Another Plant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
