const employees = [...employeesData];

const employeeForm = document.getElementById("employeeForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");
const phoneInput = document.getElementById("phone");
const tableBody = document.getElementById("employeeTableBody");
const messageBox = document.getElementById("messageBox");
const cancelBtn = document.getElementById("cancelBtn");
const resetTopBtn = document.getElementById("resetTopBtn");

function showError(fieldId, text) {
  document.getElementById(fieldId).textContent = text;
}

function clearErrors() {
  showError("nameError", "");
  showError("emailError", "");
  showError("addressError", "");
  showError("phoneError", "");
}

function resetForm() {
  employeeForm.reset();
  clearErrors();
  messageBox.textContent = "";
  messageBox.className = "message";
}

function validateForm() {
  clearErrors();
  let isValid = true;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const address = addressInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name) {
    showError("nameError", "Name không được để trống.");
    isValid = false;
  }

  if (!email) {
    showError("emailError", "Email không được để trống.");
    isValid = false;
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError("emailError", "Email không đúng định dạng.");
      isValid = false;
    }
  }

  if (!address) {
    showError("addressError", "Address không được để trống.");
    isValid = false;
  }

  if (!phone) {
    showError("phoneError", "Phone không được để trống.");
    isValid = false;
  } else if (!/^0\d{9}$/.test(phone)) {
    showError("phoneError", "Phone phải gồm 10 chữ số và bắt đầu bằng 0.");
    isValid = false;
  }

  return isValid;
}

function renderEmployees() {
  tableBody.innerHTML = "";

  employees.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.id}</td>
      <td>${employee.name}</td>
      <td>${employee.email}</td>
      <td>${employee.address}</td>
      <td>${employee.phone}</td>
      <td><button class="delete-btn" data-id="${employee.id}">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

employeeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateForm()) {
    messageBox.textContent = "Thêm nhân viên thất bại. Vui lòng kiểm tra lại dữ liệu nhập.";
    messageBox.className = "message fail";
    return;
  }

  const newEmployee = {
    id: employees.length ? employees[employees.length - 1].id + 1 : 1,
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    address: addressInput.value.trim(),
    phone: phoneInput.value.trim()
  };

  employees.push(newEmployee);
  renderEmployees();
  resetForm();
  messageBox.textContent = "Thêm nhân viên thành công.";
  messageBox.className = "message success";
});

tableBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const id = Number(event.target.dataset.id);
    const index = employees.findIndex((employee) => employee.id === id);

    if (index !== -1) {
      employees.splice(index, 1);
      renderEmployees();
      messageBox.textContent = "Xóa nhân viên thành công.";
      messageBox.className = "message success";
    }
  }
});

cancelBtn.addEventListener("click", resetForm);
resetTopBtn.addEventListener("click", resetForm);

renderEmployees();
