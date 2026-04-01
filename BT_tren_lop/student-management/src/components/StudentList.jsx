import StudentItem from './StudentItem'

function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-light">
        <h3 className="mb-0">Student Management</h3>
      </div>

      <div className="card-body">
        {students.length === 0 ? (
          <p className="text-center text-muted">Chưa có sinh viên nào</p>
        ) : (
          <>
            {students.map((student) => (
              <StudentItem
                key={student.id}
                student={student}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            <p className="text-center text-muted mt-4 mb-0">
              Showing 1 to {students.length} of {students.length} entries
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default StudentList