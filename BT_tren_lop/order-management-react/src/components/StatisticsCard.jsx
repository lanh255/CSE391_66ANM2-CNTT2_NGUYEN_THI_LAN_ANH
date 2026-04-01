function formatCurrency(number) {
  return new Intl.NumberFormat("vi-VN").format(number);
}

function StatisticsCard({ orders }) {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.price || 0),
    0
  );
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const confirmedCount = orders.filter((o) => o.status === "confirmed").length;
  const shippedCount = orders.filter((o) => o.status === "shipped").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;

  return (
    <section className="card">
      <h2>StatisticsCard</h2>

      <div className="stats-grid">
        <div className="stat-box">
          <strong>{totalOrders}</strong>
          <span>Tổng đơn</span>
        </div>

        <div className="stat-box">
          <strong>{formatCurrency(totalRevenue)}</strong>
          <span>Doanh thu</span>
        </div>

        <div className="stat-box">
          <strong>{pendingCount}</strong>
          <span>Pending</span>
        </div>

        <div className="stat-box">
          <strong>{confirmedCount}</strong>
          <span>Confirmed</span>
        </div>

        <div className="stat-box">
          <strong>{shippedCount}</strong>
          <span>Shipped</span>
        </div>

        <div className="stat-box">
          <strong>{deliveredCount}</strong>
          <span>Delivered</span>
        </div>
      </div>
    </section>
  );
}

export default StatisticsCard;