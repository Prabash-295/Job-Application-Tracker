import ApplicationCard from './ApplicationCard';
import EmptyState from './EmptyState';

function ApplicationList({
  applications,
  totalApplications,
  onEdit,
  onDelete,
  onAdd,
  onClearFilters,
}) {
  if (applications.length === 0) {
    if (totalApplications === 0) {
      return (
        <EmptyState
          icon="&#128188;"
          title="No applications yet"
          message="Start tracking your job search by adding your first application."
        >
          <button className="btn btn--primary" type="button" onClick={onAdd}>
            + Add Application
          </button>
        </EmptyState>
      );
    }

    return (
      <EmptyState
        icon="&#128269;"
        title="No matching applications"
        message="No applications match your current search or filter. Try changing them."
      >
        <button className="btn btn--secondary" type="button" onClick={onClearFilters}>
          Clear search &amp; filters
        </button>
      </EmptyState>
    );
  }

  return (
    <section aria-label="Applications list">
      <p className="result-count">
        Showing {applications.length} of {totalApplications} application
        {totalApplications !== 1 ? 's' : ''}
      </p>
      <div className="applications-grid">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default ApplicationList;