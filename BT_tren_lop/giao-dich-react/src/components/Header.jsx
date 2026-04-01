function Header({ searchText, onSearchTextChange, onSearch, onKeyDown }) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3 px-lg-4">
        <div className="container-fluid px-0">
          <a className="navbar-brand fw-bold" href="#">Trường Đại học Thủy lợi</a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto align-items-lg-center me-lg-3">
              <li className="nav-item">
                <a className="nav-link active fw-semibold" href="#">Trang chủ</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white-50" href="#">Quản lý cửa hàng</a>
              </li>
            </ul>

            <div className="d-flex mt-3 mt-lg-0" role="search">
              <input
                className="form-control me-2 header-search-input"
                type="search"
                placeholder="Nhập nội dung tìm kiếm"
                value={searchText}
                onChange={(e) => onSearchTextChange(e.target.value)}
                onKeyDown={onKeyDown}
              />
              <button className="btn btn-outline-info text-nowrap" type="button" onClick={onSearch}>
                TÌM KIẾM
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
