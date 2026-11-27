
import { Check, ShieldCheck, Cpu } from 'lucide-react';
import './Settings.css';

export default function Settings() {
  return (
    <div className="settings">
      <div className="container">
        <div className="page-header">
          <h1 className="section-title">
            ⚙️ <span className="gradient-text">Settings</span>
          </h1>
          <p className="section-subtitle">
            Your AgriGuard AI experience
          </p>
        </div>

        <div className="settings-card glass-card-static">
          <div className="settings-section">
            <div className="settings-section-title">
              <ShieldCheck
                size={18}
                style={{
                  display: 'inline',
                  verticalAlign: 'middle',
                  marginRight: '0.5rem',
                  color: 'var(--color-accent-green)'
                }}
              />
              Secure AI Configuration
            </div>

            <div className="settings-section-desc">
              AgriGuard AI is configured to use Google Gemini
              through a secure backend. No personal API key
              is required.
            </div>

            <div style={{
              color: 'var(--color-accent-green)',
              marginTop: '1rem'
            }}>
              <Check size={18} />
              {' '}Automatic API Configuration
            </div>
          </div>

          <div className="settings-divider" />

          <div className="settings-section">
            <div className="settings-section-title">
              <Cpu
                size={18}
                style={{
                  display: 'inline',
                  verticalAlign: 'middle',
                  marginRight: '0.5rem',
                  color: 'var(--color-accent-blue)'
                }}
              />
              AI Model
            </div>

            <div className="settings-section-desc">
              Powered by Google Gemini AI.
            </div>

            <input
              className="input-field"
              value="Gemini 3.5 Flash Lite"
              readOnly
            />
          </div>

          <div className="settings-divider" />

          <div className="settings-info">
            <strong>About AgriGuard AI</strong>

            <br /><br />

            All AI features are designed to work automatically
            without requiring users to enter an API key.

            <br /><br />

            Available AI Features:

            <br />
            • AI Crop Disease Detection
            <br />
            • Smart Crop Recommendations
            <br />
            • AI Farming Assistant
            <br />
            • Sustainable Farming Guidance

            <br /><br />

            <em>
              AgriGuard AI empowers farmers through intelligent
              crop disease detection, personalized crop
              recommendations, and sustainable farming solutions.
              Together, we are building a smarter, greener,
              and more sustainable future for agriculture.
            </em>
          </div>
        </div>
      </div>
    </div>
  );
}
