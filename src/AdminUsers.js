import React, {useContext} from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import ContextInventory from './ContextInventory'
import './AdminUsers.css'

export default function AdminUser() {
    const {users, addUser, deleteUser} = useContext(ContextInventory)

    const userNames = users.map(user => {
        return <option key={user.id} value={user.name}>{user.name}</option>
    })

    const addUserSubmit = (e) => {
        e.preventDefault()
        const name = e.target.addUser.value
        addUser(name)
        e.target.reset();
    }

    const deleteUserSubmit = (e) => {
        e.preventDefault()
        const name = e.target.user.value
        deleteUser(name)
        e.target.reset();
    }

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
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    )
}