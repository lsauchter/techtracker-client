import React, { useContext, useState, useEffect } from 'react';
import ContextInventory from './ContextInventory';
import ContextForm from './ContextForm';
import Form from './Form';
import './CheckIn.css';

export default function CheckIn(props) {
    const {users, inventory, checkForm} = useContext(ContextInventory)

    /* setting values for the form render */
    const [userForm, updateUserForm] = useState('')
    const [userInventory, updateUserInventory] = useState([])
    const [inventoryNumber, updateInventoryNumber] = useState('')

    const setUser = targetName => {
        const user = users.find(person => person.name === targetName)
        updateUserForm(user)
    }

    useEffect(() => {
        if (Number(userForm.id)) {
            const user = users.find(person => person.id === userForm.id)
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
        }
    }, [userForm, users, inventory])

    /* storing inventory values from form */
    const [formData, setFormData] = useState({})

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

    /* submit form data */
    const checkIn = () => {
        checkForm(userForm.id, formData, 'checked in')
    }

    const handleClickCancel = () => {
        props.history.push('/');
    };

    const contextValue = {
        users,
        inventory: userInventory,
        inventoryNumber,
        inventoryKey,
        inventoryQuantity,
        setUser,
        history: props.history
    }

    return (
        <ContextForm.Provider value={contextValue}>
            <h2 className="formHeader">Check In</h2>
            <Form />
            <button
                type="submit"
                form="checkForm"
                onClick={() => {checkIn()}}>
                Check In
            </button>
            <button
                onClick={handleClickCancel}>
                Cancel
            </button>
        </ContextForm.Provider>
    )
}