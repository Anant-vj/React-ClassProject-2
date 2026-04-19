import { useState } from 'react';
import { FiMapPin, FiDollarSign, FiCalendar, FiBookmark, FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { getLogoUrl, formatCurrency, formatDate } from '../utils/helpers';
import { useApplications } from '../hooks/useApplications';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const JobCard = ({ job }) => {
  const { toggleBookmark, deleteApplication } = useApplications();
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'applied': return 'badge-applied';
      case 'interviewing': return 'badge-interviewing';
      case 'interview scheduled': return 'badge-interviewing';
      case 'offer': return 'badge-offer';
      case 'offer received': return 'badge-offer';
      case 'rejected': return 'badge-rejected';
      default: return 'badge-applied';
    }
  };

  const handleEdit = () => {
    navigate(`/applications/${job.id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(job.id);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="job-card glass-panel"
      style={{ padding: '1.5rem', position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div 
            style={{ 
              width: '56px', height: '56px', borderRadius: '12px', 
              background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', padding: '4px'
            }}
          >
            <img 
              src={getLogoUrl(job.company)} 
              alt={job.company} 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = `https://ui-avatars.com/api/?name=${job.company}&background=6366f1&color=fff&rounded=true&bold=true`;
              }}
            />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {job.role}
            </h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {job.company}
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn-icon" 
            onClick={() => toggleBookmark(job.id)}
            style={{ color: job.bookmarked ? 'var(--warning-color)' : 'var(--text-secondary)' }}
          >
            <FiBookmark fill={job.bookmarked ? 'var(--warning-color)' : 'none'} />
          </button>
          <div style={{ position: 'relative' }}>
            <button className="btn-icon" onClick={() => setShowActions(!showActions)}>
              <FiMoreVertical />
            </button>
            {showActions && (
              <div 
                className="glass-panel"
                style={{ 
                  position: 'absolute', right: 0, top: '100%', marginTop: '0.5rem',
                  padding: '0.5rem', zIndex: 10, minWidth: '150px',
                  display: 'flex', flexDirection: 'column', gap: '0.25rem'
                }}
              >
                <button 
                  className="btn-icon" 
                  style={{ width: '100%', justifyContent: 'flex-start', display: 'flex', gap: '0.5rem' }}
                  onClick={handleEdit}
                >
                  <FiEdit2 /> Edit
                </button>
                <button 
                  className="btn-icon" 
                  style={{ width: '100%', justifyContent: 'flex-start', display: 'flex', color: 'var(--danger-color)', gap: '0.5rem' }}
                  onClick={handleDelete}
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
        <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          <FiMapPin /> {job.location}
        </div>
        <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          <FiDollarSign /> {formatCurrency(job.salary)}
        </div>
        <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          <FiCalendar /> {formatDate(job.appliedDate)}
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto" style={{ paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
        <span className={`badge ${getStatusBadgeClass(job.status)}`}>
          {job.status}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Via {job.platform}
        </span>
      </div>
    </motion.div>
  );
};

export default JobCard;
