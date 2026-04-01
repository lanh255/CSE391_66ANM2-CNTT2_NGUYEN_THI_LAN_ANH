export default function EmployeeItem({ employee, onDeleteEmployee }) {
  return (
    <tr>
      <td>{employee.id}</td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.address}</td>
      <td>{employee.phone}</td>
      <td>
        <button className="delete-btn" onClick={() => onDeleteEmployee(employee.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
