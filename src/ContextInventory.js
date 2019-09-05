import React from 'react';

const ContextInventory = React.createContext({
    users: [],
    inventory: [],
    checkForm: () => {}
})

export default ContextInventory