import { useEffect, useMemo, useState } from 'react'

const emptyForm = {
  firstName: '',
  middleName: '',
  address: '',
  active: true
}

function EmployeeModal({ show, mode, employee, onClose, onSubmit }) {
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!show) return

    if (mode === 'edit' && employee) {
      setFormData({
        firstName: employee.firstName,
        middleName: employee.middleName,
        address: employee.address,
        active: employee.active
      })
    } else {
      setFormData(emptyForm)
    }

    setErrors({})
  }, [show, mode, employee])

  const title = useMemo(() => {
    if (mode === 'edit') return 'Sửa Nhân viên'
    return 'Thêm Nhân viên'
  }, [mode])

  const validate = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Tên không được để trống'
    } else if (formData.firstName.trim().length > 15) {
      newErrors.firstName = 'Tên không được vượt quá 15 ký tự'
    }

    if (!formData.middleName.trim()) {
      newErrors.middleName = 'Họ đệm không được để trống'
    } else if (formData.middleName.trim().length > 20) {
      newErrors.middleName = 'Họ đệm không được vượt quá 20 ký tự'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Địa chỉ không được để trống'
    } else if (formData.address.trim().length > 50) {
      newErrors.address = 'Địa chỉ không được vượt quá 50 ký tự'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSave = () => {
    if (!validate()) return
    onSubmit({
      ...employee,
      ...formData,
      firstName: formData.firstName.trim(),
      middleName: formData.middleName.trim(),
      address: formData.address.trim()
    })
  }

  if (!show) return null

  return (
    <div className="modal d-block employee-modal-backdrop" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-custom">
          <div className="modal-header border-bottom-0 px-4 pt-4">
            <h2 className="modal-title modal-title-custom">{title}</h2>
            <button type="button" className="btn-close fs-5" onClick={onClose}></button>
          </div>

          <div className="modal-body px-4 py-3">
            <div className="mb-3">
              <label className="form-label modal-label">Tên</label>
              <input
                type="text"
                className={`form-control form-control-lg ${errors.firstName ? 'is-invalid' : ''}`}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label modal-label">Họ đệm</label>
              <input
                type="text"
                className={`form-control form-control-lg ${errors.middleName ? 'is-invalid' : ''}`}
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
              {errors.middleName && <div className="invalid-feedback">{errors.middleName}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label modal-label">Địa chỉ</label>
              <textarea
                rows="3"
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>

            <div className="form-check form-switch mt-4">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="activeSwitch"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="activeSwitch">
                Hoạt động
              </label>
            </div>
          </div>

          <div className="modal-footer modal-footer-custom px-4 py-4">
            <button type="button" className="btn btn-light btn-lg px-4" onClick={onClose}>
              Hủy
            </button>
            <button type="button" className="btn btn-success btn-lg px-4" onClick={handleSave}>
              {mode === 'edit' ? 'Lưu' : 'Thêm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeModal
