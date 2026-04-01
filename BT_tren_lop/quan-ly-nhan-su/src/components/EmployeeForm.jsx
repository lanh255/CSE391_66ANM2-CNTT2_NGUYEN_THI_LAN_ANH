import { useState } from "react";

function EmployeeForm({ dongForm, themNhanSu }) {
  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    soDienThoai: "",
    viTri: "",
    gioiTinh: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.hoTen.trim()) {
      newErrors.hoTen = "Họ tên không được để trống";
    } else if (formData.hoTen.length > 30) {
      newErrors.hoTen = "Họ tên tối đa 30 ký tự";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    if (!formData.soDienThoai.trim()) {
      newErrors.soDienThoai = "Số điện thoại không được để trống";
    } else if (!/^\d{10}$/.test(formData.soDienThoai)) {
      newErrors.soDienThoai = "Số điện thoại phải gồm đúng 10 chữ số";
    }

    if (!formData.viTri) {
      newErrors.viTri = "Vui lòng chọn vị trí";
    }

    if (!formData.gioiTinh) {
      newErrors.gioiTinh = "Vui lòng chọn giới tính";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      themNhanSu(formData);
      dongForm();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Thêm nhân sự mới</h3>
          <span className="close" onClick={dongForm}>
            ×
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label>Họ tên</label>
              <input
                type="text"
                name="hoTen"
                value={formData.hoTen}
                onChange={handleChange}
                maxLength="30"
                required
              />
              {errors.hoTen && <p className="error">{errors.hoTen}</p>}
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div>
              <label>Số điện thoại</label>
              <input
                type="text"
                name="soDienThoai"
                value={formData.soDienThoai}
                onChange={handleChange}
                minLength="10"
                maxLength="10"
                required
              />
              {errors.soDienThoai && (
                <p className="error">{errors.soDienThoai}</p>
              )}
            </div>

            <div>
              <label>Vị trí</label>
              <select
                name="viTri"
                value={formData.viTri}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn vị trí --</option>
                <option value="Nhân viên">Nhân viên</option>
                <option value="Quản lý">Quản lý</option>
                <option value="Giám đốc">Giám đốc</option>
              </select>
              {errors.viTri && <p className="error">{errors.viTri}</p>}
            </div>

            <div className="full-width">
              <label>Giới tính</label>
              <div className="gender-group">
                <label>
                  <input
                    type="radio"
                    name="gioiTinh"
                    value="Nam"
                    checked={formData.gioiTinh === "Nam"}
                    onChange={handleChange}
                  />
                  Nam
                </label>
                <label>
                  <input
                    type="radio"
                    name="gioiTinh"
                    value="Nữ"
                    checked={formData.gioiTinh === "Nữ"}
                    onChange={handleChange}
                  />
                  Nữ
                </label>
              </div>
              {errors.gioiTinh && <p className="error">{errors.gioiTinh}</p>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn-save">
              Lưu
            </button>
            <button type="button" className="btn-cancel" onClick={dongForm}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
