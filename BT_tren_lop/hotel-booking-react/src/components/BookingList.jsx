import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cancelBooking, getBookings } from "../utils/bookingStorage";

const roomPrices = {
  Standard: 1000000,
  Deluxe: 1500000,
  Suite: 2500000,
  VIP: 4000000,
};

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const loadData = () => {
    setBookings(getBookings());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCancel = (id) => {
    const confirm = window.confirm("Bạn có chắc muốn hủy đặt phòng này không?");
    if (!confirm) return;

    cancelBooking(id);
    loadData();
    toast.success("Hủy đặt phòng thành công!");
  };

  const handleEdit = (id) => {
    navigate(`/edit-booking/${id}`);
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((item) =>
      item.bookingId.toLowerCase().includes(keyword.toLowerCase()) ||
      item.customerName.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [bookings, keyword]);

  const totalBookings = bookings.length;

  const availableRooms = 100 - bookings.filter((b) => b.status !== "Cancelled").length;

  const expectedRevenue = bookings
    .filter((b) => b.status !== "Cancelled")
    .reduce((sum, booking) => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
      return sum + days * (roomPrices[booking.roomType] || 0);
    }, 0);

  return (
    <div className="container">
      <div className="header">
        <h1>Quản lý Đặt phòng Khách sạn</h1>
        <div>
          <Link to="/add-booking" className="btn primary">Thêm đặt phòng</Link>
          <Link to="/bookings" className="btn">Quản lý đặt phòng</Link>
        </div>
      </div>

      <div className="card">
        <h2>Danh sách đặt phòng</h2>

        <div className="toolbar">
          <input
            type="text"
            placeholder="Tìm mã đặt phòng hoặc tên khách"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn" onClick={loadData}>Tải lại</button>
        </div>

        <div className="stats">
          <div className="stat-box">
            <strong>{totalBookings}</strong>
            <p>Tổng booking</p>
          </div>
          <div className="stat-box">
            <strong>{availableRooms}</strong>
            <p>Phòng trống (ước tính)</p>
          </div>
          <div className="stat-box">
            <strong>{expectedRevenue.toLocaleString("vi-VN")} VNĐ</strong>
            <p>Doanh thu dự kiến</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Mã</th>
              <th>Khách</th>
              <th>Phone</th>
              <th>Loại</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Người lớn/Trẻ em</th>
              <th>Promo</th>
              <th>Trạng thái</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((item) => (
                <tr key={item.id}>
                  <td>{item.bookingId}</td>
                  <td>{item.customerName}</td>
                  <td>{item.phone}</td>
                  <td>{item.roomType}</td>
                  <td>{item.checkIn}</td>
                  <td>{item.checkOut}</td>
                  <td>{item.adults}/{item.children}</td>
                  <td>{item.promoCode}</td>
                  <td>
                    <span className={item.status === "Cancelled" ? "badge cancelled" : "badge booked"}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn small primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      Sửa
                    </button>

                    {item.status === "Cancelled" ? (
                      <button className="btn small danger" disabled>
                        Đã hủy
                      </button>
                    ) : (
                      <button
                        className="btn small danger"
                        onClick={() => handleCancel(item.id)}
                      >
                        Hủy
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}