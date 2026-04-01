import { useState } from "react";

function ProductForm({ addProduct }) {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: "",
    status: true,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.desc || !form.price) {
      return setError("Không được để trống");
    }

    if (form.name.length > 30) {
      return setError("Tên tối đa 30 ký tự");
    }

    if (form.price < 0) {
      return setError("Giá không được âm");
    }

    addProduct({
      ...form,
      price: Number(form.price),
      status: form.status === "true",
    });

    setForm({
      name: "",
      desc: "",
      price: "",
      status: true,
    });

    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <h5>Thêm Sản Phẩm</h5>

      {error && <p className="text-danger">{error}</p>}

      <input
        className="form-control mb-2"
        placeholder="Tên sản phẩm"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Mô tả"
        name="desc"
        value={form.desc}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        className="form-control mb-2"
        placeholder="Giá"
        name="price"
        value={form.price}
        onChange={handleChange}
      />

      <select
        className="form-control mb-2"
        name="status"
        onChange={handleChange}
      >
        <option value="true">Còn hàng</option>
        <option value="false">Hết hàng</option>
      </select>

      <button className="btn btn-success">Thêm Sản Phẩm</button>
    </form>
  );
}

export default ProductForm;