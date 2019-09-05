import React, {useContext} from 'react';
import ContextForm from './ContextForm';
import FormFieldset from './FormFieldset';
import './Form.css';

export default function Form(props) {
    const {users, inventory, buttonName, setUser} = useContext(ContextForm)
    const computers = inventory.filter(item => item.category === 'computer')
    const tablets = inventory.filter(item => item.category === 'tablet')
    
    const names = users.map(user => {
        return <option key={user.id}>{user.name}</option>
    })

    const handleSubmit = e => {
        e.preventDefault()
        console.log(e.target.computer[1].value)
    }

    return (
        <form onSubmit={handleSubmit} className="checkForm">
            <label htmlFor="name">Name:</label>
            <select
                id="name"
                onChange={e => setUser(e.target.value)}>
                {names}
            </select>
            {(computers.length > 0) && <FormFieldset category="Computers" inventory={computers}/>}
            {(tablets.length > 0) && <FormFieldset category="Tablets" inventory={tablets}/>}
            <button type="submit">
                {buttonName}
            </button>
        </form>
    )
}