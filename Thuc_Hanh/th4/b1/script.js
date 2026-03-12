const hoTenInput = document.getElementById("hoTen")
const diemInput = document.getElementById("diem")
const btnThem = document.getElementById("btnThem")
const btnRandom = document.getElementById("btnRandom")

const searchInput = document.getElementById("searchInput")
const filterXepLoai = document.getElementById("filterXepLoai")

const tableBody = document.getElementById("studentTableBody")
const thongKe = document.getElementById("thongKe")

const sortDiem = document.getElementById("sortDiem")
const sortIcon = document.getElementById("sortIcon")

let danhSachSinhVien = []
let filteredStudents = []

let sortOrder = null


function xepLoai(diem){

if(diem>=8.5) return "Giỏi"
if(diem>=7) return "Khá"
if(diem>=5) return "Trung bình"
return "Yếu"

}


function renderTable(data){

let html=""

if(data.length===0){

tableBody.innerHTML=`<tr><td colspan="5">Không có kết quả</td></tr>`
return

}

let tong=0

data.forEach((sv,index)=>{

tong+=sv.diem

html+=`
<tr class="${sv.diem<5?"highlight":""}">
<td>${index+1}</td>
<td>${sv.hoTen}</td>
<td>${sv.diem}</td>
<td>${xepLoai(sv.diem)}</td>
<td>
<button class="delete-btn" data-name="${sv.hoTen}" data-diem="${sv.diem}">
Xóa
</button>
</td>
</tr>
`

})

tableBody.innerHTML=html

let avg=tong/data.length

thongKe.textContent=
`Tổng số sinh viên: ${data.length} | Điểm trung bình: ${avg.toFixed(2)}`

}


function applyFilters(){

const keyword=searchInput.value.toLowerCase().trim()
const selected=filterXepLoai.value

filteredStudents=danhSachSinhVien.filter(sv=>{

let matchKeyword=sv.hoTen.toLowerCase().includes(keyword)

let matchLoai=
selected==="Tất cả"||
xepLoai(sv.diem)===selected

return matchKeyword && matchLoai

})


if(sortOrder==="asc"){

filteredStudents.sort((a,b)=>a.diem-b.diem)
sortIcon.textContent="▲"

}

else if(sortOrder==="desc"){

filteredStudents.sort((a,b)=>b.diem-a.diem)
sortIcon.textContent="▼"

}

else{

sortIcon.textContent=""

}

renderTable(filteredStudents)

}


function themSinhVien(){

let hoTen=hoTenInput.value.trim()
let diem=parseFloat(diemInput.value)

if(hoTen===""){
alert("Tên không được trống")
return
}

if(isNaN(diem)||diem<0||diem>10){
alert("Điểm 0-10")
return
}

danhSachSinhVien.push({
hoTen:hoTen,
diem:diem
})

hoTenInput.value=""
diemInput.value=""

applyFilters()

}


btnThem.addEventListener("click",themSinhVien)


btnRandom.addEventListener("click",()=>{

danhSachSinhVien = generateFakeStudents()

applyFilters()

})


searchInput.addEventListener("input",applyFilters)

filterXepLoai.addEventListener("change",applyFilters)


sortDiem.addEventListener("click",()=>{

if(sortOrder===null) sortOrder="asc"
else if(sortOrder==="asc") sortOrder="desc"
else sortOrder="asc"

applyFilters()

})


tableBody.addEventListener("click",(e)=>{

if(e.target.classList.contains("delete-btn")){

let ten=e.target.getAttribute("data-name")
let diem=parseFloat(e.target.getAttribute("data-diem"))

let index=danhSachSinhVien.findIndex(sv=>
sv.hoTen===ten && sv.diem===diem
)

if(index!==-1){

danhSachSinhVien.splice(index,1)

applyFilters()

}

}

})


applyFilters()