import { useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import employeesData from './data';

export default function App() {
  const [employees, setEmployees] = useState(employeesData);

  const handleAddEmployee = (employee) => {
    const newEmployee = {
      id: employees.length ? employees[employees.length - 1].id + 1 : 1,
      ...employee
    };

    setEmployees((prev) => [...prev, newEmployee]);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
  };

  return (
    <div className="page-layout">
      <EmployeeForm onAddEmployee={handleAddEmployee} />
      <EmployeeList employees={employees} onDeleteEmployee={handleDeleteEmployee} />
    </div>
  );
}
