import { listings } from '../data/listings';

const statusIcon = {
  searching: '🔍',
  touring: '🏠',
  applied: '📝',
  placed: '✅',
};

export default function LeadTracker({ leads }) {
  return (
    <div className="lead-tracker">
      <h2>Active Leads</h2>
      <div className="leads-list">
        {leads.map(lead => (
          <div key={lead.id} className="lead-card">
            <div className="lead-header">
              <span className="lead-status-icon">{statusIcon[lead.status]}</span>
              <strong>{lead.name}</strong>
              <span className="lead-status">{lead.status}</span>
            </div>
            <div className="lead-details">
              <span>Budget: ${lead.budget.toLocaleString()}/mo</span>
              <span>{lead.beds} BR</span>
              <span>{lead.pets ? 'Has pets' : 'No pets'}</span>
              <span>Move-in: {lead.moveIn}</span>
            </div>
            <div className="lead-matches">
              <span className="match-label">Matched:</span>
              {lead.matchedListings.map(id => {
                const l = listings.find(x => x.id === id);
                return l ? <span key={id} className="match-tag">{l.name}</span> : null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
