const steps = document.querySelectorAll(".step");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const summaryBox = document.getElementById("summaryBox");
const form = document.getElementById("multiStepForm");

const hoTen = document.getElementById("hoTen");
const ngaySinh = document.getElementById("ngaySinh");
const gioiTinh = document.getElementById("gioiTinh");

const email = document.getElementById("email");
const matKhau = document.getElementById("matKhau");
const xacNhanMatKhau = document.getElementById("xacNhanMatKhau");

const hoTenError = document.getElementById("hoTenError");
const ngaySinhError = document.getElementById("ngaySinhError");
const gioiTinhError = document.getElementById("gioiTinhError");

const emailError = document.getElementById("emailError");
const matKhauError = document.getElementById("matKhauError");
const xacNhanMatKhauError = document.getElementById("xacNhanMatKhauError");

const next1 = document.getElementById("next1");
const next2 = document.getElementById("next2");
const back1 = document.getElementById("back1");
const back2 = document.getElementById("back2");

let currentStep = 1;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const matKhauRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const chiChuRegex = /^[a-zA-ZÀ-ỹ\s]+$/;

function showStep(stepNumber) {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index + 1 === stepNumber);
  });

  currentStep = stepNumber;
  progressFill.style.width = `${(stepNumber / 3) * 100}%`;
  progressText.textContent = `Bước ${stepNumber} / 3`;

  if (stepNumber === 3) {
    renderSummary();
  }
}

function showError(input, errorEl, message) {
  errorEl.textContent = message;
  input.classList.add("error-border");
  input.classList.remove("success-border");
}

function showSuccess(input, errorEl) {
  errorEl.textContent = "";
  input.classList.remove("error-border");
  input.classList.add("success-border");
}

function clearError(input, errorEl) {
  errorEl.textContent = "";
  input.classList.remove("error-border");
}

function validateHoTen() {
  const value = hoTen.value.trim();

  if (value === "") {
    showError(hoTen, hoTenError, "Họ tên không được để trống");
    return false;
  }

  if (!chiChuRegex.test(value)) {
    showError(hoTen, hoTenError, "Họ tên chỉ được chứa chữ và khoảng trắng");
    return false;
  }

  showSuccess(hoTen, hoTenError);
  return true;
}

function validateNgaySinh() {
  const value = ngaySinh.value;

  if (value === "") {
    showError(ngaySinh, ngaySinhError, "Vui lòng chọn ngày sinh");
    return false;
  }

  const selectedDate = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate >= today) {
    showError(ngaySinh, ngaySinhError, "Ngày sinh phải nhỏ hơn ngày hiện tại");
    return false;
  }

  showSuccess(ngaySinh, ngaySinhError);
  return true;
}

function validateGioiTinh() {
  if (gioiTinh.value === "") {
    showError(gioiTinh, gioiTinhError, "Vui lòng chọn giới tính");
    return false;
  }

  showSuccess(gioiTinh, gioiTinhError);
  return true;
}

function validateEmail() {
  const value = email.value.trim();

  if (value === "") {
    showError(email, emailError, "Email không được để trống");
    return false;
  }

  if (!emailRegex.test(value)) {
    showError(email, emailError, "Email không đúng định dạng");
    return false;
  }

  showSuccess(email, emailError);
  return true;
}

function validateMatKhau() {
  const value = matKhau.value.trim();

  if (value === "") {
    showError(matKhau, matKhauError, "Mật khẩu không được để trống");
    return false;
  }

  if (!matKhauRegex.test(value)) {
    showError(matKhau, matKhauError, "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ thường, chữ hoa và số");
    return false;
  }

  showSuccess(matKhau, matKhauError);
  return true;
}

function validateXacNhanMatKhau() {
  const value = xacNhanMatKhau.value.trim();

  if (value === "") {
    showError(xacNhanMatKhau, xacNhanMatKhauError, "Vui lòng xác nhận mật khẩu");
    return false;
  }

  if (value !== matKhau.value.trim()) {
    showError(xacNhanMatKhau, xacNhanMatKhauError, "Mật khẩu xác nhận không khớp");
    return false;
  }

  showSuccess(xacNhanMatKhau, xacNhanMatKhauError);
  return true;
}

function validateStep1() {
  const a = validateHoTen();
  const b = validateNgaySinh();
  const c = validateGioiTinh();
  return a && b && c;
}

function validateStep2() {
  const a = validateEmail();
  const b = validateMatKhau();
  const c = validateXacNhanMatKhau();
  return a && b && c;
}

function renderSummary() {
  summaryBox.innerHTML = `
    <p><strong>Họ tên:</strong> ${hoTen.value}</p>
    <p><strong>Ngày sinh:</strong> ${ngaySinh.value}</p>
    <p><strong>Giới tính:</strong> ${gioiTinh.value}</p>
    <p><strong>Email:</strong> ${email.value}</p>
    <p><strong>Mật khẩu:</strong> ${"*".repeat(matKhau.value.length)}</p>
  `;
}

next1.addEventListener("click", function () {
  if (validateStep1()) {
    showStep(2);
  }
});

next2.addEventListener("click", function () {
  if (validateStep2()) {
    showStep(3);
  }
});

back1.addEventListener("click", function () {
  showStep(1);
});

back2.addEventListener("click", function () {
  showStep(2);
});

hoTen.addEventListener("blur", validateHoTen);
ngaySinh.addEventListener("blur", validateNgaySinh);
gioiTinh.addEventListener("change", validateGioiTinh);

email.addEventListener("blur", validateEmail);
matKhau.addEventListener("blur", validateMatKhau);
xacNhanMatKhau.addEventListener("blur", validateXacNhanMatKhau);

hoTen.addEventListener("input", function () {
  clearError(hoTen, hoTenError);
});
ngaySinh.addEventListener("input", function () {
  clearError(ngaySinh, ngaySinhError);
});
gioiTinh.addEventListener("change", function () {
  clearError(gioiTinh, gioiTinhError);
});

email.addEventListener("input", function () {
  clearError(email, emailError);
});
matKhau.addEventListener("input", function () {
  clearError(matKhau, matKhauError);
});
xacNhanMatKhau.addEventListener("input", function () {
  clearError(xacNhanMatKhau, xacNhanMatKhauError);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateStep1() && validateStep2()) {
    alert("Đăng ký thành công!");
    form.reset();
    showStep(1);

    [
      hoTen,
      ngaySinh,
      gioiTinh,
      email,
      matKhau,
      xacNhanMatKhau
    ].forEach((el) => {
      el.classList.remove("success-border");
      el.classList.remove("error-border");
    });

    [
      hoTenError,
      ngaySinhError,
      gioiTinhError,
      emailError,
      matKhauError,
      xacNhanMatKhauError
    ].forEach((el) => {
      el.textContent = "";
    });

    summaryBox.innerHTML = "";
  }
});

showStep(1);