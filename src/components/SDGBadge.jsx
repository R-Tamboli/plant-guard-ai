import './SDGBadge.css';

export default function SDGBadge({ sdg, size = 'default' }) {
  return (
    <div
      className="sdg-badge"
      style={{ background: sdg.color + '15' }}
    >
      <div className="sdg-badge-icon" style={{ background: sdg.color + '25' }}>
        {sdg.icon}
      </div>
      <div className="sdg-badge-info">
        <span className="sdg-badge-number" style={{ color: sdg.color }}>
          SDG {sdg.id}
        </span>
        <span className="sdg-badge-name">{sdg.name}</span>
      </div>
    </div>
  );
}
