import { useEffect, useState } from "react";

function EmployeeModal({ onClose, onAdd, editingEmployee }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name,
        email: editingEmployee.email,
        address: editingEmployee.address,
        phone: editingEmployee.phone,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        address: "",
        phone: "",
      });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name không được để trống";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address không được để trống";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone không được để trống";
    } else if (!/^0\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Phone phải có đúng 10 số và bắt đầu bằng 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onAdd(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="employee-modal">
        <div className="modal-header">
          <h2>{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>
          <button type="button" className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <p className="error-text">{errors.address}</p>}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ví dụ: 0123456789"
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-btn">
              {editingEmployee ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeModal;
