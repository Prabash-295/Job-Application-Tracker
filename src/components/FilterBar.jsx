import { STATUSES } from '../data/demoApplications';

function FilterBar({ statusFilter, onStatusChange }) {
  return (
    <select
      className="filter-select"
      value={statusFilter}
      onChange={(event) => onStatusChange(event.target.value)}
      aria-label="Filter by status"
    >
      <option value="All">All Statuses</option>
      {STATUSES.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}

export default FilterBar;