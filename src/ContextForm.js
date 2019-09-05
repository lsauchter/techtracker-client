import React from 'react';

const ContextForm = React.createContext({
    users: [],
    inventory: [],
    inventoryNumber: '',
    userForm: '',
    inventoryForm: {},
    inventoryKey: () => {},
    inventoryQuantity: () => {},
    setInventory: () => {},
    setUser: () => {}
})

export default ContextForm