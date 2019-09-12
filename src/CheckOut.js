import React, { useState, useContext } from 'react';
import ContextInventory from './ContextInventory';
import ContextForm from './ContextForm';
import Form from './Form';
import './CheckOut.css';

export default function CheckOut(props) {
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

    const setUser = targetName => {
        const user = users.find(person => person.name === targetName)
        updateUserForm(user)
    }

    /* submit form info */
    const checkOut = () => {
        checkForm(userForm.id, formData, 'checked out')
    }

    const handleClickCancel = () => {
        props.history.push('/');
    };

    const contextValue = {
        users,
        inventory,
        inventoryNumber,
        inventoryKey,
        inventoryQuantity,
        setUser,
        history: props.history
    }
    
    return (
        <ContextForm.Provider value={contextValue}>
            <h2 className="formHeader">Check Out</h2>
            <Form />
            <button
                type="submit"
                form="checkForm"
                onClick={() => {checkOut()}}>
                Check Out
            </button>
            <button
                onClick={handleClickCancel}>
                Cancel
            </button>
        </ContextForm.Provider>
    )
}