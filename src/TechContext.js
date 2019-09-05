import React from 'react';

const TechContext = React.createContext({
    users: [],
    inventory: [],
    checkForm: () => {}
})

export default TechContext