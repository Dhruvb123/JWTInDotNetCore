// src/components/Contact.jsx
import React from "react";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Contact form submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h1 className="text-xl mb-2">Contact</h1>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default Contact;
