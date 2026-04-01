function EmployeeTable({
  employees,
  selectedIds,
  onToggleSelect,
  onDelete,
  onView,
  onEdit
}) {
  return (
    <div className="table-responsive">
      <table className="table align-middle employee-table mb-0">
        <thead>
          <tr>
            <th style={{ width: '60px' }}>×</th>
            <th style={{ width: '160px' }}>Hành động</th>
            <th style={{ width: '80px' }}>STT</th>
            <th style={{ width: '120px' }}>Tên</th>
            <th style={{ width: '180px' }}>Họ đệm</th>
            <th>Địa chỉ</th>
            <th style={{ width: '140px' }}>Hoạt động</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedIds.includes(employee.id)}
                    onChange={() => onToggleSelect(employee.id)}
                  />
                </td>
                <td>
                  <div className="d-inline-flex rounded overflow-hidden shadow-sm">
                    <button
                      className="btn btn-sm btn-info text-white px-3 action-btn"
                      title="Xem"
                      onClick={() => onView(employee)}
                    >
                      <i className="bi bi-eye-fill"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-warning px-3 action-btn"
                      title="Sửa"
                      onClick={() => onEdit(employee)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger px-3 action-btn"
                      title="Xóa"
                      onClick={() => onDelete(employee.id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                </td>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.middleName}</td>
                <td>{employee.address}</td>
                <td>
                  {employee.active ? (
                    <span className="status-icon text-success"><i className="bi bi-check-lg"></i></span>
                  ) : (
                    <span className="status-icon text-danger"><i className="bi bi-x-lg"></i></span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-muted">
                Không có dữ liệu phù hợp
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeTable
