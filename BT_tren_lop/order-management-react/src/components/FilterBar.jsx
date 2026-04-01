function FilterBar({ filters, setFilters, clearFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="card">
      <h2>FilterBar</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Trạng thái</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <div className="form-group">
          <label>Từ ngày</label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Đến ngày</label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Tìm kiếm (Tên/Phone/Địa chỉ)</label>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search..."
          />
        </div>
      </div>

      <button className="btn btn-danger" onClick={clearFilters}>
        Xóa filter
      </button>
    </section>
  );
}

export default FilterBar;