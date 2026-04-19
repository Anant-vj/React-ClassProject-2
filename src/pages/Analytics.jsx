import { useApplications } from '../hooks/useApplications';
import { StatusChart, TimelineChart } from '../components/Charts';
import { format, subMonths, isAfter } from 'date-fns';

const Analytics = () => {
  const { applications } = useApplications();

  // Prepare data for Status Pie Chart
  const statusCounts = applications.reduce((acc, app) => {
    let status = app.status;
    if (status === 'Interview Scheduled') status = 'Interviewing';
    if (status === 'Offer Received') status = 'Offer';
    
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  
  const statusData = Object.keys(statusCounts).map(key => ({
    name: key,
    value: statusCounts[key]
  }));

  // Prepare data for Timeline Bar Chart (Last 6 Months)
  const last6Months = Array.from({ length: 6 }).map((_, i) => {
    const d = subMonths(new Date(), 5 - i);
    return { name: format(d, 'MMM'), monthYear: format(d, 'MM-yyyy'), applications: 0 };
  });

  applications.forEach(app => {
    if (app.appliedDate) {
      const d = new Date(app.appliedDate);
      const appMonthYear = format(d, 'MM-yyyy');
      const monthObj = last6Months.find(m => m.monthYear === appMonthYear);
      if (monthObj) monthObj.applications += 1;
    }
  });

  const offerRate = applications.length 
    ? ((statusCounts['Offer'] || 0) / applications.length * 100).toFixed(1) 
    : 0;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header className="mb-8">
        <h1>Analytics</h1>
        <p>Insights and metrics about your job search journey.</p>
      </header>

      <div className="flex gap-6 flex-wrap mb-8">
        <div className="glass-panel text-center" style={{ padding: '2rem', flex: 1, minWidth: '250px' }}>
          <h3 className="text-secondary mb-2">Total Applications</h3>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--primary-color)' }}>{applications.length}</div>
        </div>
        <div className="glass-panel text-center" style={{ padding: '2rem', flex: 1, minWidth: '250px' }}>
          <h3 className="text-secondary mb-2">Interviews Secured</h3>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--warning-color)' }}>
            {(statusCounts['Interviewing'] || 0) + (statusCounts['Offer'] || 0) + (statusCounts['Rejected (After Interview)'] || 0) /* Just estimating */}
            {statusCounts['Interviewing'] || 0}
          </div>
        </div>
        <div className="glass-panel text-center" style={{ padding: '2rem', flex: 1, minWidth: '250px' }}>
          <h3 className="text-secondary mb-2">Offer Rate</h3>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--success-color)' }}>{offerRate}%</div>
        </div>
      </div>

      <div className="flex gap-6 flex-wrap">
        <div className="glass-panel" style={{ padding: '2rem', flex: 1, minWidth: '350px' }}>
          <h3 className="mb-6">Application Pipeline</h3>
          {statusData.length > 0 ? (
            <StatusChart data={statusData} />
          ) : (
            <div className="text-center text-secondary py-8">No data available</div>
          )}
        </div>
        <div className="glass-panel" style={{ padding: '2rem', flex: 1.5, minWidth: '400px' }}>
          <h3 className="mb-6">Timeline (Last 6 Months)</h3>
          <TimelineChart data={last6Months} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
