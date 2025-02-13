import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const ItemList: React.FC = () => {
  const { users, removeUser, setEditingUserId } = useContext(UserContext)!;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Filter Users by name or email
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort Users based on selected key and order
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valueA = a[sortKey as keyof typeof a].toString().toLowerCase();
    const valueB = b[sortKey as keyof typeof b].toString().toLowerCase();
    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">User List</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full p-2 border rounded my-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Sorting Controls */}
      <div className="flex gap-4 mb-2">
        <select
          className="p-2 border rounded"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
        </select>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      <ul>
        {sortedUsers.map((user) => (
          <li key={user.id} className="flex justify-between items-center border p-2 my-2">
            <div>
              <p><strong>{user.name}</strong></p>
              <p>{user.email}</p>
              <p>{user.address.street}</p>
            </div>
            <div className="flex flex-nowrap">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded mx-1 cursor-pointer"
                onClick={() => setEditingUserId(user.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded mx-1 cursor-pointer"
                onClick={() => removeUser(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
