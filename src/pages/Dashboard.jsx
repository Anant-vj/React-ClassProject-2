import { useApplications } from '../hooks/useApplications';
import { FiBriefcase, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, gradient, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="glass-panel" 
    style={{ padding: '1.5rem', flex: '1', minWidth: '200px' }}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{title}</h3>
      <div 
        style={{ 
          width: '40px', height: '40px', borderRadius: '12px', 
          background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
        }}
      >
        {icon}
      </div>
    </div>
    <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>
      {value}
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { applications, isLoading } = useApplications();

  const stats = {
    total: applications.length,
    interviewing: applications.filter(a => a.status === 'Interviewing' || a.status === 'Interview Scheduled').length,
    offers: applications.filter(a => a.status === 'Offer' || a.status === 'Offer Received').length,
    rejected: applications.filter(a => a.status === 'Rejected').length
  };

  const upcomingInterviews = applications
    .filter(a => a.interviewDate && new Date(a.interviewDate) >= new Date())
    .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate))
    .slice(0, 3);

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header className="mb-8">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your job search overview.</p>
      </header>

      <div className="flex gap-6 flex-wrap mb-8">
        <StatCard 
          title="Total Applied" 
          value={stats.total} 
          icon={<FiBriefcase size={20} />} 
          gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
          delay={0}
        />
        <StatCard 
          title="Interviewing" 
          value={stats.interviewing} 
          icon={<FiCalendar size={20} />} 
          gradient="linear-gradient(135deg, #f59e0b, #d97706)"
          delay={0.1}
        />
        <StatCard 
          title="Offers" 
          value={stats.offers} 
          icon={<FiCheckCircle size={20} />} 
          gradient="linear-gradient(135deg, #10b981, #059669)"
          delay={0.2}
        />
        <StatCard 
          title="Rejected" 
          value={stats.rejected} 
          icon={<FiXCircle size={20} />} 
          gradient="linear-gradient(135deg, #ef4444, #dc2626)"
          delay={0.3}
        />
      </div>

      <div className="flex gap-6 flex-wrap">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel" 
          style={{ flex: 2, padding: '2rem', minWidth: '300px' }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2>Recent Applications</h2>
            <Link to="/applications" className="btn btn-secondary">View All</Link>
          </div>
          
          <div className="flex-col gap-4">
            {applications.slice(0, 4).map(app => (
              <div key={app.id} className="flex justify-between items-center" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                <div>
                  <h4 style={{ margin: 0, fontWeight: 600 }}>{app.role}</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem' }}>{app.company}</p>
                </div>
                <div className={`badge badge-${app.status.toLowerCase().replace(' ', '-')}`}>
                  {app.status}
                </div>
              </div>
            ))}
            {applications.length === 0 && <p>No applications yet.</p>}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel" 
          style={{ flex: 1, padding: '2rem', minWidth: '300px' }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2>Upcoming Interviews</h2>
          </div>
          
          <div className="flex-col gap-4">
            {upcomingInterviews.map(app => (
              <div key={app.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--warning-color)' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontWeight: 600 }}>{app.company}</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{app.role}</p>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning-color)' }}>
                    <FiCalendar /> {new Date(app.interviewDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
            {upcomingInterviews.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
                <FiCalendar size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                <p>No upcoming interviews</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
