import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addBooking,
  getBookingById,
  updateBooking,
} from "../utils/bookingStorage";
import { validateBooking } from "../utils/validation";

const initialForm = {
  bookingId: "",
  customerName: "",
  phone: "",
  roomType: "",
  checkIn: "",
  checkOut: "",
  adults: 1,
  children: 0,
  promoCode: "",
  confirmPromo: "",
};

export default function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const booking = getBookingById(id);
      if (booking) {
        setForm(booking);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateBooking(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Vui lòng kiểm tra lại thông tin!");
      return;
    }

    if (id) {
      const updatedBooking = {
        ...form,
        id,
      };
      updateBooking(id, updatedBooking);
      toast.success("Cập nhật đặt phòng thành công!");
      setTimeout(() => navigate("/bookings"), 2000);
    } else {
      const newBooking = {
        ...form,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: "Booked",
      };

      addBooking(newBooking);
      toast.success(`Đặt phòng ${form.bookingId} thành công!`);
      setTimeout(() => navigate("/bookings"), 2000);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Quản lý Đặt phòng Khách sạn</h1>
        <div>
          <Link to="/add-booking" className="btn primary">
            Thêm đặt phòng
          </Link>
          <Link to="/bookings" className="btn">
            Quản lý đặt phòng
          </Link>
        </div>
      </div>

      <div className="card">
        <h2>Thêm / Cập nhật đặt phòng</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Thông tin cơ bản</legend>

            <div className="grid grid-4">
              <div>
                <label>Mã đặt phòng</label>
                <input
                  type="text"
                  name="bookingId"
                  value={form.bookingId}
                  onChange={handleChange}
                  placeholder="PH123456"
                />
                <small className="hint">PH + 6 chữ số</small>
                <small className="error">{errors.bookingId}</small>
              </div>

              <div>
                <label>Họ tên khách</label>
                <input
                  type="text"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  placeholder="Nguyen Van A"
                />
                <small className="hint">
                  2-50 ký tự, chỉ chữ/số/khoảng trắng
                </small>
                <small className="error">{errors.customerName}</small>
              </div>

              <div>
                <label>Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0xxxxxxxxx"
                />
                <small className="hint">10 số, bắt đầu 0</small>
                <small className="error">{errors.phone}</small>
              </div>

              <div>
                <label>Loại phòng</label>
                <select
                  name="roomType"
                  value={form.roomType}
                  onChange={handleChange}
                >
                  <option value="">Chọn loại phòng</option>
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                  <option value="VIP">VIP</option>
                </select>
                <small className="error">{errors.roomType}</small>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Thời gian</legend>

            <div className="grid grid-4">
              <div>
                <label>Ngày nhận phòng</label>
                <input
                  type="date"
                  name="checkIn"
                  value={form.checkIn}
                  onChange={handleChange}
                />
                <small className="error">{errors.checkIn}</small>
              </div>

              <div>
                <label>Ngày trả phòng</label>
                <input
                  type="date"
                  name="checkOut"
                  value={form.checkOut}
                  onChange={handleChange}
                />
                <small className="hint">
                  Ít nhất 1 ngày sau check-in, không quá 30 ngày
                </small>
                <small className="error">{errors.checkOut}</small>
              </div>

              <div>
                <label>Số người lớn</label>
                <input
                  type="number"
                  name="adults"
                  value={form.adults}
                  onChange={handleChange}
                  min="1"
                  max="4"
                />
                <small className="error">{errors.adults}</small>
              </div>

              <div>
                <label>Số trẻ em</label>
                <input
                  type="number"
                  name="children"
                  value={form.children}
                  onChange={handleChange}
                  min="0"
                  max="6"
                />
                <small className="error">{errors.children}</small>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Khuyến mãi</legend>

            <div className="grid grid-2">
              <div>
                <label>Mã khuyến mãi</label>
                <input
                  type="text"
                  name="promoCode"
                  value={form.promoCode}
                  onChange={handleChange}
                  placeholder="SAVE20%"
                />
                <small className="hint">8 ký tự, format SAVE20%</small>
                <small className="error">{errors.promoCode}</small>
              </div>

              <div>
                <label>Xác nhận mã</label>
                <input
                  type="text"
                  name="confirmPromo"
                  value={form.confirmPromo}
                  onChange={handleChange}
                  placeholder="Nhập lại mã"
                />
                <small className="error">{errors.confirmPromo}</small>
              </div>
            </div>
          </fieldset>

          <div className="actions">
            <button type="submit" className="btn primary">
              {id ? "Cập nhật" : "Lưu đặt phòng"}
            </button>
            <button type="button" className="btn" onClick={handleReset}>
              Làm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}