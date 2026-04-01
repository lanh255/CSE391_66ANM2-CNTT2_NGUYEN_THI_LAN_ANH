function StudentItem({ student, onEdit, onDelete }) {
  return (
    <div className="border-bottom py-3">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h5 className="mb-2 fw-bold">{student.fullName}</h5>
          <p className="mb-1 text-muted">
            Mã SV: {student.studentId} | Email: {student.email} | SĐT: {student.phone}
          </p>
          <p className="mb-0">
            Ngành: {student.major} | Giới tính: {student.gender}
          </p>
        </div>

        <div>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => onEdit(student)}
          >
            Sửa
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(student.id)}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentItem