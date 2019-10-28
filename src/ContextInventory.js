import React from "react";

const ContextInventory = React.createContext({
  users: [],
  inventory: [],
  checkForm: () => {},
  confirmation: "",
  addUser: () => {},
  deleteUser: () => {},
  addInventory: () => {},
  deleteInventory: () => {}
});

export default ContextInventory;
