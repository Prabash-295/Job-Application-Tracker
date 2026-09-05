function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      className="search-input"
      type="search"
      placeholder="Search by company or role..."
      value={searchTerm}
      onChange={(event) => onSearchChange(event.target.value)}
      aria-label="Search applications"
    />
  );
}

export default SearchBar;