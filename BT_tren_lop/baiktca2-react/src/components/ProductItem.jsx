function ProductItem({ product, deleteProduct, toggleStatus }) {
  return (
    <div className="border p-2 mb-2 d-flex justify-content-between align-items-center">
      <div>
        <h6>{product.name}</h6>
        <p>{product.desc}</p>
        <p>Giá: {product.price}</p>
        <p>
          Trạng thái:{" "}
          <span className={product.status ? "text-success" : "text-danger"}>
            {product.status ? "Còn hàng" : "Hết hàng"}
          </span>
        </p>
      </div>

      <div>
        <button
          className="btn btn-warning me-2"
          onClick={() => toggleStatus(product.id)}
        >
          Đổi trạng thái
        </button>

        <button
          className="btn btn-danger"
          onClick={() => deleteProduct(product.id)}
        >
          Xóa
        </button>
      </div>
    </div>
  );
}

export default ProductItem;