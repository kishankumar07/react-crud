import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const AddItem: React.FC = () => {
  const { addUser, editUser, users, editingUserId, setEditingUserId } = useContext(UserContext)!;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", address: "" });

  useEffect(() => {
    if (editingUserId !== null) {
      const user = users.find((user) => user.id === editingUserId);
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setAddress(user.address.street);
      }
    }
  }, [editingUserId, users]);

  // Form validation * Very important for any input field
  const validateForm = () => {
    const newErrors = { name: "", email: "", address: "" };
    let valid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    if (!address.trim()) {
      newErrors.address = "Address is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingUserId !== null) {
      editUser(editingUserId, { id: editingUserId, name, email, address: { street: address } });
      setEditingUserId(null); 
    } else {
      addUser({ id: Date.now(), name, email, address: { street: address } });
    }

    setName("");
    setEmail("");
    setAddress("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-2xl">
      <h2 className="text-xl font-bold">{editingUserId !== null ? "Edit Item" : "Add Item"}</h2>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter name"
          className="w-full p-2 border rounded my-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="text-red-500 text-sm">{errors.name}</p>
      </div>

      <div className="mb-3">
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-2 border rounded my-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-red-500 text-sm">{errors.email}</p>
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter Address"
          className="w-full p-2 border rounded my-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <p className="text-red-500 text-sm">{errors.address}</p>
      </div>

      <button
        type="submit"
        className={`px-4 py-2 text-white rounded cursor-pointer ${name && email && address ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"}`}
        disabled={!name || !email || !address}
      >
        {editingUserId !== null ? "Update Item" : "Add Item"}
      </button>
    </form>
  );
};

export default AddItem;

