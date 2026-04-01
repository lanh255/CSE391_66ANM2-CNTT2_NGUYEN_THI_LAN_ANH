import { useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  address: '',
  phone: ''
};

export default function EmployeeForm({ onAddEmployee }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setErrors({});
    setMessage('');
    setMessageType('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      // newErrors.name = 'Name không được để trống.';
    }

    if (!formData.email.trim()) {
      // newErrors.email = 'Email không được để trống.';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email.trim())) {
        newErrors.email = 'Email không đúng định dạng.';
      }
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address không được để trống.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone không được để trống.';
    } else if (!/^0\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone phải gồm 10 chữ số và bắt đầu bằng 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setMessage('Thêm nhân viên thất bại. Vui lòng kiểm tra lại dữ liệu nhập.');
      setMessageType('fail');
      return;
    }

    onAddEmployee({
      name: formData.name.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      phone: formData.phone.trim()
    });

    setMessage('Thêm nhân viên thành công.');
    setMessageType('success');
    setErrors({});
    setFormData(initialForm);
  };

  return (
    <div className="modal-card">
      <div className="modal-header">
        <h2>Add Employee</h2>
        <button className="close-btn" type="button" onClick={resetForm}>×</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter full name" required />
          <small className="error">{errors.name || ''}</small>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required/>
          <small className="error">{errors.email || ''}</small>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" rows="4" value={formData.address} onChange={handleChange} placeholder="Enter address" required/>
          <small className="error">{errors.address || ''}</small>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="text" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" required/>
          <small className="error">{errors.phone || ''}</small>
        </div>

        <p className={`message ${messageType}`}>{message}</p>

        <div className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={resetForm}>Cancel</button>
          <button type="submit" className="btn btn-add">Add</button>
        </div>
      </form>
    </div>
  );
}
