import { useEffect, useState } from "react";

const defaultForm = {
  customerName: "",
  phone: "",
  address: "",
  items: "",
  quantity: 1,
  price: 10000,
  status: "",
  orderDate: "",
};

function OrderForm({
  addOrder,
  updateOrder,
  editingOrder,
  cancelEdit,
  showToast,
}) {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingOrder) {
      setForm(editingOrder);
      setErrors({});
    } else {
      setForm(defaultForm);
      setErrors({});
    }
  }, [editingOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "price" ? Number(value || 0) : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (
      !form.customerName.trim() ||
      form.customerName.trim().length < 2 ||
      form.customerName.trim().length > 100
    ) {
      newErrors.customerName = "Tên KH phải từ 2 - 100 ký tự";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "SĐT phải đủ 10 số";
    }

    if (!form.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống";
    }

    if (!form.items.trim()) {
      newErrors.items = "Sản phẩm không được để trống";
    }

    if (form.quantity <= 0) {
      newErrors.quantity = "Số lượng phải lớn hơn 0";
    }

    if (form.price < 10000 || form.price > 100000000) {
      newErrors.price = "Giá từ 10 nghìn đến 100 triệu";
    }

    if (!form.status) {
      newErrors.status = "Trạng thái là bắt buộc";
    }

    if (!form.orderDate) {
      newErrors.orderDate = "Ngày giao là bắt buộc";
    } else if (form.orderDate > today) {
      newErrors.orderDate = "Ngày giao không vượt quá ngày hiện tại";
    }

    return newErrors;
  };

  const resetForm = () => {
    setForm(defaultForm);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showToast("LỖI: Thông tin không hợp lệ!", "error");
      return;
    }

    if (editingOrder) {
      updateOrder(form);
    } else {
      addOrder({
        ...form,
        id: Date.now(),
      });
      resetForm();
    }
  };

  return (
    <section className="card">
      <h2>OrderForm</h2>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label>Tên khách hàng</label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
          />
          {errors.customerName && (
            <small className="error">{errors.customerName}</small>
          )}
        </div>

        <div className="form-group">
          <label>SĐT</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="0901234567"
          />
          {errors.phone && <small className="error">{errors.phone}</small>}
        </div>

        <div className="form-group">
          <label>Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="123 ABC, HN"
          />
          {errors.address && <small className="error">{errors.address}</small>}
        </div>

        <div className="form-group">
          <label>Sản phẩm</label>
          <input
            type="text"
            name="items"
            value={form.items}
            onChange={handleChange}
            placeholder="iPhone 15 | Laptop Dell"
          />
          {errors.items && <small className="error">{errors.items}</small>}
        </div>

        <div className="form-group">
          <label>Số lượng</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            min="1"
          />
          {errors.quantity && <small className="error">{errors.quantity}</small>}
        </div>

        <div className="form-group">
          <label>Giá (VNĐ)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="10000"
          />
          {errors.price && <small className="error">{errors.price}</small>}
        </div>

        <div className="form-group">
          <label>Trạng thái</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="">Chọn trạng thái</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
          {errors.status && <small className="error">{errors.status}</small>}
        </div>

        <div className="form-group">
          <label>Ngày đặt</label>
          <input
            type="date"
            name="orderDate"
            value={form.orderDate}
            onChange={handleChange}
          />
          {errors.orderDate && (
            <small className="error">{errors.orderDate}</small>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingOrder ? "Cập nhật đơn hàng" : "Lưu đơn hàng"}
          </button>

          {editingOrder ? (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelEdit}
            >
              Hủy sửa
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Reset form
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default OrderForm;