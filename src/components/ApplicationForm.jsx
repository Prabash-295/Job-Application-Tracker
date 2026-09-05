import { useState } from 'react';
import { STATUSES, JOB_TYPES } from '../data/demoApplications';

const emptyForm = {
  company: '',
  role: '',
  location: '',
  jobType: 'Full Time',
  applicationDate: '',
  status: 'Applied',
  notes: '',
};

function ApplicationForm({ application, onSubmit, onClose }) {
  const [formData, setFormData] = useState(application ? { ...application } : { ...emptyForm });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.company.trim()) newErrors.company = 'Company name is required.';
    if (!formData.role.trim()) newErrors.role = 'Job role is required.';
    if (!formData.location.trim()) newErrors.location = 'Location is required.';
    if (!formData.applicationDate) newErrors.applicationDate = 'Application date is required.';
    if (!formData.status) newErrors.status = 'Status is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const title = application ? 'Edit Application' : 'Add Application';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" type="button" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <form className="modal__body" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              className={errors.company ? 'field-error' : ''}
              aria-invalid={Boolean(errors.company)}
              placeholder="e.g. Google"
            />
            {errors.company && <span className="error-text">{errors.company}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="role">Job Role</label>
            <input
              id="role"
              name="role"
              type="text"
              value={formData.role}
              onChange={handleChange}
              className={errors.role ? 'field-error' : ''}
              aria-invalid={Boolean(errors.role)}
              placeholder="e.g. Frontend Developer"
            />
            {errors.role && <span className="error-text">{errors.role}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className={errors.location ? 'field-error' : ''}
                aria-invalid={Boolean(errors.location)}
                placeholder="e.g. Bengaluru"
              />
              {errors.location && <span className="error-text">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="applicationDate">Application Date</label>
              <input
                id="applicationDate"
                name="applicationDate"
                type="date"
                value={formData.applicationDate}
                onChange={handleChange}
                className={errors.applicationDate ? 'field-error' : ''}
                aria-invalid={Boolean(errors.applicationDate)}
              />
              {errors.applicationDate && <span className="error-text">{errors.applicationDate}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="jobType">Job Type</label>
              <select id="jobType" name="jobType" value={formData.jobType} onChange={handleChange}>
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={errors.status ? 'field-error' : ''}
                aria-invalid={Boolean(errors.status)}
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && <span className="error-text">{errors.status}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Interview details, follow-up tasks, links..."
            />
          </div>

          <div className="modal__actions">
            <button className="btn btn--secondary" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn--primary" type="submit">
              {application ? 'Save Changes' : 'Add Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;