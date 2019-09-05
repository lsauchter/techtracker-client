import React, { useContext } from 'react';
import ContextInventory from './ContextInventory';
import ContextForm from './ContextForm';
import Form from './Form';
import './CheckOut.css';

export default function CheckOut() {
    const {users, inventory} = useContext(ContextInventory)

    const inventoryNumber = {}

    inventory.forEach(item => {
        const id = item.id
        const num = item.quantityAvailable
        inventoryNumber[id] = num;
    })

    const contextValue = {
        users,
        inventory,
        inventoryNumber,
        buttonName: 'Check Out',
    }
    
    return (
        <ContextForm.Provider value={contextValue}>
            <h2>Check Out</h2>
            <Form />
        </ContextForm.Provider>
    )
}