import { useState, useMemo } from 'react';
import { listings, leads } from './data/listings';
import ListingCard from './components/ListingCard';
import LeadTracker from './components/LeadTracker';
import Filters from './components/Filters';

export default function App() {
  const [view, setView] = useState('listings');
  const [filters, setFilters] = useState({ beds: 'all', maxRent: 'all', pets: 'all', status: 'all' });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filtered = useMemo(() => {
    return listings.filter(l => {
      if (filters.beds !== 'all' && !l.beds.includes(Number(filters.beds))) return false;
      if (filters.maxRent !== 'all' && l.rent.min > Number(filters.maxRent)) return false;
      if (filters.pets === 'yes' && !l.petFriendly) return false;
      if (filters.pets === 'no' && l.petFriendly) return false;
      if (filters.status !== 'all' && l.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  const totalUnits = listings.reduce((a, l) => a + l.availableUnits, 0);
  const activeListings = listings.filter(l => l.status === 'active').length;
  const activeLeads = leads.filter(l => l.status !== 'placed').length;
  const avgCommission = (listings.reduce((a, l) => a + l.commission, 0) / listings.length).toFixed(0);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-top">
          <div>
            <div className="header-label">Georgetown, TX &mdash; Apartment Locator</div>
            <h1>Apartment Locator</h1>
          </div>
        </div>

        <div className="stats-bar">
          <div className="stat"><span className="stat-value">{listings.length}</span><span className="stat-label">Properties</span></div>
          <div className="stat"><span className="stat-value">{totalUnits}</span><span className="stat-label">Available Units</span></div>
          <div className="stat"><span className="stat-value">{activeLeads}</span><span className="stat-label">Active Leads</span></div>
          <div className="stat"><span className="stat-value">{avgCommission}%</span><span className="stat-label">Avg Commission</span></div>
        </div>

        <div className="view-toggle">
          <button className={view === 'listings' ? 'active' : ''} onClick={() => setView('listings')}>Properties</button>
          <button className={view === 'leads' ? 'active' : ''} onClick={() => setView('leads')}>Leads</button>
        </div>
      </header>

      <main className="app-main">
        {view === 'listings' && (
          <>
            <Filters filters={filters} onFilterChange={handleFilterChange} />
            <div className="results-count">{filtered.length} of {listings.length} properties</div>
            {filtered.map(l => <ListingCard key={l.id} listing={l} />)}
            {filtered.length === 0 && <div className="empty-state">No properties match your filters.</div>}
          </>
        )}
        {view === 'leads' && <LeadTracker leads={leads} />}
      </main>

      <footer className="app-footer">Apartment Locator &mdash; built in the Lab &middot; 2026</footer>
    </div>
  );
}
