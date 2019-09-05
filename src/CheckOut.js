import React, { useState, useContext } from 'react';
import ContextInventory from './ContextInventory';
import ContextForm from './ContextForm';
import Form from './Form';
import './CheckOut.css';

export default function CheckOut() {
    const {users, inventory, checkForm} = useContext(ContextInventory)
    
    /* creating items for form render */
    const inventoryNumber = {}

    inventory.forEach(item => {
        const id = item.id
        const num = item.quantityAvailable
        inventoryNumber[id] = num;
    })

    /* storing values from form submit */
    const [userForm, updateUserForm] = useState(users[0])
    const [formData, setFormData] = useState({})

    /* setting values from form */
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

    const setUser = user => {
        updateUserForm(user)
    }

    /* submit form info */
    const checkOut = () => {
        console.log('check out')
        checkForm(userForm.id, formData, 'checkOut')
    }

    const contextValue = {
        users,
        inventory,
        inventoryNumber,
        inventoryKey,
        inventoryQuantity,
        setUser
    }
    
    return (
        <ContextForm.Provider value={contextValue}>
            <h2>Check Out</h2>
            <Form />
            <button
                type="submit"
                form="checkForm"
                onClick={() => {checkOut()}}>
                Check Out
            </button>
        </ContextForm.Provider>
    )
}