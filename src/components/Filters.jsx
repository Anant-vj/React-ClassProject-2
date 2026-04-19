import React from 'react';

const Filters = ({ filters, setFilters, sortConfig, setSortConfig }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      <select 
        className="form-select" 
        style={{ width: 'auto', minWidth: '150px' }}
        value={filters.platform}
        onChange={(e) => setFilters({...filters, platform: e.target.value})}
      >
        <option value="">All Platforms</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="Company Website">Company Website</option>
        <option value="Referral">Referral</option>
        <option value="Indeed">Indeed</option>
      </select>

      <select 
        className="form-select" 
        style={{ width: 'auto', minWidth: '150px' }}
        value={filters.locationType}
        onChange={(e) => setFilters({...filters, locationType: e.target.value})}
      >
        <option value="">All Locations</option>
        <option value="Remote">Remote</option>
        <option value="On-site">On-site</option>
        <option value="Hybrid">Hybrid</option>
      </select>

      <select 
        className="form-select" 
        style={{ width: 'auto', minWidth: '160px' }}
        value={sortConfig.key}
        onChange={(e) => setSortConfig({...sortConfig, key: e.target.value})}
      >
        <option value="appliedDate">Sort by: Date</option>
        <option value="salary">Sort by: Salary</option>
        <option value="company">Sort by: Company</option>
      </select>

      <button 
        className="btn-icon" 
        style={{ border: '1px solid var(--glass-border)', padding: '0.75rem 1rem' }}
        onClick={() => setSortConfig({
          ...sortConfig, 
          direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
        })}
      >
        {sortConfig.direction === 'asc' ? '↑ Asc' : '↓ Desc'}
      </button>
    </div>
  );
};

export default Filters;
