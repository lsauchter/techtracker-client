import React, { useContext, useState, useEffect } from 'react';
import ContextInventory from './ContextInventory';
import ContextForm from './ContextForm';
import Form from './Form';
import './CheckIn.css';

export default function CheckIn() {
    const {users, inventory, checkForm} = useContext(ContextInventory)

    /* setting values for the form render */
    const [userName, updateUserName] = useState(users[0].name)
    const [userInventory, updateUserInventory] = useState(inventory)
    const [inventoryNumber, updateInventoryNumber] = useState(users[0].checkedOut)

    const setUser = targetName => {
        updateUserName(targetName)
    }

    useEffect(() => {
        const user = users.find(person => person.name === userName)
        const {checkedOut} = user
        const ids = Object.keys(checkedOut).map(Number)
        const checkedOutItems = inventory.filter(item => {
            if(ids.includes(item.id)) {
                return item
            }
            return false
            })
        updateUserInventory([...checkedOutItems
        ])
        updateInventoryNumber(checkedOut)
    }, [userName, users, inventory])

    /* storing inventory values from form */
    const [formData, setFormData] = useState({})

    const inventoryKey = target => {
        console.log('checked', target.checked)
        const id = target.value

        if(target.checked) {
            if(!formData[id]) {
                setFormData({
                    ...formData,
                    [id]: 1
                })
            }
        }
        else{
           console.log(formData)
           setFormData(formData => {
               delete formData[id]
               return formData
           })
        }
    }

    const inventoryQuantity = (quantity, id) => {
        const num = Number(quantity)
        setFormData({
            ...formData,
            [id]: num
        })
    }

    /* submit form data */

    const checkIn = () => {
        console.log('check in')
        checkForm(userName.id, formData, 'checkIn')
    }

    const contextValue = {
        users,
        inventory: userInventory,
        inventoryNumber,
        inventoryKey,
        inventoryQuantity,
        setUser
    }

    return (
        <ContextForm.Provider value={contextValue}>
            <h2>Check In</h2>
            <Form />
            <button
                type="submit"
                form="checkForm"
                onClick={() => {checkIn()}}>
                Check In
            </button>
        </ContextForm.Provider>
    )
}