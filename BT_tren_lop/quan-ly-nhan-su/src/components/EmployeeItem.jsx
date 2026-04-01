function EmployeeItem({ nhanVien, stt }) {
  return (
    <tr>
      <td>{stt}</td>
      <td>{nhanVien.hoTen}</td>
      <td>{nhanVien.email}</td>
      <td>{nhanVien.soDienThoai}</td>
      <td>{nhanVien.viTri}</td>
      <td>
        <button className="btn-edit">Sửa</button>
        <button className="btn-delete">Xóa</button>
      </td>
    </tr>
  );
}

export default EmployeeItem;
