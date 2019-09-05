import React from 'react';

const ContextForm = React.createContext({
    users: [],
    inventory: [],
    inventoryNumber: '',
    buttonName: '',
    setUser: () => {}
})

export default ContextForm