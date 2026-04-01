function ViewEmployeeModal({ show, employee, onClose }) {
  if (!show || !employee) return null

  return (
    <div className="modal d-block employee-modal-backdrop" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-custom">
          <div className="modal-header border-bottom-0 px-4 pt-4">
            <h2 className="modal-title modal-title-custom">Chi tiết Nhân viên</h2>
            <button type="button" className="btn-close fs-5" onClick={onClose}></button>
          </div>

          <div className="modal-body px-4 py-3">
            <div className="detail-row"><strong>STT:</strong> {employee.id}</div>
            <div className="detail-row"><strong>Tên:</strong> {employee.firstName}</div>
            <div className="detail-row"><strong>Họ đệm:</strong> {employee.middleName}</div>
            <div className="detail-row"><strong>Địa chỉ:</strong> {employee.address}</div>
            <div className="detail-row">
              <strong>Hoạt động:</strong>{' '}
              {employee.active ? (
                <span className="badge text-bg-success">Đang hoạt động</span>
              ) : (
                <span className="badge text-bg-danger">Ngừng hoạt động</span>
              )}
            </div>
          </div>

          <div className="modal-footer modal-footer-custom px-4 py-4">
            <button type="button" className="btn btn-secondary px-4" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewEmployeeModal
