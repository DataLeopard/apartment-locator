export default function Filters({ filters, onFilterChange }) {
  return (
    <div className="filters">
      <div className="filter-group">
        <label>Bedrooms</label>
        <select value={filters.beds} onChange={e => onFilterChange('beds', e.target.value)}>
          <option value="all">All</option>
          <option value="1">1 BR</option>
          <option value="2">2 BR</option>
          <option value="3">3 BR</option>
          <option value="4">4 BR</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Max Rent</label>
        <select value={filters.maxRent} onChange={e => onFilterChange('maxRent', e.target.value)}>
          <option value="all">Any</option>
          <option value="1200">Under $1,200</option>
          <option value="1500">Under $1,500</option>
          <option value="2000">Under $2,000</option>
          <option value="2500">Under $2,500</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Pets</label>
        <select value={filters.pets} onChange={e => onFilterChange('pets', e.target.value)}>
          <option value="all">Any</option>
          <option value="yes">Pet Friendly</option>
          <option value="no">No Pets</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Status</label>
        <select value={filters.status} onChange={e => onFilterChange('status', e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="low-inventory">Low Inventory</option>
          <option value="waitlist">Waitlist</option>
        </select>
      </div>
    </div>
  );
}
