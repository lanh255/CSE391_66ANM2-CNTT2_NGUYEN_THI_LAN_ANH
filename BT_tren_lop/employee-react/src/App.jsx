import { useMemo, useState } from 'react'
import Header from './components/Header'
import EmployeeTable from './components/EmployeeTable'
import EmployeeModal from './components/EmployeeModal'
import ViewEmployeeModal from './components/ViewEmployeeModal'
import Pagination from './components/Pagination'
import employeeData from './data'

function App() {
  const [employees, setEmployees] = useState(employeeData)
  const [selectedIds, setSelectedIds] = useState([])
  const [topKeyword, setTopKeyword] = useState('')
  const [tableKeyword, setTableKeyword] = useState('')
  const [activeKeyword, setActiveKeyword] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const filteredEmployees = useMemo(() => {
    const keyword = activeKeyword.trim().toLowerCase()
    if (!keyword) return employees

    return employees.filter((employee) => {
      return (
        String(employee.id).includes(keyword) ||
        employee.firstName.toLowerCase().includes(keyword) ||
        employee.middleName.toLowerCase().includes(keyword) ||
        employee.address.toLowerCase().includes(keyword) ||
        (employee.active ? 'hoạt động' : 'ngừng').includes(keyword)
      )
    })
  }, [employees, activeKeyword])

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / rowsPerPage))

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredEmployees.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredEmployees, currentPage, rowsPerPage])

  const startResult = filteredEmployees.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1
  const endResult = Math.min(currentPage * rowsPerPage, filteredEmployees.length)

  const applySearch = (keyword) => {
    setActiveKeyword(keyword)
    setCurrentPage(1)
  }

  const handleTopSearch = (keyword) => {
    setTableKeyword(keyword)
    applySearch(keyword)
  }

  const handleTableSearch = (e) => {
    e.preventDefault()
    setTopKeyword(tableKeyword)
    applySearch(tableKeyword)
  }

  const clearFilter = () => {
    setTopKeyword('')
    setTableKeyword('')
    setActiveKeyword('')
    setCurrentPage(1)
  }

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) return
    setEmployees((prev) => prev.filter((item) => item.id !== id))
    setSelectedIds((prev) => prev.filter((item) => item !== id))
  }

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      window.alert('Vui lòng chọn ít nhất một nhân viên để xóa')
      return
    }

    if (!window.confirm('Bạn có chắc chắn muốn xóa các bản ghi đã chọn không?')) return

    setEmployees((prev) => prev.filter((item) => !selectedIds.includes(item.id)))
    setSelectedIds([])
  }

  const handleOpenAdd = () => {
    setModalMode('add')
    setSelectedEmployee(null)
    setShowAddEditModal(true)
  }

  const handleOpenEdit = (employee) => {
    setModalMode('edit')
    setSelectedEmployee(employee)
    setShowAddEditModal(true)
  }

  const handleOpenView = (employee) => {
    setSelectedEmployee(employee)
    setShowViewModal(true)
  }

  const handleSubmitEmployee = (employeeForm) => {
    if (modalMode === 'add') {
      const newEmployee = {
        ...employeeForm,
        id: employees.length > 0 ? Math.max(...employees.map((item) => item.id)) + 1 : 1
      }
      setEmployees((prev) => [...prev, newEmployee])
    } else {
      setEmployees((prev) =>
        prev.map((item) => (item.id === employeeForm.id ? employeeForm : item))
      )
      setSelectedEmployee(employeeForm)
    }

    setShowAddEditModal(false)
  }

  const exportCsv = () => {
    const headers = ['STT', 'Tên', 'Họ đệm', 'Địa chỉ', 'Hoạt động']
    const rows = filteredEmployees.map((item) => [
      item.id,
      item.firstName,
      item.middleName,
      item.address,
      item.active ? 'Hoạt động' : 'Ngừng hoạt động'
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'danh-sach-nhan-vien.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app-shell">
      <Header
        topKeyword={topKeyword}
        setTopKeyword={setTopKeyword}
        onTopSearch={handleTopSearch}
      />

      <main className="container-fluid px-3 px-lg-5 py-4 page-body">
        <div className="content-card p-3 p-lg-4">
          <div className="row g-3 align-items-center mb-3">
            <div className="col-lg-4 d-flex flex-wrap gap-2">
              <button className="btn btn-primary px-4 fw-semibold" onClick={handleOpenAdd}>
                <i className="bi bi-plus-circle-fill me-2"></i>THÊM MỚI
              </button>
              <button className="btn btn-light border px-4 fw-semibold" onClick={exportCsv}>
                <i className="bi bi-download me-2"></i>XUẤT RA FILE <i className="bi bi-chevron-right ms-2"></i>
              </button>
            </div>

            <div className="col-lg-5">
              <form className="d-flex" onSubmit={handleTableSearch}>
                <button type="button" className="btn btn-light border-end-0 search-addon">
                  <i className="bi bi-chevron-right"></i>
                </button>
                <input
                  type="text"
                  className="form-control border-start-0 border-end-0 search-input"
                  placeholder="Tìm kiếm theo Tên"
                  value={tableKeyword}
                  onChange={(e) => setTableKeyword(e.target.value)}
                />
                <button className="btn btn-light border search-btn" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>

            <div className="col-lg-3 d-flex justify-content-lg-end align-items-center gap-2">
              <span className="fw-semibold text-end result-label">Kết quả</span>
              <select
                className="form-select result-select"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>

          <div className="table-wrapper border rounded-3 overflow-hidden">
            <EmployeeTable
              employees={paginatedEmployees}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onDelete={handleDelete}
              onView={handleOpenView}
              onEdit={handleOpenEdit}
            />

            <div className="px-3 py-3 border-top bg-white">
              <button className="btn btn-danger" onClick={handleDeleteSelected}>
                <i className="bi bi-x-circle me-2"></i>DELETE SELECTED RECORDS
              </button>
            </div>
          </div>

          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3 mt-3">
            <div className="d-flex align-items-center gap-2">
              <span>Trang</span>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>

            <div className="text-muted fw-semibold small">
              Kết quả {startResult} đến {endResult} trong {filteredEmployees.length}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer-panel px-4 py-4 mt-auto">
        <div className="container-fluid px-lg-5">
          <h2 className="footer-title mb-3">TRƯỜNG ĐẠI HỌC THỦY LỢI</h2>
          <div>Địa chỉ: 175 Tây Sơn, Đống Đa, Hà Nội</div>
          <div>Điện thoại: (024) 38522001 - Fax: (024) 35633351</div>
          <div>Email: phonghcth@tlu.edu.vn</div>
        </div>
      </footer>

      <EmployeeModal
        show={showAddEditModal}
        mode={modalMode}
        employee={selectedEmployee}
        onClose={() => setShowAddEditModal(false)}
        onSubmit={handleSubmitEmployee}
      />

      <ViewEmployeeModal
        show={showViewModal}
        employee={selectedEmployee}
        onClose={() => setShowViewModal(false)}
      />
    </div>
  )
}

export default App
