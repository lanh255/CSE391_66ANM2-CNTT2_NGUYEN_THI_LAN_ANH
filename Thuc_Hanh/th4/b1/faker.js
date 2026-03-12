function generateFakeStudents(){

const ho = ["Nguyễn","Trần","Lê","Phạm","Hoàng","Võ","Đặng"]
const dem = ["Văn","Thị","Minh","Gia","Quốc","Thanh"]
const ten = ["An","Bình","Cường","Dũng","Lan","Trang","Phúc"]

let students = []

for(let i=0;i<50;i++){

let hoTen =
ho[Math.floor(Math.random()*ho.length)]
+" "+
dem[Math.floor(Math.random()*dem.length)]
+" "+
ten[Math.floor(Math.random()*ten.length)]

let diem = +(Math.random()*10).toFixed(1)

students.push({
hoTen: hoTen,
diem: diem
})

}

return students

}