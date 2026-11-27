import { Link } from 'react-router-dom';
import { sdgGoals } from '../data/sdgData';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-name gradient-text">🌾 AgriGuard AI</div>
            <p className="footer-brand-desc">
              AI-Powered Precision Agriculture & Food Security Platform. Empowering farmers
              worldwide with intelligent tools for a Sustainable Future.
            </p>
            <div className="footer-sdg-badges">
              {sdgGoals.map((sdg) => (
                <div
                  key={sdg.id}
                  className="footer-sdg-badge"
                  style={{ background: sdg.color + '22' }}
                  title={`SDG ${sdg.id}: ${sdg.name}`}
                >
                  {sdg.icon}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links">
              <li><Link to="/crop-doctor">Crop Doctor</Link></li>
              <li><Link to="/crop-advisor">Smart Advisor</Link></li>
              <li><Link to="/farm-chat">Farm Chat</Link></li>
              <li><Link to="/dashboard">Impact Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="https://sdgs.un.org/" target="_blank" rel="noreferrer">UN SDGs</a></li>
              <li><a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer">Google Gemini AI</a></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <span>© 2026 AgriGuard AI — Empowering Farmers Through Smart Technology</span>
          <div className="footer-powered">
            <span>Powered by</span>
            <a
            href="https://gemini.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            >
            Google Gemini AI
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
