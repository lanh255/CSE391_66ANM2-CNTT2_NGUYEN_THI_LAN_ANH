import { useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import contactsData from "./data";

function App() {
  const [contacts, setContacts] = useState(contactsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingContact, setEditingContact] = useState(null);
  const [language, setLanguage] = useState("vi");

  const formSectionRef = useRef(null);
  const firstNameInputRef = useRef(null);

  const filteredContacts = useMemo(() => {
    const keyword = searchTerm.toLowerCase().trim();

    return contacts.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();

      return (
        fullName.includes(keyword) ||
        contact.phone.toLowerCase().includes(keyword) ||
        contact.email.toLowerCase().includes(keyword) ||
        contact.address.toLowerCase().includes(keyword) ||
        contact.company.toLowerCase().includes(keyword) ||
        contact.category.toLowerCase().includes(keyword)
      );
    });
  }, [contacts, searchTerm]);

  const handleAddOrUpdateContact = (formData) => {
    if (editingContact) {
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === editingContact.id
            ? { ...formData, id: editingContact.id }
            : contact
        )
      );
      setEditingContact(null);
      return;
    }

    const newContact = {
      ...formData,
      id: Date.now(),
    };

    setContacts((prev) => [newContact, ...prev]);
  };

  const handleDeleteContact = (id) => {
    const confirmDelete = window.confirm(
      language === "vi"
        ? "Bạn có chắc muốn xóa liên hệ này không?"
        : "Are you sure you want to delete this contact?"
    );

    if (!confirmDelete) return;

    setContacts((prev) => prev.filter((contact) => contact.id !== id));

    if (editingContact && editingContact.id === id) {
      setEditingContact(null);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);

    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      firstNameInputRef.current?.focus();
    }, 0);
  };

  const cancelEdit = () => {
    setEditingContact(null);
  };

  const handleGoToForm = () => {
    setEditingContact(null);

    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      firstNameInputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="app-wrapper">
      <div className="container-custom">
        <Header
          language={language}
          setLanguage={setLanguage}
          onAddClick={handleGoToForm}
        />

        <div className="header-divider"></div>

        <div className="content-grid">
          <div className="left-column">
            <ContactList
              contacts={filteredContacts}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
              language={language}
            />
          </div>

          <div className="right-column" ref={formSectionRef}>
            <ContactForm
              onSubmit={handleAddOrUpdateContact}
              editingContact={editingContact}
              cancelEdit={cancelEdit}
              language={language}
              firstNameInputRef={firstNameInputRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;