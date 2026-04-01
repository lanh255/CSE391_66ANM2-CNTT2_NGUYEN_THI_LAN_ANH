function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav aria-label="Pagination">
      <ul className="pagination mb-0">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" type="button" onClick={() => onPageChange(1)}>
            «
          </button>
        </li>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" type="button" onClick={() => onPageChange(currentPage - 1)}>
            ‹
          </button>
        </li>

        {pages.map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button className="page-link" type="button" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" type="button" onClick={() => onPageChange(currentPage + 1)}>
            ›
          </button>
        </li>
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" type="button" onClick={() => onPageChange(totalPages)}>
            »
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
