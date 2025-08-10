import React, { useState } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedContacts = contacts.map((contact, index) =>
        index === editIndex ? formData : contact
      );
      setContacts(updatedContacts);
      setEditIndex(null);
    } else {
      setContacts([...contacts, formData]);
    }
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleEdit = (index) => {
    setFormData(contacts[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    if (editIndex === index) {
      setEditIndex(null);
      setFormData({ name: '', email: '', phone: '' });
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4 text-center">Contacts List</h2>

      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            {editIndex !== null ? 'Update Contact' : 'Add Contact'}
          </button>
        </div>
      </form>

      <ul className="list-group">
        {contacts.map((contact, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {contact.name} - {contact.email} - {contact.phone}
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;