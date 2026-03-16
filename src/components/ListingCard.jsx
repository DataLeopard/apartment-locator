import { useState } from 'react';

const statusColors = {
  active: '#16a34a',
  'low-inventory': '#ea580c',
  waitlist: '#9333ea',
};

export default function ListingCard({ listing }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`listing-card ${listing.status}`}>
      <button className="listing-header" onClick={() => setExpanded(!expanded)}>
        <div className="listing-title-row">
          <h3>{listing.name}</h3>
          <span className="status-badge" style={{ background: statusColors[listing.status] }}>
            {listing.status === 'low-inventory' ? 'Low Stock' : listing.status}
          </span>
        </div>
        <div className="listing-meta">
          <span>{listing.beds.join('/')} BR</span>
          <span>${listing.rent.min.toLocaleString()} – ${listing.rent.max.toLocaleString()}/mo</span>
          <span>{listing.availableUnits} units</span>
          <span className="commission-tag">${listing.commission}% comm</span>
        </div>
        <div className="listing-address">{listing.address}</div>
        <span className={`expand-arrow ${expanded ? 'open' : ''}`}>&#9662;</span>
      </button>

      {expanded && (
        <div className="listing-details">
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Sq Ft</span>
              <span className="detail-value">{listing.sqft.min} – {listing.sqft.max}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Deposit</span>
              <span className="detail-value">${listing.deposit}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Pets</span>
              <span className="detail-value">{listing.petFriendly ? 'Yes' : 'No'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Visit</span>
              <span className="detail-value">{listing.lastVisit}</span>
            </div>
          </div>

          <div className="amenities">
            {listing.amenities.map(a => (
              <span key={a} className="amenity-tag">{a}</span>
            ))}
          </div>

          <div className="notes-section">
            <span className="notes-label">Agent Notes</span>
            <p>{listing.notes}</p>
          </div>

          <div className="contact-bar">
            <span>{listing.contactName}</span>
            <span>{listing.contactPhone}</span>
          </div>

          <div className="commission-calc">
            <span className="calc-label">Commission on $1,500/mo placement:</span>
            <span className="calc-value">${(1500 * listing.commission / 100).toFixed(0)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
