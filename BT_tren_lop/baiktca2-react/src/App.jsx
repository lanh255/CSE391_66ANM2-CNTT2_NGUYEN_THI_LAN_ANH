import { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { initialProducts } from "./data"; 

function App() {
  const [products, setProducts] = useState([]);

  // load data từ file
  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const toggleStatus = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, status: !p.status } : p
      )
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Quản Lý Sản Phẩm</h2>

      <ProductForm addProduct={addProduct} />

      <ProductList
        products={products}
        deleteProduct={deleteProduct}
        toggleStatus={toggleStatus}
      />
    </div>
  );
}

export default App;