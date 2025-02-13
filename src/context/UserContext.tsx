import React, { createContext, useState, useEffect } from "react";
import { getItems } from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  address: { street: string };
}

interface UserContextProps {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (id: number) => void;
  editUser: (id: number, updatedUser: User) => void;
  editingUserId: number | null;
  setEditingUserId: (id: number | null) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(JSON.parse(localStorage.getItem("users") || "[]"));
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  useEffect(() => {
    if (users.length === 0) {
      getItems().then((data) => {
        setUsers(data);
        localStorage.setItem("users", JSON.stringify(data));
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  const removeUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const editUser = (id: number, updatedUser: User) => {
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    setEditingUserId(null); // Reset after editing
  };
  
  return (
    <UserContext.Provider value={{ users, addUser, removeUser, editUser, editingUserId, setEditingUserId }}>
      {children}
    </UserContext.Provider>
  );
};
