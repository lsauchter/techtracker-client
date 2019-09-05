import React, { useContext } from 'react';
import TechContext from './TechContext';
import Form from './Form';
import './CheckOut.css';

export default function CheckOut() {
    const {users, inventory} = useContext(TechContext)

    const inventoryNumber = {}

    inventory.forEach(item => {
        const id = item.id
        const num = item.quantityAvailable
        inventoryNumber[id] = num;
    })

    const formProps = {
        users,
        inventory,
        inventoryNumber,
        buttonName: 'Check Out',
    }
    
    return (
        <>
            <h2>Check Out</h2>
            <Form formProps={formProps} setUser={() => {}}/>
        </>
    )
}