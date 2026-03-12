const form = document.getElementById("orderForm");

const sanPham = document.getElementById("sanPham");
const soLuong = document.getElementById("soLuong");
const ngayGiao = document.getElementById("ngayGiao");
const diaChi = document.getElementById("diaChi");
const ghiChu = document.getElementById("ghiChu");

const sanPhamError = document.getElementById("sanPhamError");
const soLuongError = document.getElementById("soLuongError");
const ngayGiaoError = document.getElementById("ngayGiaoError");
const diaChiError = document.getElementById("diaChiError");
const ghiChuError = document.getElementById("ghiChuError");
const thanhToanError = document.getElementById("thanhToanError");

const charCount = document.getElementById("charCount");
const tongTien = document.getElementById("tongTien");

const confirmBox = document.getElementById("confirmBox");
const orderSummary = document.getElementById("orderSummary");
const btnConfirm = document.getElementById("btnConfirm");
const btnCancel = document.getElementById("btnCancel");

const prices = {
  "Áo": 150000,
  "Quần": 200000,
  "Giày": 500000
};

function showError(input, errorEl, message) {
  errorEl.textContent = message;
  if (input) {
    input.classList.add("error-border");
    input.classList.remove("success-border");
  }
}

function showSuccess(input, errorEl) {
  errorEl.textContent = "";
  if (input) {
    input.classList.remove("error-border");
    input.classList.add("success-border");
  }
}

function clearError(input, errorEl) {
  errorEl.textContent = "";
  if (input) {
    input.classList.remove("error-border");
  }
}

function getSelectedPayment() {
  return document.querySelector('input[name="thanhToan"]:checked');
}

function validateSanPham() {
  if (sanPham.value === "") {
    showError(sanPham, sanPhamError, "Vui lòng chọn sản phẩm");
    return false;
  }
  showSuccess(sanPham, sanPhamError);
  return true;
}

function validateSoLuong() {
  const value = Number(soLuong.value);

  if (soLuong.value.trim() === "") {
    showError(soLuong, soLuongError, "Số lượng không được để trống");
    return false;
  }

  if (!Number.isInteger(value) || value < 1 || value > 99) {
    showError(soLuong, soLuongError, "Số lượng phải là số nguyên từ 1 đến 99");
    return false;
  }

  showSuccess(soLuong, soLuongError);
  return true;
}

function validateNgayGiao() {
  if (ngayGiao.value === "") {
    showError(ngayGiao, ngayGiaoError, "Vui lòng chọn ngày giao hàng");
    return false;
  }

  const selectedDate = new Date(ngayGiao.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);

  if (selectedDate < today) {
    showError(ngayGiao, ngayGiaoError, "Ngày giao không được trong quá khứ");
    return false;
  }

  if (selectedDate > maxDate) {
    showError(ngayGiao, ngayGiaoError, "Ngày giao không được quá 30 ngày từ hôm nay");
    return false;
  }

  showSuccess(ngayGiao, ngayGiaoError);
  return true;
}

function validateDiaChi() {
  const value = diaChi.value.trim();

  if (value === "") {
    showError(diaChi, diaChiError, "Địa chỉ không được để trống");
    return false;
  }

  if (value.length < 10) {
    showError(diaChi, diaChiError, "Địa chỉ phải có ít nhất 10 ký tự");
    return false;
  }

  showSuccess(diaChi, diaChiError);
  return true;
}

function validateGhiChu() {
  const value = ghiChu.value.trim();

  if (value.length > 200) {
    showError(ghiChu, ghiChuError, "Ghi chú không được vượt quá 200 ký tự");
    return false;
  }

  showSuccess(ghiChu, ghiChuError);
  return true;
}

function validateThanhToan() {
  const selected = getSelectedPayment();

  if (!selected) {
    thanhToanError.textContent = "Vui lòng chọn phương thức thanh toán";
    return false;
  }

  thanhToanError.textContent = "";
  return true;
}

function updateCharCount() {
  const length = ghiChu.value.length;
  charCount.textContent = `${length}/200`;

  if (length > 200) {
    charCount.classList.add("over");
  } else {
    charCount.classList.remove("over");
  }
}

function updateTongTien() {
  const product = sanPham.value;
  const quantity = Number(soLuong.value);

  if (prices[product] && Number.isInteger(quantity) && quantity > 0) {
    const total = prices[product] * quantity;
    tongTien.textContent = `${total.toLocaleString("vi-VN")} đ`;
  } else {
    tongTien.textContent = "0 đ";
  }
}

function buildSummary() {
  const payment = getSelectedPayment();
  const total = prices[sanPham.value] * Number(soLuong.value);

  orderSummary.innerHTML = `
    <p><strong>Sản phẩm:</strong> ${sanPham.value}</p>
    <p><strong>Số lượng:</strong> ${soLuong.value}</p>
    <p><strong>Tổng tiền:</strong> ${total.toLocaleString("vi-VN")} đ</p>
    <p><strong>Ngày giao:</strong> ${ngayGiao.value}</p>
    <p><strong>Thanh toán:</strong> ${payment ? payment.value : ""}</p>
  `;
}

sanPham.addEventListener("change", function () {
  validateSanPham();
  updateTongTien();
});

soLuong.addEventListener("blur", validateSoLuong);
soLuong.addEventListener("input", function () {
  clearError(soLuong, soLuongError);
  updateTongTien();
});

ngayGiao.addEventListener("blur", validateNgayGiao);
ngayGiao.addEventListener("input", function () {
  clearError(ngayGiao, ngayGiaoError);
});

diaChi.addEventListener("blur", validateDiaChi);
diaChi.addEventListener("input", function () {
  clearError(diaChi, diaChiError);
});

ghiChu.addEventListener("blur", validateGhiChu);
ghiChu.addEventListener("input", function () {
  clearError(ghiChu, ghiChuError);
  updateCharCount();
});

sanPham.addEventListener("input", function () {
  clearError(sanPham, sanPhamError);
});

document.querySelectorAll('input[name="thanhToan"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    thanhToanError.textContent = "";
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isValid =
    validateSanPham() &&
    validateSoLuong() &&
    validateNgayGiao() &&
    validateDiaChi() &&
    validateGhiChu() &&
    validateThanhToan();

  if (isValid) {
    buildSummary();
    confirmBox.classList.remove("hidden");
  } else {
    confirmBox.classList.add("hidden");
  }
});

btnConfirm.addEventListener("click", function () {
  alert("Đặt hàng thành công!");
  form.reset();
  tongTien.textContent = "0 đ";
  charCount.textContent = "0/200";
  charCount.classList.remove("over");
  confirmBox.classList.add("hidden");

  [sanPham, soLuong, ngayGiao, diaChi, ghiChu].forEach((el) => {
    el.classList.remove("success-border");
    el.classList.remove("error-border");
  });

  [
    sanPhamError,
    soLuongError,
    ngayGiaoError,
    diaChiError,
    ghiChuError,
    thanhToanError
  ].forEach((el) => {
    el.textContent = "";
  });
});

btnCancel.addEventListener("click", function () {
  confirmBox.classList.add("hidden");
});