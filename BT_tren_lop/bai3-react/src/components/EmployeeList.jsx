import EmployeeItem from './EmployeeItem';

export default function EmployeeList({ employees, onDeleteEmployee }) {
  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Employee List</h3>
        <p>Dữ liệu khởi tạo từ file <strong>data.js</strong> và render bằng React component.</p>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <EmployeeItem
                key={employee.id}
                employee={employee}
                onDeleteEmployee={onDeleteEmployee}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
