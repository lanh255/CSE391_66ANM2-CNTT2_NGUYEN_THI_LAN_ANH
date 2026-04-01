import { useMemo, useState } from 'react'
import Header from './components/Header'
import AddTransactionModal from './components/AddTransactionModal'
import Pagination from './components/Pagination'
import TransactionTable from './components/TransactionTable'
import ViewTransactionModal from './components/ViewTransactionModal'
import transactionsData from './data'

function App() {
  const [transactions, setTransactions] = useState(transactionsData)
  const [showModal, setShowModal] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [submittedKeyword, setSubmittedKeyword] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewItem, setViewItem] = useState(null)
  const [editItem, setEditItem] = useState(null)

  const filteredTransactions = useMemo(() => {
    const keyword = submittedKeyword.trim().toLowerCase()
    if (!keyword) return transactions

    return transactions.filter((item) => {
      return (
        String(item.id).toLowerCase().includes(keyword) ||
        item.customer.toLowerCase().includes(keyword) ||
        item.employee.toLowerCase().includes(keyword) ||
        String(item.amount).toLowerCase().includes(keyword)
      )
    })
  }, [transactions, submittedKeyword])

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredTransactions.slice(startIndex, endIndex)

  const resetFiltersAfterSave = () => {
    setShowModal(false)
    setEditItem(null)
    setSubmittedKeyword('')
    setSearchText('')
    setCurrentPage(1)
  }

  const handleAddTransaction = ({ customer, employee, amount }) => {
    const newRecord = {
      id: Date.now().toString().slice(-4),
      customer,
      employee,
      amount,
      date: new Date().toISOString(),
    }

    setTransactions((prev) => [newRecord, ...prev])
    resetFiltersAfterSave()
  }

  const handleUpdateTransaction = ({ customer, employee, amount }) => {
    if (!editItem) return

    setTransactions((prev) =>
      prev.map((item) =>
        item.id === editItem.id
          ? { ...item, customer, employee, amount }
          : item
      )
    )
    resetFiltersAfterSave()
  }

  const handleSearch = () => {
    setSubmittedKeyword(searchText)
    setCurrentPage(1)
  }

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSearch()
    }
  }

  const handleClearSearch = () => {
    setSearchText('')
    setSubmittedKeyword('')
    setCurrentPage(1)
  }

  const handleView = (item) => {
    setViewItem(item)
  }

  const handleEdit = (item) => {
    setEditItem(item)
    setShowModal(true)
  }

  const handleDeleteOne = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id))
    setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id))
  }

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return
    setTransactions((prev) => prev.filter((item) => !selectedIds.includes(item.id)))
    setSelectedIds([])
  }

  const handleExport = () => {
    const headers = ['ID', 'Khách hàng', 'Nhân viên', 'Số tiền', 'Ngày mua']
    const rows = filteredTransactions.map((item) => [
      item.id,
      item.customer,
      item.employee,
      item.amount,
      new Date(item.date).toLocaleString('vi-VN'),
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'giao-dich.csv'
    link.click()
  }

  return (
    <div className="app-shell bg-light min-vh-100 d-flex flex-column">
      <Header
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onSearch={handleSearch}
        onKeyDown={handleSearchKeyDown}
      />

      <main className="container-fluid px-4 px-lg-5 py-4 flex-grow-1">
        <div className="card border-0 shadow-sm rounded-3">
          <div className="card-body p-3 p-lg-4">
            <div className="row g-3 align-items-center mb-3">
              <div className="col-12 col-lg-4">
                <div className="d-flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn btn-primary fw-semibold px-3"
                    onClick={() => setShowModal(true)}
                  >
                    <span className="me-2">●</span>THÊM
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary fw-semibold px-3"
                    onClick={handleExport}
                  >
                    ⤓ XUẤT RA FILE <span className="ms-1">›</span>
                  </button>
                </div>
              </div>

              <div className="col-12 col-lg-5">
                <div className="input-group shadow-sm-sm">
                  <button type="button" className="btn btn-outline-secondary px-3">›</button>
                  <input
                    type="text"
                    className="form-control"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Tìm kiếm giao dịch"
                  />
                  <button type="button" className="btn btn-outline-primary" onClick={handleSearch}>
                    🔍
                  </button>
                  <button type="button" className="btn btn-outline-danger" onClick={handleClearSearch}>
                    Xóa lọc
                  </button>
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="d-flex align-items-center justify-content-lg-end gap-2">
                  <label className="fw-semibold mb-0">Kết quả</label>
                  <select
                    className="form-select w-auto"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value))
                      setCurrentPage(1)
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                </div>
              </div>
            </div>

            {submittedKeyword && (
              <div className="alert alert-info py-2 px-3 mb-3 small">
                Đang lọc theo từ khóa: <strong>{submittedKeyword}</strong>
              </div>
            )}

            <TransactionTable
              data={currentItems}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onDelete={handleDeleteOne}
              onDeleteSelected={handleDeleteSelected}
              onView={handleView}
              onEdit={handleEdit}
            />

            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3 mt-3">
              <Pagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
              <div className="fw-semibold text-secondary small">
                Kết quả {filteredTransactions.length === 0 ? 0 : startIndex + 1} đến{' '}
                {Math.min(endIndex, filteredTransactions.length)} trong {filteredTransactions.length} bản ghi
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer-tlu text-white mt-4 py-4">
        <div className="container">
          <h2 className="h3 fw-bold mb-3">TRƯỜNG ĐẠI HỌC THỦY LỢI</h2>
          <p className="mb-1">Địa chỉ: 175 Tây Sơn, Đống Đa, Hà Nội</p>
          <p className="mb-1">Điện thoại: (024) 38522001 - Fax: (024) 35633351</p>
          <p className="mb-0">Email: phonghcth@tlu.edu.vn</p>
        </div>
      </footer>

      <AddTransactionModal
        show={showModal}
        onClose={() => {
          setShowModal(false)
          setEditItem(null)
        }}
        onSubmit={editItem ? handleUpdateTransaction : handleAddTransaction}
        initialData={editItem}
        mode={editItem ? 'edit' : 'add'}
      />

      <ViewTransactionModal
        show={Boolean(viewItem)}
        transaction={viewItem}
        onClose={() => setViewItem(null)}
      />
    </div>
  )
}

export default App
