import { useEffect, useState } from "react";

const emptyForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  company: "",
  category: "",
};

function ContactForm({
  onSubmit,
  editingContact,
  cancelEdit,
  language,
  firstNameInputRef,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const text = {
    vi: {
      addTitle: "Thêm Liên Hệ Mới",
      editTitle: "Sửa Liên Hệ",
      firstName: "Tên",
      lastName: "Họ",
      phone: "Số Điện Thoại",
      email: "Email",
      address: "Địa Chỉ",
      company: "Công Ty",
      category: "Danh Mục",
      choose: "Chọn danh mục",
      work: "Công việc",
      family: "Gia đình",
      friend: "Bạn bè",
      addBtn: "Thêm Liên Hệ",
      updateBtn: "Cập Nhật",
      cancelBtn: "Hủy Bỏ",
      errFirstName: "Tên không được để trống",
      errLastName: "Họ không được để trống",
      errPhoneEmpty: "Số điện thoại không được để trống",
      errPhone: "Số điện thoại phải có đúng 10 chữ số",
      errEmailEmpty: "Email không được để trống",
      errEmail: "Email không đúng định dạng",
      errAddress: "Địa chỉ không được để trống",
      errCompany: "Công ty không được để trống",
      errCategory: "Danh mục không được để trống",
    },
    en: {
      addTitle: "Add New Contact",
      editTitle: "Edit Contact",
      firstName: "First Name",
      lastName: "Last Name",
      phone: "Phone Number",
      email: "Email",
      address: "Address",
      company: "Company",
      category: "Category",
      choose: "Select category",
      work: "Work",
      family: "Family",
      friend: "Friend",
      addBtn: "Add Contact",
      updateBtn: "Update",
      cancelBtn: "Cancel",
      errFirstName: "First name is required",
      errLastName: "Last name is required",
      errPhoneEmpty: "Phone number is required",
      errPhone: "Phone number must have exactly 10 digits",
      errEmailEmpty: "Email is required",
      errEmail: "Invalid email format",
      errAddress: "Address is required",
      errCompany: "Company is required",
      errCategory: "Category is required",
    },
  };

  useEffect(() => {
    if (editingContact) {
      setFormData(editingContact);
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = text[language].errFirstName;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = text[language].errLastName;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = text[language].errPhoneEmpty;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = text[language].errPhone;
    }

    if (!formData.email.trim()) {
      newErrors.email = text[language].errEmailEmpty;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = text[language].errEmail;
    }

    if (!formData.address.trim()) {
      newErrors.address = text[language].errAddress;
    }

    if (!formData.company.trim()) {
      newErrors.company = text[language].errCompany;
    }

    if (!formData.category.trim()) {
      newErrors.category = text[language].errCategory;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(formData);

    if (!editingContact) {
      setFormData(emptyForm);
      setErrors({});
      firstNameInputRef?.current?.focus();
    }
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setErrors({});
    cancelEdit();
    firstNameInputRef?.current?.focus();
  };

  return (
    <div className="panel-card">
      <h2 className="panel-title">
        {editingContact ? text[language].editTitle : text[language].addTitle}
      </h2>
      <div className="panel-divider"></div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6 mb-3">
            <label className="form-label form-label-custom">
              {text[language].firstName}
            </label>
            <input
              ref={firstNameInputRef}
              type="text"
              className="form-control custom-input"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
          </div>

          <div className="col-6 mb-3">
            <label className="form-label form-label-custom">
              {text[language].lastName}
            </label>
            <input
              type="text"
              className="form-control custom-input"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label form-label-custom">
            {text[language].phone}
          </label>
          <input
            type="text"
            className="form-control custom-input"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <small className="text-danger">{errors.phone}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label form-label-custom">
            {text[language].email}
          </label>
          <input
            type="text"
            className="form-control custom-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label form-label-custom">
            {text[language].address}
          </label>
          <input
            type="text"
            className="form-control custom-input"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <small className="text-danger">{errors.address}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label form-label-custom">
            {text[language].company}
          </label>
          <input
            type="text"
            className="form-control custom-input"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
          {errors.company && <small className="text-danger">{errors.company}</small>}
        </div>

        <div className="mb-4">
          <label className="form-label form-label-custom">
            {text[language].category}
          </label>
          <select
            className="form-select custom-input"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">{text[language].choose}</option>
            <option value={language === "vi" ? "Công việc" : "Work"}>
              {text[language].work}
            </option>
            <option value={language === "vi" ? "Gia đình" : "Family"}>
              {text[language].family}
            </option>
            <option value={language === "vi" ? "Bạn bè" : "Friend"}>
              {text[language].friend}
            </option>
          </select>
          {errors.category && <small className="text-danger">{errors.category}</small>}
        </div>

        <div className="d-flex gap-3">
          <button type="submit" className="btn btn-dark form-btn-dark">
            {editingContact ? text[language].updateBtn : text[language].addBtn}
          </button>

          <button
            type="button"
            className="btn btn-outline-dark form-btn-light"
            onClick={handleCancel}
          >
            {text[language].cancelBtn}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;