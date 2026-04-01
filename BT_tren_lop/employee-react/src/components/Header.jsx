function Header({ topKeyword, setTopKeyword, onTopSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onTopSearch(topKeyword)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark topbar px-3 px-lg-4">
      <div className="container-fluid px-0">
        <span className="navbar-brand fw-bold">Trường Đại học Thủy lợi</span>

        <div className="d-flex align-items-center gap-3 ms-auto flex-wrap justify-content-end">
          <a href="#" className="nav-link-custom active">Trang chủ</a>
          <a href="#" className="nav-link-custom">Quản lý cửa hàng</a>

          <form className="d-flex gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control header-search"
              placeholder="Nhập nội dung tìm kiếm"
              value={topKeyword}
              onChange={(e) => setTopKeyword(e.target.value)}
            />
            <button className="btn btn-outline-info px-3" type="submit">
              TÌM KIẾM
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Header
