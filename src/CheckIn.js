import React, { useContext, useState, useLayoutEffect } from 'react';
import TechContext from './TechContext';
import Form from './Form';
import './CheckIn.css';

export default function CheckIn() {
    const {users, inventory} = useContext(TechContext)
    const [userName, updateUserName] = useState(users[0].name)
    const [userInventory, updateUserInventory] = useState(inventory)
    const [inventoryNumber, updateInventoryNumber] = useState(users[0].checkedOut)

    const setUser = targetName => {
        updateUserName(targetName)
    }

    useLayoutEffect(() => {
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

    const formProps = {
        users,
        inventory: userInventory,
        inventoryNumber,
        buttonName: 'Check In',
    }

    return (
        <>
            <h2>Check In</h2>
            <Form formProps={formProps} setUser={(formName) => setUser(formName)}/>
        </>
    )
}