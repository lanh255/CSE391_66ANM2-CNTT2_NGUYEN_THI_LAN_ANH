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

const nameCount = document.getElementById("nameCount");
const togglePassword = document.getElementById("togglePassword");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const soDienThoaiRegex = /^0[0-9]{9}$/;
const matKhauRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const chiChuRegex = /^[a-zA-ZÀ-ỹ\s]+$/;

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

  if (value.length > 50) {
    showError(hoTen, hoTenError, "Họ tên không được vượt quá 50 ký tự");
    return false;
  }

  showSuccess(hoTen, hoTenError);
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

function validateSoDienThoai() {
  const value = soDienThoai.value.trim();

  if (value === "") {
    showError(soDienThoai, soDienThoaiError, "Số điện thoại không được để trống");
    return false;
  }

  if (!soDienThoaiRegex.test(value)) {
    showError(soDienThoai, soDienThoaiError, "Số điện thoại phải gồm 10 số và bắt đầu bằng 0");
    return false;
  }

  showSuccess(soDienThoai, soDienThoaiError);
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

function validateGioiTinh() {
  if (gioiTinh.value === "") {
    showError(gioiTinh, gioiTinhError, "Vui lòng chọn giới tính");
    return false;
  }

  showSuccess(gioiTinh, gioiTinhError);
  return true;
}

function updateNameCount() {
  nameCount.textContent = `${hoTen.value.length}/50`;
}

function updatePasswordStrength() {
  const value = matKhau.value;
  let score = 0;

  if (value.length >= 8) score++;
  if (/[a-z]/.test(value)) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  if (value.length === 0) {
    strengthBar.style.width = "0%";
    strengthBar.style.background = "transparent";
    strengthText.textContent = "Chưa nhập mật khẩu";
    return;
  }

  if (score <= 2) {
    strengthBar.style.width = "33%";
    strengthBar.style.background = "red";
    strengthText.textContent = "Yếu";
  } else if (score <= 4) {
    strengthBar.style.width = "66%";
    strengthBar.style.background = "orange";
    strengthText.textContent = "Trung bình";
  } else {
    strengthBar.style.width = "100%";
    strengthBar.style.background = "green";
    strengthText.textContent = "Mạnh";
  }
}

togglePassword.addEventListener("click", function () {
  if (matKhau.type === "password") {
    matKhau.type = "text";
  } else {
    matKhau.type = "password";
  }
});

hoTen.addEventListener("blur", validateHoTen);
email.addEventListener("blur", validateEmail);
soDienThoai.addEventListener("blur", validateSoDienThoai);
matKhau.addEventListener("blur", validateMatKhau);
gioiTinh.addEventListener("change", validateGioiTinh);

hoTen.addEventListener("input", function () {
  clearError(hoTen, hoTenError);
  updateNameCount();
});

email.addEventListener("input", function () {
  clearError(email, emailError);
});

soDienThoai.addEventListener("input", function () {
  clearError(soDienThoai, soDienThoaiError);
});

matKhau.addEventListener("input", function () {
  clearError(matKhau, matKhauError);
  updatePasswordStrength();
});

gioiTinh.addEventListener("change", function () {
  clearError(gioiTinh, gioiTinhError);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isValid =
    validateHoTen() &&
    validateEmail() &&
    validateSoDienThoai() &&
    validateMatKhau() &&
    validateGioiTinh();

  if (isValid) {
    alert("Đăng ký thành công!");
    form.reset();
    updateNameCount();
    updatePasswordStrength();

    [hoTen, email, soDienThoai, matKhau, gioiTinh].forEach((el) => {
      el.classList.remove("success-border");
      el.classList.remove("error-border");
    });

    [hoTenError, emailError, soDienThoaiError, matKhauError, gioiTinhError].forEach((el) => {
      el.textContent = "";
    });
  }
});

updateNameCount();
updatePasswordStrength();