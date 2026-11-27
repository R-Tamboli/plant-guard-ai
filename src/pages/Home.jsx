import { Link } from 'react-router-dom';
import { Stethoscope, Wheat, MessageSquare, BarChart3, ArrowRight, Sparkles } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import { sdgGoals, impactStats } from '../data/sdgData';
import './Home.css';

const features = [
  {
    icon: '🩺',
    title: 'AI Crop Doctor',
    desc: 'Upload a photo of your plant and our AI identifies diseases instantly, providing treatment plans and prevention tips.',
    to: '/crop-doctor',
  },
  {
    icon: '🌱',
    title: 'Smart Crop Advisor',
    desc: 'Get AI-powered crop recommendations based on your region, soil type, season, and budget for maximum yield.',
    to: '/crop-advisor',
  },
  {
    icon: '💬',
    title: 'AI Farm Assistant',
    desc: 'Chat with our intelligent farming assistant for expert advice on pest control, irrigation, and sustainable practices.',
    to: '/farm-chat',
  },
];

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 3,
  size: 2 + Math.random() * 4,
}));

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="home-hero">
        <div className="hero-bg" />
        <div className="hero-particles">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                '--duration': `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Smart Farming — Powered by Google Gemini AI
          </div>
          <h1 className="hero-title">
            AI-Powered Agriculture for a{' '}
            <span className="gradient-text">Sustainable Future</span>
          </h1>
          <p className="hero-subtitle">
            Empowering millions of smallholder farmers worldwide with AI-driven crop disease
            detection, smart recommendations, and expert farming guidance — one harvest at a time.
          </p>
          <div className="hero-actions">
            <Link to="/crop-doctor" className="btn btn-primary btn-lg">
              <Stethoscope size={20} />
              Diagnose Your Crop
            </Link>
            <Link to="/farm-chat" className="btn btn-secondary btn-lg">
              <MessageSquare size={20} />
              Chat with AI
            </Link>
          </div>
          <div className="hero-stats">
            {impactStats.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="hero-badge" style={{ marginBottom: 'var(--space-4)' }}>
            <Sparkles size={14} />
            Powered by Advanced AI
          </div>
          <h2 className="section-title">
            Intelligent Tools for{' '}
            <span className="gradient-text">Every Farmer</span>
          </h2>
          <p className="section-subtitle">
            From disease detection to market insights, AgriGuard AI gives you the power of
            precision agriculture right at your fingertips.
          </p>
          <div className="features-grid">
            {features.map((f, i) => (
              <Link to={f.to} key={f.title} className={`feature-card glass-card delay-${i + 1} animate-fade-in-up`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: 'var(--color-accent-green)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  Try now <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Section */}
      <section className="sdg-section">
        <div className="container">
          <h2 className="section-title">
            Addressing the{' '}
            <span className="gradient-text">UN Sustainable Development Goals</span>
          </h2>
          <p className="section-subtitle">
            AgriGuard AI directly contributes to 4 critical SDGs, creating measurable impact
            for people and the planet.
          </p>
          <div className="sdg-grid">
            {sdgGoals.map((sdg) => (
              <div key={sdg.id} className="sdg-card glass-card">
                <div className="sdg-card-header">
                  <div className="sdg-card-icon" style={{ background: sdg.color + '22' }}>
                    {sdg.icon}
                  </div>
                  <div>
                    <div className="sdg-card-number" style={{ color: sdg.color }}>
                      SDG {sdg.id} — Target {sdg.target}
                    </div>
                    <div className="sdg-card-title">{sdg.name}</div>
                  </div>
                </div>
                <p className="sdg-card-desc">{sdg.impact}</p>
                <div className="sdg-card-stat">
                  <span className="sdg-card-stat-value" style={{ color: sdg.color }}>
                    {sdg.stats.value}
                  </span>
                  <span className="sdg-card-stat-label">{sdg.stats.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box">
          <h2 className="cta-title">
            Ready to{' '}
            <span className="gradient-text">Transform Your Farm?</span>
          </h2>
          <p className="cta-desc">
            Start using AI-powered tools to increase yields, detect diseases early, and build a
            more sustainable farming future.
          </p>
          <div className="cta-actions">
            <Link to="/crop-doctor" className="btn btn-primary btn-lg">
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <Link to="/dashboard" className="btn btn-secondary btn-lg">
              <BarChart3 size={18} />
              View Impact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
