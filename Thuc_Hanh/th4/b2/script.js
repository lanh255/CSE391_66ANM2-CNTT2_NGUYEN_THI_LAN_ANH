const form = document.getElementById("registerForm");

const hoTen = document.getElementById("hoTen");
const email = document.getElementById("email");
const soDienThoai = document.getElementById("soDienThoai");
const matKhau = document.getElementById("matKhau");
const gioiTinh = document.getElementById("gioiTinh");

const hoTenError = document.getElementById("hoTenError");
const emailError = document.getElementById("emailError");
const soDienThoaiError = document.getElementById("soDienThoaiError");
const matKhauError = document.getElementById("matKhauError");
const gioiTinhError = document.getElementById("gioiTinhError");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const soDienThoaiRegex = /^0[0-9]{9}$/;
const matKhauRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const chiChuRegex = /^[a-zA-ZÀ-ỹ\s]+$/;

function hienThiLoi(inputElement, errorElement, message) {
  errorElement.textContent = message;
  inputElement.classList.add("error-border");
  inputElement.classList.remove("success-border");
}

function hienThiHopLe(inputElement, errorElement) {
  errorElement.textContent = "";
  inputElement.classList.remove("error-border");
  inputElement.classList.add("success-border");
}

function xoaLoi(inputElement, errorElement) {
  errorElement.textContent = "";
  inputElement.classList.remove("error-border");
}

function validateHoTen() {
  const value = hoTen.value.trim();

  if (value === "") {
    hienThiLoi(hoTen, hoTenError, "Họ tên không được để trống");
    return false;
  }

  if (!chiChuRegex.test(value)) {
    hienThiLoi(hoTen, hoTenError, "Họ tên chỉ được chứa chữ cái và khoảng trắng");
    return false;
  }

  hienThiHopLe(hoTen, hoTenError);
  return true;
}

function validateEmail() {
  const value = email.value.trim();

  if (value === "") {
    hienThiLoi(email, emailError, "Email không được để trống");
    return false;
  }

  if (!emailRegex.test(value)) {
    hienThiLoi(email, emailError, "Email không đúng định dạng");
    return false;
  }

  hienThiHopLe(email, emailError);
  return true;
}

function validateSoDienThoai() {
  const value = soDienThoai.value.trim();

  if (value === "") {
    hienThiLoi(soDienThoai, soDienThoaiError, "Số điện thoại không được để trống");
    return false;
  }

  if (!soDienThoaiRegex.test(value)) {
    hienThiLoi(soDienThoai, soDienThoaiError, "Số điện thoại phải gồm 10 số và bắt đầu bằng 0");
    return false;
  }

  hienThiHopLe(soDienThoai, soDienThoaiError);
  return true;
}

function validateMatKhau() {
  const value = matKhau.value.trim();

  if (value === "") {
    hienThiLoi(matKhau, matKhauError, "Mật khẩu không được để trống");
    return false;
  }

  if (!matKhauRegex.test(value)) {
    hienThiLoi(
      matKhau,
      matKhauError,
      "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ thường, chữ hoa và số"
    );
    return false;
  }

  hienThiHopLe(matKhau, matKhauError);
  return true;
}

function validateGioiTinh() {
  const value = gioiTinh.value;

  if (value === "") {
    hienThiLoi(gioiTinh, gioiTinhError, "Vui lòng chọn giới tính");
    return false;
  }

  hienThiHopLe(gioiTinh, gioiTinhError);
  return true;
}

hoTen.addEventListener("blur", validateHoTen);
email.addEventListener("blur", validateEmail);
soDienThoai.addEventListener("blur", validateSoDienThoai);
matKhau.addEventListener("blur", validateMatKhau);
gioiTinh.addEventListener("change", validateGioiTinh);

hoTen.addEventListener("input", function () {
  xoaLoi(hoTen, hoTenError);
});
email.addEventListener("input", function () {
  xoaLoi(email, emailError);
});
soDienThoai.addEventListener("input", function () {
  xoaLoi(soDienThoai, soDienThoaiError);
});
matKhau.addEventListener("input", function () {
  xoaLoi(matKhau, matKhauError);
});
gioiTinh.addEventListener("change", function () {
  xoaLoi(gioiTinh, gioiTinhError);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isHoTenValid = validateHoTen();
  const isEmailValid = validateEmail();
  const isSoDienThoaiValid = validateSoDienThoai();
  const isMatKhauValid = validateMatKhau();
  const isGioiTinhValid = validateGioiTinh();

  if (
    isHoTenValid &&
    isEmailValid &&
    isSoDienThoaiValid &&
    isMatKhauValid &&
    isGioiTinhValid
  ) {
    alert("Gửi form thành công!");
    form.reset();

    hoTen.classList.remove("success-border");
    email.classList.remove("success-border");
    soDienThoai.classList.remove("success-border");
    matKhau.classList.remove("success-border");
    gioiTinh.classList.remove("success-border");
  }
});