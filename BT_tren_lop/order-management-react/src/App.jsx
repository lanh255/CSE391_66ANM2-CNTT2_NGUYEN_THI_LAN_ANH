import { useEffect, useMemo, useState } from "react";
import OrderForm from "./components/OrderForm";
import FilterBar from "./components/FilterBar";
import OrderList from "./components/OrderList";
import StatisticsCard from "./components/StatisticsCard";
import ToastContainer from "./components/ToastContainer";
import sampleOrders from "./data";

function App() {
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    fromDate: "",
    toDate: "",
    search: "",
  });
  const [toast, setToast] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
  const savedOrders = localStorage.getItem("orders");

  if (savedOrders && JSON.parse(savedOrders).length > 0) {
    setOrders(JSON.parse(savedOrders));
  } else {
    setOrders(sampleOrders);
  }
}, []);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (!toast.message) return;
    const timer = setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const addOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    showToast("THÊM: Thêm đơn hàng thành công!", "success");
  };

  const updateOrder = (updatedOrder) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
    );
    setEditingId(null);
    showToast("SỬA: Cập nhật đơn hàng thành công!", "success");
  };

  const deleteOrder = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa đơn hàng này?");
    if (!confirmDelete) return;

    setOrders((prev) => prev.filter((order) => order.id !== id));
    if (editingId === id) setEditingId(null);
    showToast("XÓA: Xóa đơn hàng thành công!", "success");
  };

  const startEdit = (id) => {
    setEditingId(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const clearFilters = () => {
    setFilters({
      status: "all",
      fromDate: "",
      toDate: "",
      search: "",
    });
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchStatus =
        filters.status === "all" || order.status === filters.status;

      const keyword = filters.search.trim().toLowerCase();
      const matchSearch =
        order.customerName.toLowerCase().includes(keyword) ||
        order.phone.toLowerCase().includes(keyword) ||
        order.address.toLowerCase().includes(keyword);

      const matchFromDate =
        !filters.fromDate || order.orderDate >= filters.fromDate;

      const matchToDate = !filters.toDate || order.orderDate <= filters.toDate;

      return matchStatus && matchSearch && matchFromDate && matchToDate;
    });
  }, [orders, filters]);

  const editingOrder = useMemo(() => {
    return orders.find((order) => order.id === editingId) || null;
  }, [orders, editingId]);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div>
            <h1>Quản lý Đơn hàng E-commerce (React-like)</h1>
            <p>Ứng dụng quản lý đơn hàng với React-like framework</p>
          </div>
        </header>

        <OrderForm
          addOrder={addOrder}
          updateOrder={updateOrder}
          editingOrder={editingOrder}
          cancelEdit={cancelEdit}
          showToast={showToast}
        />

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
        />

        <StatisticsCard orders={filteredOrders} />

        <OrderList
          orders={filteredOrders}
          onEdit={startEdit}
          onDelete={deleteOrder}
        />
      </div>

      <ToastContainer toast={toast} />
    </div>
  );
}

export default App;