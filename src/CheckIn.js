import React, { useContext, useState, useEffect } from 'react';
import ContextInventory from './ContextInventory';
import ContextForm from './ContextForm';
import Form from './Form';
import './CheckIn.css';

export default function CheckIn() {
    /* setting values for the form render */
    const {users, inventory} = useContext(ContextInventory)
    const [userName, updateUserName] = useState(users[0].name)
    const [userInventory, updateUserInventory] = useState(inventory)
    const [inventoryNumber, updateInventoryNumber] = useState(users[0].checkedOut)

    /* storing values from form submit */
    const [inventoryForm, updateInventoryForm] = useState({})

    const setUser = targetName => {
        updateUserName(targetName)
    }

    const setInventory = item => {
        updateInventoryForm({
            ...inventoryForm,
            [item.id]: item.quantity
        })
    }

    useEffect(() => {
        const user = users.find(person => person.name === userName)
        const {checkedOut} = user
        const ids = Object.keys(checkedOut).map(Number)
        const checkedOutItems = inventory.filter(item => {
            if(ids.includes(item.id)) {
                return item
            }
            })
        updateUserInventory([...checkedOutItems
        ])
        updateInventoryNumber(checkedOut)
    }, [userName])

    const contextValue = {
        users,
        inventory: userInventory,
        inventoryNumber,
        setInventory,
        setUser
    }

    return (
        <ContextForm.Provider value={contextValue}>
            <h2>Check In</h2>
            <Form />
            <button
                type="submit"
                form="checkForm"
                onClick={() => {console.log(userName, inventoryForm)}}>
                Check In
            </button>
        </ContextForm.Provider>
    )
}