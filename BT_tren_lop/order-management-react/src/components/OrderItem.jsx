function formatCurrency(number) {
  return new Intl.NumberFormat("vi-VN").format(number);
}

function OrderItem({ order, onEdit, onDelete }) {
  const totalAmount = Number(order.quantity) * Number(order.price);

  return (
    <tr>
      <td>#{order.id}</td>
      <td>{order.customerName}</td>
      <td>{order.phone}</td>
      <td>{order.address}</td>
      <td>{order.items}</td>
      <td>{order.quantity}</td>
      <td>{formatCurrency(order.price)}</td>
      <td>{formatCurrency(totalAmount)}</td>
      <td>{order.orderDate}</td>
      <td>
        <span className={`status-badge status-${order.status}`}>
          {order.status}
        </span>
      </td>
      <td className="action-cell">
        <button className="btn btn-edit" onClick={() => onEdit(order.id)}>
          Sửa
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(order.id)}>
          Xóa
        </button>
      </td>
    </tr>
  );
}

export default OrderItem;