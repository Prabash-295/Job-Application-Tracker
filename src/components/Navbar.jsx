function Navbar() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar__logo">
          <span className="navbar__logo-icon" aria-hidden="true">
            &#128188;
          </span>
          <span>Job Application Tracker</span>
        </div>
        <span className="navbar__date">{today}</span>
      </div>
    </header>
  );
}

export default Navbar;