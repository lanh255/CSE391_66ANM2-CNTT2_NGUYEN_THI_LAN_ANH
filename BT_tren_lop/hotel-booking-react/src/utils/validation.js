export const validateBooking = (form) => {
  const errors = {};

  const bookingRegex = /^PH\d{6}$/;
  const nameRegex = /^[A-Za-zÀ-ỹ0-9\s]{2,50}$/u;
  const phoneRegex = /^0\d{9}$/;
  const promoRegex = /^SAVE20%$/;

  if (!bookingRegex.test(form.bookingId)) {
    errors.bookingId = "Mã đặt phòng phải có dạng PH123456";
  }

  if (!nameRegex.test(form.customerName)) {
    errors.customerName = "Họ tên 2-50 ký tự, chỉ chữ/số/khoảng trắng";
  }

  if (!phoneRegex.test(form.phone)) {
    errors.phone = "Số điện thoại phải 10 số và bắt đầu bằng 0";
  }

  if (!form.roomType) {
    errors.roomType = "Vui lòng chọn loại phòng";
  }

  if (!form.checkIn) {
    errors.checkIn = "Vui lòng chọn ngày nhận phòng";
  }

  if (!form.checkOut) {
    errors.checkOut = "Vui lòng chọn ngày trả phòng";
  }

  if (form.checkIn && form.checkOut) {
    const checkInDate = new Date(form.checkIn);
    const checkOutDate = new Date(form.checkOut);
    const diffTime = checkOutDate - checkInDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < 1) {
      errors.checkOut = "Ngày trả phòng phải sau ngày nhận ít nhất 1 ngày";
    }

    if (diffDays > 30) {
      errors.checkOut = "Số ngày ở không được quá 30 ngày";
    }
  }

  const adults = Number(form.adults);
  const children = Number(form.children);

  if (adults < 1 || adults > 4) {
    errors.adults = "Số người lớn từ 1 đến 4";
  }

  if (children < 0 || children > 6) {
    errors.children = "Số trẻ em từ 0 đến 6";
  }

  if (!promoRegex.test(form.promoCode)) {
    errors.promoCode = "Mã khuyến mãi phải đúng dạng SAVE20%";
  }

  if (form.confirmPromo !== form.promoCode) {
    errors.confirmPromo = "Xác nhận mã phải khớp mã khuyến mãi";
  }

  return errors;
};