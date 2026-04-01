function EmployeeTable({
  employees,
  totalCount,
  currentPage,
  pageNumbers,
  selectedIds,
  onOpenModal,
  onDeleteSelected,
  onDeleteOne,
  onEdit,
  onToggleSelect,
  onToggleSelectAllOnPage,
  onChangePage,
}) {
  const allOnPageSelected =
    employees.length > 0 && employees.every((employee) => selectedIds.includes(employee.id));

  return (
    <section className="table-card">
      <div className="table-topbar">
        <h2>
          Manage <span>Employees</span>
        </h2>

        <div className="topbar-actions">
          <button type="button" className="delete-main-btn" onClick={onDeleteSelected}>
            <span className="circle-icon">−</span>
            Delete
          </button>

          <button type="button" className="add-main-btn" onClick={onOpenModal}>
            <span className="circle-icon">+</span>
            Add New Employee
          </button>
        </div>
      </div>

      <div className="table-body">
        <table className="employee-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  checked={allOnPageSelected}
                  onChange={onToggleSelectAllOnPage}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">
                  Không có dữ liệu phù hợp
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(employee.id)}
                      onChange={() => onToggleSelect(employee.id)}
                    />
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{employee.phone}</td>
                  <td className="action-icons">
                    <button
                      type="button"
                      className="edit-icon"
                      title="Edit"
                      onClick={() => onEdit(employee)}
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      className="delete-icon"
                      title="Delete"
                      onClick={() => onDeleteOne(employee.id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="table-footer">
          <div className="footer-left">
            Showing {employees.length} out of {totalCount} entries
          </div>

          <div className="pagination">
            <button
              type="button"
              className="page-btn"
              onClick={() => onChangePage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {pageNumbers.map((page) => (
              <button
                type="button"
                key={page}
                className={page === currentPage ? "active-page page-btn" : "page-btn"}
                onClick={() => onChangePage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="page-btn"
              onClick={() => onChangePage(Math.min(currentPage + 1, pageNumbers.length))}
              disabled={currentPage === pageNumbers.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeTable;
