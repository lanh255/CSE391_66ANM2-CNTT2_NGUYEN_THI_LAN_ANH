function Header({ language, setLanguage, onAddClick }) {
  const text = {
    vi: {
      title: "Quản Lý Danh Bạ",
      add: "Thêm Liên Hệ",
    },
    en: {
      title: "Contact Manager",
      add: "Add Contact",
    },
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <h1 className="page-title">{text[language].title}</h1>

      <div className="d-flex align-items-center gap-3">
        <select
          className="form-select language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </select>

        <button
          type="button"
          className="btn btn-dark header-add-btn"
          onClick={onAddClick}
        >
          {text[language].add}
        </button>
      </div>
    </div>
  );
}

export default Header;