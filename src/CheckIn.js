import React, { useContext, useState, useLayoutEffect, useCallback } from 'react';
import TechContext from './TechContext';
import Form from './Form';
import './CheckIn.css';

export default function CheckIn() {
    const {users, inventory} = useContext(TechContext)
    const [userName, updateUserName] = useState(users[0].name)
    const [userInventory, updateUserInventory] = useState(inventory)
    const [inventoryNumber, updateInventoryNumber] = useState(users[0].checkedOut)

    const setUser = targetName => {
        console.log('targetName', targetName)
        updateUserName(targetName)
    }

    useLayoutEffect(() => {
        const user = users.find(person => person.name === userName)
        console.log('user', user)
        const {checkedOut} = user
        const ids = Object.keys(checkedOut).map(Number)
        console.log('user', user, 'checkedOut', 
        checkedOut, 'ids', ids)
        const checkedOutItems = inventory.filter(item => {
            if(ids.includes(item.id)) {
                return item
            }
            })
        console.log('checkedoutitems', checkedOutItems)
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

    console.log('form props', formProps)

    return (
        <>
            <h2>Check In</h2>
            <Form formProps={formProps} setUser={(formName) => setUser(formName)}/>
        </>
    )
}