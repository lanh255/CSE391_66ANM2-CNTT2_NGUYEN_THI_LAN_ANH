let employees = [
  { id: 1, name: "Fatima Beatriz", email: "Fatima Beatriz@gmail.com", phone: "0985674321", position: "Staff", sex: "Female" },
  { id: 2, name: "Gabriel Hanna", email: "Gabriel Hanna@gmail.com", phone: "0353674231", position: "Staff", sex: "Male" },
  { id: 3, name: "Charles Diya", email: "Charles Diya@gmail.com", phone: "0347658833", position: "Staff", sex: "Male" },
  { id: 4, name: "Frank Lamdo", email: "Frank Lamdo@gmail.com", phone: "0975444768", position: "Manager", sex: "Male" },
  { id: 5, name: "Louis Tom", email: "Louis Tom@gmail.com", phone: "0789568223", position: "Staff", sex: "Male" },
];

const tbody = document.getElementById("tbody");
const overlay = document.getElementById("overlay");

const btnAdd = document.getElementById("btnAdd");
const btnClose = document.getElementById("btnClose");
const btnCancel = document.getElementById("btnCancel");

const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");

const form = document.getElementById("form");
const editingId = document.getElementById("editingId");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone");
const positionEl = document.getElementById("position");

const errName = document.getElementById("errName");
const errEmail = document.getElementById("errEmail");
const errPhone = document.getElementById("errPhone");
const errPos = document.getElementById("errPos");

function escapeHtml(str){
  return String(str ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function render(list){
  tbody.innerHTML = "";
  list.forEach(e => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${e.id}</td>
      <td>${escapeHtml(e.name)}</td>
      <td>${escapeHtml(e.email)}</td>
      <td>${escapeHtml(e.phone)}</td>
      <td>${escapeHtml(e.position)}</td>
      <td>
        <div class="action">
          <button class="btn btn-yellow" data-act="edit" data-id="${e.id}">Edit</button>
          <button class="btn btn-red" data-act="del" data-id="${e.id}">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openModal(mode, emp){
  clearErrors();
  overlay.classList.remove("hidden");

  if(mode === "add"){
    editingId.value = "";
    nameEl.value = "";
    emailEl.value = "";
    phoneEl.value = "";
    positionEl.value = "";
    document.querySelector('input[name="sex"][value="Male"]').checked = true;
  }else{
    editingId.value = emp.id;
    nameEl.value = emp.name;
    emailEl.value = emp.email;
    phoneEl.value = emp.phone;
    positionEl.value = emp.position;
    const r = document.querySelector(`input[name="sex"][value="${emp.sex}"]`);
    if(r) r.checked = true;
  }
}

function closeModal(){
  overlay.classList.add("hidden");
}

btnAdd.addEventListener("click", () => openModal("add"));
btnClose.addEventListener("click", closeModal);
btnCancel.addEventListener("click", closeModal);

overlay.addEventListener("click", (e) => {
  if(e.target === overlay) closeModal();
});

function clearErrors(){
  errName.textContent = "";
  errEmail.textContent = "";
  errPhone.textContent = "";
  errPos.textContent = "";
}

function isEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validate(){
  clearErrors();
  let ok = true;

  const n = nameEl.value.trim();
  const em = emailEl.value.trim();
  const ph = phoneEl.value.trim();
  const pos = positionEl.value.trim();

  if(!n){ errName.textContent = "Name is required."; ok = false; }
  if(!em){ errEmail.textContent = "Email is required."; ok = false; }
  else if(!isEmail(em)){ errEmail.textContent = "Email invalid."; ok = false; }

  if(!ph){ errPhone.textContent = "Phone is required."; ok = false; }
  else if(!/^\d{9,11}$/.test(ph)){ errPhone.textContent = "Phone must be 9-11 digits."; ok = false; }

  if(!pos){ errPos.textContent = "Position is required."; ok = false; }

  return ok;
}

function nextId(){
  const maxId = employees.reduce((m, x) => Math.max(m, x.id), 0);
  return maxId + 1;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(!validate()) return;

  const sex = document.querySelector('input[name="sex"]:checked')?.value || "Male";

  const payload = {
    name: nameEl.value.trim(),
    email: emailEl.value.trim(),
    phone: phoneEl.value.trim(),
    position: positionEl.value.trim(),
    sex
  };

  if(!editingId.value){
    employees.push({ id: nextId(), ...payload });
  }else{
    const id = Number(editingId.value);
    const idx = employees.findIndex(x => x.id === id);
    if(idx >= 0) employees[idx] = { id, ...payload };
  }

  closeModal();
  render(employees);
});

tbody.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if(!btn) return;

  const act = btn.dataset.act;
  const id = Number(btn.dataset.id);

  if(act === "edit"){
    const emp = employees.find(x => x.id === id);
    if(emp) openModal("edit", emp);
  }

  if(act === "del"){
    const emp = employees.find(x => x.id === id);
    if(!emp) return;
    if(confirm(`Delete "${emp.name}"?`)){
      employees = employees.filter(x => x.id !== id);
      render(employees);
    }
  }
});

/* SEARCH */
function doSearch(){
  const k = searchInput.value.trim().toLowerCase();
  if(!k) return render(employees);

  const filtered = employees.filter(e => {
    const text = `${e.name} ${e.email} ${e.phone} ${e.position}`.toLowerCase();
    return text.includes(k);
  });
  render(filtered);
}
btnSearch.addEventListener("click", doSearch);
searchInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter") doSearch();
});

render(employees);
