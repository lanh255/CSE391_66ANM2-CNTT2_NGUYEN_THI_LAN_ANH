function Header() {
  return (
    <header className="header">
      <div className="logo">Quản lý nhân sự</div>
      <nav className="nav">
        <a href="#">Trang chủ</a>
        <a href="#">Liên hệ</a>
      </nav>
      <div className="search-box">
        <input type="text" placeholder="Tìm kiếm..." />
        <button>Tìm</button>
      </div>
    </header>
  );
}

export default Header;
