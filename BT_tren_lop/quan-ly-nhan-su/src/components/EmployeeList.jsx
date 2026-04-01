import EmployeeItem from "./EmployeeItem";

function EmployeeList({ danhSach, moForm }) {
  return (
    <div className="table-section">
      <div className="table-top">
        <h2>Danh sách nhân sự</h2>
        <button className="btn-add" onClick={moForm}>
          + Thêm mới
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Vị trí</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {danhSach.map((nhanVien, index) => (
            <EmployeeItem
              key={nhanVien.id}
              nhanVien={nhanVien}
              stt={index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
