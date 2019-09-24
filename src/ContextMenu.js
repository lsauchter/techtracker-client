import React from 'react';

const ContextMenu = React.createContext({
    isMenuOpen: '',
    stateChangeHandler: () => {},
    closeMenu: () => {}
})

export default ContextMenu