import { useState, useMemo } from 'react';
import { useApplications } from '../hooks/useApplications';
import { useDebounce } from '../hooks/useDebounce';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['All', 'Applied', 'Interview Scheduled', 'Offer Received', 'Rejected', 'Bookmarked'];

const Applications = () => {
  const { applications } = useApplications();
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  const [filters, setFilters] = useState({ platform: '', locationType: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'appliedDate', direction: 'desc' });

  const filteredApplications = useMemo(() => {
    let result = [...applications];

    // Subet by Tab
    if (activeTab === 'Bookmarked') {
      result = result.filter(app => app.bookmarked);
    } else if (activeTab !== 'All') {
      const match = activeTab === 'Interview Scheduled' ? ['Interview Scheduled', 'Interviewing'] :
                    activeTab === 'Offer Received' ? ['Offer', 'Offer Received'] : [activeTab];
      result = result.filter(app => match.includes(app.status));
    }

    // Search
    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      result = result.filter(app => 
        app.company.toLowerCase().includes(lowerSearch) || 
        app.role.toLowerCase().includes(lowerSearch)
      );
    }

    // Filters
    if (filters.platform) {
      result = result.filter(app => app.platform === filters.platform);
    }
    if (filters.locationType) {
      result = result.filter(app => app.location === filters.locationType);
    }

    // Sort
    result.sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];
      
      if (sortConfig.key === 'appliedDate') {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      }

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [applications, activeTab, debouncedSearch, filters, sortConfig]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header className="mb-8">
        <h1>Applications</h1>
        <p>Manage and track all your job applications in one place.</p>
      </header>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div className="flex gap-4 justify-between items-center flex-wrap mb-4" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <Filters 
            filters={filters} setFilters={setFilters}
            sortConfig={sortConfig} setSortConfig={setSortConfig}
          />
        </div>

        <div className="flex gap-2 flex-wrap" style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1rem', borderRadius: '100px', whiteSpace: 'nowrap' }}
            >
              {tab} {tab === 'Bookmarked' && <span style={{ marginLeft: '4px' }}>★</span>}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <AnimatePresence>
          {filteredApplications.map(app => (
            <JobCard key={app.id} job={app} />
          ))}
        </AnimatePresence>
      </div>
      
      {filteredApplications.length === 0 && (
        <div className="glass-panel text-center" style={{ padding: '4rem 2rem', marginTop: '2rem' }}>
          <div style={{ fontSize: '3rem', margin: '0 auto 1rem', opacity: 0.5 }}>📭</div>
          <h3>No applications found</h3>
          <p>Try adjusting your search or filters, or add a new application.</p>
        </div>
      )}
    </div>
  );
};

export default Applications;
