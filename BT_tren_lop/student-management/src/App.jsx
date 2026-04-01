import { useEffect, useState } from 'react'
import StudentForm from './components/StudentForm'
import StudentList from './components/StudentList'
import studentsData from './data'

function App() {
  const [students, setStudents] = useState([])
  const [editingStudent, setEditingStudent] = useState(null)

  useEffect(() => {
    const savedStudents = localStorage.getItem('students')

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents))
    } else {
      setStudents(studentsData)
      localStorage.setItem('students', JSON.stringify(studentsData))
    }
  }, [])

  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('students', JSON.stringify(students))
    }
  }, [students])

  const handleSaveStudent = (studentData) => {
    if (editingStudent) {
      const updatedStudents = students.map((student) =>
        student.id === editingStudent.id
          ? { ...student, ...studentData, id: editingStudent.id }
          : student
      )

      setStudents(updatedStudents)
      setEditingStudent(null)
      alert('Cập nhật sinh viên thành công!')
    } else {
      const isDuplicate = students.some(
        (student) => student.studentId === studentData.studentId
      )

      if (isDuplicate) {
        alert('Mã sinh viên đã tồn tại!')
        return
      }

      const newStudent = {
        ...studentData,
        id: Date.now(),
      }

      setStudents([...students, newStudent])
      alert('Thêm sinh viên thành công!')
    }
  }

  const handleEditStudent = (student) => {
    setEditingStudent(student)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleDeleteStudent = (id) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa sinh viên này không?')

    if (!confirmDelete) return

    const updatedStudents = students.filter((student) => student.id !== id)
    setStudents(updatedStudents)
    alert('Xóa sinh viên thành công!')
  }

  const handleCancelEdit = () => {
    setEditingStudent(null)
  }

  return (
    <div className="container py-4">
      <StudentForm
        onSave={handleSaveStudent}
        editingStudent={editingStudent}
        onCancel={handleCancelEdit}
      />

      <StudentList
        students={students}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
      />
    </div>
  )
}

export default App