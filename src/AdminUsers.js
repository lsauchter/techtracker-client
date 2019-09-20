import React, {useEffect, useState, useContext} from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import ContextInventory from './ContextInventory'
import {findUserByName} from './helper'
import './AdminUsers.css'

export default function AdminUser() {
    const {users, addUser, deleteUser} = useContext(ContextInventory)
    const [confirmation, updateConfirmation] = useState({})
    const [confirmationForm, updateConfirmationForm] = useState('')


    const userNames = users.map(user => {
        return <option key={user.id} value={user.name}>{user.name}</option>
    })

    const addUserSubmit = (e) => {
        e.preventDefault()
        const name = e.target.addUser.value
        const userData = {
            'name': name
        }
        const url = 'https://boiling-bayou-06844.herokuapp.com/api/users'
        e.target.reset();
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {'content-type': 'application/json'}
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {throw error})
            }
            return response.json()
        })
        .then((response) => {
            const newUser = {
                id: response.id,
                name: response.name,
                checkedOut: {}
            }
            addUser(newUser)
            confirmationText('addUser', {name: response.name, method: 'added'})
        })
        .catch()
    }

    const deleteUserSubmit = (e) => {
        e.preventDefault()
        const name = e.target.user.value
        const user = findUserByName(users, name)
        let checkout = false
        e.target.reset();

        if (Object.keys(user.checkedOut).length > 0) {
            checkout = true
        }

        const url = `https://boiling-bayou-06844.herokuapp.com/api/users?id=${user.id}&clearCheckOut=${checkout}`

        fetch(url, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'}
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {throw error})
            }
            deleteUser(name)
            confirmationText('removeUser', {name, method: 'removed'})
        })
        .catch()
    }

    let timer

    function confirmationText(form, data) {
        clearTimeout(timer)
        updateConfirmation(() => {
            return (<p className="confirmation" role='alert'>
              {data.name} {data.method}</p>
            )}
            )
        updateConfirmationForm(form)
        timer = setTimeout(() => {updateConfirmation('')}, 5000);
    }

    useEffect(() => {
        return clearTimeout(timer)
    }, [timer])

    return (
        <Accordion allowZeroExpanded="true" className="userAccordion">
            <AccordionItem>
                <AccordionItemHeading className="accordion2">
                    <AccordionItemButton>
                        Add User
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <form onSubmit={addUserSubmit}>
                        <input
                            type="text"
                            name="addUser"
                            id="addUser"
                            placeholder="Enter name..."
                        />
                        <button type="submit" className="user">
                            Add User
                        </button>
                    </form>
                    {(confirmationForm === 'addUser') && confirmation}
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading className="accordion2">
                    <AccordionItemButton>
                        Remove User
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <form onSubmit={deleteUserSubmit}>
                        <select id="user"
                            defaultValue=''
                            required>
                            <option value='' disabled>Select name...</option>
                            {userNames}
                        </select>
                        <button type="submit" className="user">
                            Delete User
                        </button>
                    </form>
                    {(confirmationForm === 'removeUser') && confirmation}
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    )
}