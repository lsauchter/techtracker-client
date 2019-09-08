import React, {useContext} from 'react';
import ContextForm from './ContextForm';
import FormFieldset from './FormFieldset';
import './Form.css';

export default function Form() {
    const {users, inventory, setUser, history} = useContext(ContextForm)
    const computers = inventory.filter(item => item.category === 'computer')
    const tablets = inventory.filter(item => item.category === 'tablet')
    
    const names = users.map(user => {
        return <option key={user.id}>{user.name}</option>
    })

    const handleSubmit = e => {
        e.preventDefault()
        history.push('/')
    }

    return (
        <form onSubmit={handleSubmit} className="checkForm" id="checkForm">
            <label htmlFor="name">Name:</label>
            <select
                id="name"
                onChange={e => setUser(e.target.value)}>
                {names}
            </select>
            {(computers.length > 0) && <FormFieldset category="Computers" inventory={computers}/>}
            {(tablets.length > 0) && <FormFieldset category="Tablets" inventory={tablets}/>}
        </form>
    )
}