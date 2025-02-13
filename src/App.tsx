import React from "react";
import { UserProvider } from "./context/UserContext";
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";

const App: React.FC = () => {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center py-4">React CRUD with Context API</h1>
        <div className="sm:flex sm:justify-around ">
          <ItemList />
          <AddItem />
        </div>
      </div>
    </UserProvider>
  );
};

export default App;
