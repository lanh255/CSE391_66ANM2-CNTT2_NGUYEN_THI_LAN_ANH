import { formatCurrency, formatDateTime } from '../utils'

function ViewTransactionModal({ show, onClose, transaction }) {
  if (!show || !transaction) return null

  return (
    <div className="modal d-block modal-backdrop-custom" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow border-0">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Chi tiết giao dịch</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label fw-semibold">ID</label>
                <div className="form-control bg-light">{transaction.id}</div>
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Khách hàng</label>
                <div className="form-control bg-light">{transaction.customer}</div>
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Nhân viên</label>
                <div className="form-control bg-light">{transaction.employee}</div>
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Số tiền</label>
                <div className="form-control bg-light">{formatCurrency(transaction.amount)}</div>
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Ngày mua</label>
                <div className="form-control bg-light">{formatDateTime(transaction.date)}</div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTransactionModal
