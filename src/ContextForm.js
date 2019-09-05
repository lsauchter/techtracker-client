import React from 'react';

const ContextForm = React.createContext({
    users: [],
    inventory: [],
    inventoryNumber: '',
    inventoryKey: () => {},
    inventoryQuantity: () => {},
    setUser: () => {}
})

export default ContextForm 