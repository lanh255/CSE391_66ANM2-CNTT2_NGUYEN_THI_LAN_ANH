import { useState } from "react";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import employeesData from "./data/data";
import "./index.css";

function App() {
  const [danhSachNhanSu, setDanhSachNhanSu] = useState(employeesData);
  const [hienForm, setHienForm] = useState(false);

  const moForm = () => {
    setHienForm(true);
  };

  const dongForm = () => {
    setHienForm(false);
  };

  const themNhanSu = (nhanSuMoi) => {
    const newEmployee = {
      id:
        danhSachNhanSu.length > 0
          ? Math.max(...danhSachNhanSu.map((nv) => nv.id)) + 1
          : 1,
      ...nhanSuMoi,
    };

    setDanhSachNhanSu([...danhSachNhanSu, newEmployee]);
  };

  return (
    <div className="app-container">
      <Header />

      <div className="main-content">
        <EmployeeList danhSach={danhSachNhanSu} moForm={moForm} />
      </div>

      {hienForm && (
        <EmployeeForm dongForm={dongForm} themNhanSu={themNhanSu} />
      )}
    </div>
  );
}

export default App;
