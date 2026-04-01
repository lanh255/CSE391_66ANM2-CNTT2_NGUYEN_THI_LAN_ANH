function Navbar({ searchInput, setSearchInput, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="brand">TLU</div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#" className="active-link">
            Employees
          </a>
        </nav>
      </div>

      <form className="navbar-right" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    </header>
  );
}

export default Navbar;
