function ContactCard({ contact, onEdit, onDelete, language }) {
  const text = {
    vi: {
      edit: "Sửa",
      delete: "Xóa",
      phone: "SDT:",
      email: "Email:",
      address: "Địa chỉ:",
      company: "Công ty:",
      category: "Danh mục:",
    },
    en: {
      edit: "Edit",
      delete: "Delete",
      phone: "Phone:",
      email: "Email:",
      address: "Address:",
      company: "Company:",
      category: "Category:",
    },
  };

  return (
    <div className="contact-card-custom">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h4 className="contact-fullname mb-0">
          {contact.firstName} {contact.lastName}
        </h4>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-dark custom-action-btn"
            onClick={() => onEdit(contact)}
          >
            {text[language].edit}
          </button>

          <button
            type="button"
            className="btn btn-outline-danger custom-action-btn"
            onClick={() => onDelete(contact.id)}
          >
            {text[language].delete}
          </button>
        </div>
      </div>

      <div className="contact-detail-row">
        <span className="label">{text[language].phone}</span>
        <span>{contact.phone}</span>
      </div>

      <div className="contact-detail-row">
        <span className="label">{text[language].email}</span>
        <span>{contact.email}</span>
      </div>

      <div className="contact-detail-row">
        <span className="label">{text[language].address}</span>
        <span>{contact.address}</span>
      </div>

      <div className="contact-detail-row">
        <span className="label">{text[language].company}</span>
        <span>{contact.company}</span>
      </div>

      <div className="contact-detail-row">
        <span className="label">{text[language].category}</span>
        <span className="category-badge">{contact.category}</span>
      </div>
    </div>
  );
}

export default ContactCard;