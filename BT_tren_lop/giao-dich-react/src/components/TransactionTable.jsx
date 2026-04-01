import { formatCurrency, formatDateTime } from '../utils'

function TransactionTable({
  data,
  selectedIds,
  onToggleSelect,
  onDelete,
  onDeleteSelected,
  onView,
  onEdit,
}) {
  return (
    <div className="table-responsive border rounded-3 overflow-hidden bg-white">
      <table className="table table-hover align-middle mb-0 custom-table">
        <thead className="table-dark">
          <tr>
            <th className="text-center" style={{ width: '60px' }}>×</th>
            <th className="text-center" style={{ minWidth: '150px' }}>Hành động</th>
            <th className="text-center">ID</th>
            <th className="text-center">Khách hàng</th>
            <th className="text-center">Nhân viên</th>
            <th className="text-center">Số tiền</th>
            <th className="text-center">Ngày mua</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-5 text-secondary">
                Không tìm thấy giao dịch phù hợp.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td className="text-center">
                  <button
                    type="button"
                    className={`btn btn-sm ${selectedIds.includes(item.id) ? 'btn-danger' : 'btn-outline-secondary'}`}
                    onClick={() => onToggleSelect(item.id)}
                    title="Chọn để xóa nhiều bản ghi"
                  >
                    ×
                  </button>
                </td>
                <td className="text-center">
                  <div className="btn-group btn-group-sm" role="group">
                    <button type="button" className="btn btn-primary" title="Xem" onClick={() => onView(item)}>👁</button>
                    <button type="button" className="btn btn-warning" title="Sửa" onClick={() => onEdit(item)}>✎</button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onDelete(item.id)}
                      title="Xóa bản ghi này"
                    >
                      ×
                    </button>
                  </div>
                </td>
                <td className="text-center">{item.id}</td>
                <td className="text-center">{item.customer}</td>
                <td className="text-center">{item.employee}</td>
                <td className="text-center">{formatCurrency(item.amount)}</td>
                <td className="text-center">{formatDateTime(item.date)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="p-3 border-top bg-light">
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={onDeleteSelected}
          disabled={selectedIds.length === 0}
        >
          × DELETE SELECTED RECORDS
        </button>
      </div>
    </div>
  )
}

export default TransactionTable
