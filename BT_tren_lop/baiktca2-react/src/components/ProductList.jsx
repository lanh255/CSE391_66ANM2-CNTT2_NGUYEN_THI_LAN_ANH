import ProductItem from "./ProductItem";

function ProductList({ products, deleteProduct, toggleStatus }) {
  return (
    <div className="card p-3">
      <h5>Danh Sách Sản Phẩm</h5>

      {products.map((p) => (
        <ProductItem
          key={p.id}
          product={p}
          deleteProduct={deleteProduct}
          toggleStatus={toggleStatus}
        />
      ))}
    </div>
  );
}

export default ProductList;