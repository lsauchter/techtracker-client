import React, {useEffect, useState, useContext} from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContextInventory from './ContextInventory'
import {findUser} from './helper'
import './AdminUsers.css'

export default function AdminUser() {
    const {users, addUser, deleteUser} = useContext(ContextInventory)
    const [confirmation, updateConfirmation] = useState({})
    const [confirmationForm, updateConfirmationForm] = useState('')
    const [addIcon, updateAddIcon] = useState('plus')
    const [addId, updateAddId] = useState('')
    const [removeIcon, updateRemoveIcon] = useState('plus')
    const [removeId, updateRemoveId] = useState('')
    const [error, updateError] = useState(null)

    function handleClick(uuid) {
        if (uuid[0] === "add") {
            updateRemoveId('rotateDown')
            updateRemoveIcon('plus')
            updateAddId('rotateUp')
            return updateAddIcon('minus')
        }
        if (uuid[0] === "remove") {
            updateAddId('rotateDown')
            updateAddIcon('plus')
            updateRemoveIcon('minus')
            return updateRemoveId('rotateUp')
        }
        else {
            updateAddId('rotateDown')
            updateAddIcon('plus')
            updateRemoveId('rotateDown')
            updateRemoveIcon('plus')
        }
    }

    const userNames = users.map(user => {
        return <option key={user.id} value={user.id}>{user.name}</option>
    })

    const addUserSubmit = (e) => {
        e.preventDefault()
        updateError(null)
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
        .catch(error => {
            updateError(error.message)
        })
    }

    const deleteUserSubmit = (e) => {
        e.preventDefault()
        updateError(null)
        const id = e.target.user.value
        const user = findUser(users, id)
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
            deleteUser(id)
            confirmationText('removeUser', {name: user.name, method: 'removed'})
        })
        .catch(error => {
            updateError(error.message)
        })
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
        <Accordion allowZeroExpanded="true" className="userAccordion" onChange={(uuid) => handleClick(uuid)}>
            <AccordionItem uuid="add">
                <AccordionItemHeading className="accordion2">
                    <AccordionItemButton>
                        Add User
                        <FontAwesomeIcon icon={addIcon} id={addId} className="angleIcon plus"/>
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
            <AccordionItem uuid="remove">
                <AccordionItemHeading className="accordion2">
                    <AccordionItemButton>
                        Remove User
                        <FontAwesomeIcon icon={removeIcon} id={removeId} className="angleIcon plus"/>
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
            <div className='error' role='alert'>
                {error && <p>{error}</p>}
            </div>
        </Accordion>
    )
}