import React, { useState, useContext } from 'react';
import ContextInventory from './ContextInventory';
import ContextForm from './ContextForm';
import Form from './Form';
import './CheckOut.css';

export default function CheckOut() {
    const {users, inventory} = useContext(ContextInventory)
    const inventoryNumber = {}

    /* storing values from form submit */
    const [userForm, updateUserForm] = useState(users[0])
    const [inventoryForm, updateInventoryForm] = useState({})
    const [formData, setFormData] = useState({})

    inventory.forEach(item => {
        const id = item.id
        const num = item.quantityAvailable
        inventoryNumber[id] = num;
    })

    const inventoryKey = target => {
        console.log('checked', target.checked)
        const id = target.value

        if(target.checked) {
            if(!formData[id]) {
                setFormData({
                    ...formData,
                    [id]: ''
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


    const contextValue = {
        users,
        inventory,
        inventoryNumber,
        inventoryKey,
        inventoryQuantity,
        userForm,
        inventoryForm,
    }
    
    return (
        <ContextForm.Provider value={contextValue}>
            <h2>Check Out</h2>
            <Form />
            <button
                type="submit"
                form="checkForm"
                onClick={() => {console.log('check out')}}>
                Check Out
            </button>
        </ContextForm.Provider>
    )
}