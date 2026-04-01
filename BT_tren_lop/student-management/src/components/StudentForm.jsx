import { useEffect, useState } from 'react'

function StudentForm({ onSave, editingStudent, onCancel }) {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    major: '',
    gender: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent)
    } else {
      setFormData({
        fullName: '',
        studentId: '',
        email: '',
        phone: '',
        major: '',
        gender: '',
      })
    }
    setErrors({})
  }, [editingStudent])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ và tên không được để trống'
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Mã sinh viên không được để trống'
    } else if (!/^SV\d{3}$/.test(formData.studentId)) {
      newErrors.studentId = 'Mã sinh viên phải đúng dạng SV001'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email không đúng định dạng'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại không được để trống'
    } else if (!/^\d{9,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại phải từ 9 đến 11 chữ số'
    }

    if (!formData.major) {
      newErrors.major = 'Vui lòng chọn ngành học'
    }

    if (!formData.gender) {
      newErrors.gender = 'Vui lòng chọn giới tính'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    onSave(formData)

    if (!editingStudent) {
      setFormData({
        fullName: '',
        studentId: '',
        email: '',
        phone: '',
        major: '',
        gender: '',
      })
    }
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light">
        <h3 className="mb-0">Đăng ký/Sửa thông tin Sinh viên</h3>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Họ và tên</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <small className="text-danger">{errors.fullName}</small>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Mã sinh viên</label>
              <input
                type="text"
                name="studentId"
                className="form-control"
                placeholder="VD: SV001"
                value={formData.studentId}
                onChange={handleChange}
                disabled={!!editingStudent}
              />
              {errors.studentId && (
                <small className="text-danger">{errors.studentId}</small>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone}</small>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Ngành học</label>
              <select
                name="major"
                className="form-select"
                value={formData.major}
                onChange={handleChange}
              >
                <option value="">Chọn ngành</option>
                <option value="IT">IT</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
              </select>
              {errors.major && (
                <small className="text-danger">{errors.major}</small>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label d-block">Giới tính</label>

              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Nam"
                  className="form-check-input"
                  checked={formData.gender === 'Nam'}
                  onChange={handleChange}
                />
                <label htmlFor="male" className="form-check-label">
                  Nam
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Nữ"
                  className="form-check-input"
                  checked={formData.gender === 'Nữ'}
                  onChange={handleChange}
                />
                <label htmlFor="female" className="form-check-label">
                  Nữ
                </label>
              </div>

              <div>
                {errors.gender && (
                  <small className="text-danger">{errors.gender}</small>
                )}
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary me-2">
            {editingStudent ? 'Cập nhật' : 'Lưu thông tin'}
          </button>

          {editingStudent && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Hủy
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default StudentForm