import OrderItem from "./OrderItem";

function OrderList({ orders, onEdit, onDelete }) {
  return (
    <section className="card">
      <h2>OrderList</h2>

      {orders.length === 0 ? (
        <p>Không có đơn hàng nào phù hợp.</p>
      ) : (
        <div className="table-card">
          <div className="table-wrapper">
            <table className="order-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>SĐT</th>
                  <th>Địa chỉ</th>
                  <th>Sản phẩm</th>
                  <th>SL</th>
                  <th>Giá</th>
                  <th>Thành tiền</th>
                  <th>Ngày</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <OrderItem
                    key={order.id}
                    order={order}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default OrderList;