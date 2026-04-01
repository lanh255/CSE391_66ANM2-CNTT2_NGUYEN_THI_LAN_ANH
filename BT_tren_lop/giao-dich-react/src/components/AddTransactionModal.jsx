import { useEffect, useState } from 'react'

const emptyForm = {
  customer: '',
  employee: '',
  amount: '',
}

function AddTransactionModal({ show, onClose, onSubmit, initialData = null, mode = 'add' }) {
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (show) {
      setFormData(initialData ? {
        customer: initialData.customer ?? '',
        employee: initialData.employee ?? '',
        amount: initialData.amount ?? '',
      } : emptyForm)
      setErrors({})
    }
  }, [show, initialData])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.customer.trim()) {
      nextErrors.customer = 'Vui lòng nhập tên khách hàng.'
    } else if (formData.customer.trim().length > 30) {
      nextErrors.customer = 'Tên khách hàng không được vượt quá 30 ký tự.'
    }

    if (!formData.employee.trim()) {
      nextErrors.employee = 'Vui lòng nhập tên nhân viên.'
    } else if (formData.employee.trim().length > 30) {
      nextErrors.employee = 'Tên nhân viên không được vượt quá 30 ký tự.'
    }

    if (String(formData.amount).trim() === '') {
      nextErrors.amount = 'Vui lòng nhập số tiền.'
    } else if (Number.isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      nextErrors.amount = 'Số tiền phải là số lớn hơn 0.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    onSubmit({
      customer: formData.customer.trim(),
      employee: formData.employee.trim(),
      amount: Number(formData.amount),
    })
  }

  if (!show) return null

  return (
    <div className="modal d-block modal-backdrop-custom" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-primary shadow">
          <div className="modal-header">
            <h5 className="modal-title fs-2 text-secondary">{mode === 'edit' ? 'Sửa giao dịch' : 'Thêm giao dịch'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <div className="mb-3">
                <label className="form-label fs-5 text-secondary">Khách hàng</label>
                <input
                  type="text"
                  name="customer"
                  className={`form-control ${errors.customer ? 'is-invalid' : ''}`}
                  value={formData.customer}
                  onChange={handleChange}
                  placeholder="Nhập tên khách hàng"
                  maxLength={30}
                />
                {errors.customer && <div className="invalid-feedback">{errors.customer}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fs-5 text-secondary">Nhân viên</label>
                <input
                  type="text"
                  name="employee"
                  className={`form-control ${errors.employee ? 'is-invalid' : ''}`}
                  value={formData.employee}
                  onChange={handleChange}
                  placeholder="Nhập tên nhân viên"
                  maxLength={30}
                />
                {errors.employee && <div className="invalid-feedback">{errors.employee}</div>}
              </div>

              <div className="mb-0">
                <label className="form-label fs-5 text-secondary">Số tiền</label>
                <input
                  type="number"
                  name="amount"
                  className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Nhập số tiền"
                />
                {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
              </div>
            </div>

            <div className="modal-footer bg-light">
              <button type="button" className="btn btn-light px-4" onClick={onClose}>
                Hủy
              </button>
              <button type="submit" className="btn btn-success px-4">
                {mode === 'edit' ? 'Lưu' : 'Thêm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddTransactionModal
