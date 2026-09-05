function ApplicationCard({ application, onEdit, onDelete }) {
  const statusClass = `status-badge status-badge--${application.status.toLowerCase()}`;

  return (
    <article className="application-card">
      <div className="application-card__header">
        <div>
          <h2 className="application-card__company">{application.company}</h2>
          <p className="application-card__role">{application.role}</p>
        </div>
        <span className={statusClass}>{application.status}</span>
      </div>

      <div className="application-card__meta">
        <span className="meta-chip" title="Location">
          &#128205; {application.location}
        </span>
        <span className="meta-chip" title="Job type">
          {application.jobType}
        </span>
        <span className="meta-chip" title="Application date">
          &#128197; {application.applicationDate}
        </span>
      </div>

      {application.notes && (
        <p className="application-card__notes">{application.notes}</p>
      )}

      <div className="application-card__actions">
        <button className="btn btn--secondary btn--sm" type="button" onClick={() => onEdit(application)}>
          Edit
        </button>
        <button className="btn btn--danger btn--sm" type="button" onClick={() => onDelete(application)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default ApplicationCard;