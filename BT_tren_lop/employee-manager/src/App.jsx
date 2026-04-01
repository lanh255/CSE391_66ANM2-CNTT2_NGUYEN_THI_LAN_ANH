import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeModal from "./components/EmployeeModal";
import employeesData from "./data/data";

const ITEMS_PER_PAGE = 5;

function App() {
  const [employees, setEmployees] = useState(employeesData);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(3);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const filteredEmployees = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    if (!keyword) return employees;

    return employees.filter((employee) =>
      [employee.name, employee.email, employee.address, employee.phone]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [employees, searchKeyword]);

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedEmployees = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEmployees, safeCurrentPage]);

  const handleSearch = () => {
    setSearchKeyword(searchInput);
    setCurrentPage(1);
  };

  const handleAddEmployee = (employee) => {
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((item) =>
          item.id === editingEmployee.id ? { ...item, ...employee } : item
        )
      );
      setEditingEmployee(null);
    } else {
      const newEmployee = {
        id: employees.length ? Math.max(...employees.map((item) => item.id)) + 1 : 1,
        ...employee,
      };
      setEmployees((prev) => [newEmployee, ...prev]);
    }

    setIsOpenModal(false);
  };

  const handleDeleteOne = (id) => {
    setEmployees((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      alert("Vui lòng chọn nhân viên cần xóa");
      return;
    }

    setEmployees((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsOpenModal(true);
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAllOnPage = () => {
    const pageIds = paginatedEmployees.map((item) => item.id);
    const isAllSelected = pageIds.every((id) => selectedIds.includes(id));

    if (isAllSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="page-bg">
      <div className="app-shell">
        <Navbar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={handleSearch}
        />

        <div className="content-area">
          <EmployeeTable
            employees={paginatedEmployees}
            totalCount={filteredEmployees.length}
            currentPage={safeCurrentPage}
            pageNumbers={pageNumbers}
            selectedIds={selectedIds}
            onOpenModal={() => {
              setEditingEmployee(null);
              setIsOpenModal(true);
            }}
            onDeleteSelected={handleDeleteSelected}
            onDeleteOne={handleDeleteOne}
            onEdit={handleEdit}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAllOnPage={handleToggleSelectAllOnPage}
            onChangePage={setCurrentPage}
          />
        </div>

        {isOpenModal && (
          <EmployeeModal
            onClose={() => {
              setIsOpenModal(false);
              setEditingEmployee(null);
            }}
            onAdd={handleAddEmployee}
            editingEmployee={editingEmployee}
          />
        )}
      </div>
    </div>
  );
}

export default App;
