import ContactCard from "./ContactCard";

function ContactList({
  contacts = [],
  searchTerm,
  setSearchTerm,
  onEdit,
  onDelete,
  language,
}) {
  const text = {
    vi: {
      title: "Danh Sách Liên Hệ",
      placeholder: "Tìm kiếm liên hệ...",
      empty: "Không tìm thấy liên hệ nào.",
    },
    en: {
      title: "Contact List",
      placeholder: "Search contacts...",
      empty: "No contacts found.",
    },
  };

  return (
    <div className="panel-card">
      <h2 className="panel-title">{text[language].title}</h2>
      <div className="panel-divider"></div>

      <input
        type="text"
        className="form-control search-box"
        placeholder={text[language].placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mt-3">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={onEdit}
              onDelete={onDelete}
              language={language}
            />
          ))
        ) : (
          <div className="alert alert-warning mb-0">
            {text[language].empty}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactList;