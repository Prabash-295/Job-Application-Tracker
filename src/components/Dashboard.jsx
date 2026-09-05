function Dashboard({ applications }) {
  const stats = [
    {
      label: 'Total Applications',
      value: applications.length,
      className: 'stat-card--total',
    },
    {
      label: 'Applied',
      value: applications.filter((app) => app.status === 'Applied').length,
      className: 'stat-card--applied',
    },
    {
      label: 'Interviews',
      value: applications.filter((app) => app.status === 'Interview').length,
      className: 'stat-card--interview',
    },
    {
      label: 'Offers',
      value: applications.filter((app) => app.status === 'Offer').length,
      className: 'stat-card--offer',
    },
    {
      label: 'Rejected',
      value: applications.filter((app) => app.status === 'Rejected').length,
      className: 'stat-card--rejected',
    },
  ];

  return (
    <section aria-label="Application statistics">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-subtitle">A quick overview of your job search.</p>
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className={`stat-card ${stat.className}`}>
            <div className="stat-card__value">{stat.value}</div>
            <div className="stat-card__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;