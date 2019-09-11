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
            <fieldset className="namesFieldset">
                <legend>Name</legend>
                <select
                    id="name"
                    onChange={e => setUser(e.target.value)}
                    className="names"
                    defaultValue=''
                    required
                    >
                    <option value='' disabled>Select name...</option>
                    {names}
                </select>
            </fieldset>
            <div className="fieldsetFlex">
            {(computers.length > 0) && <FormFieldset category="Computers" inventory={computers}/>}
            {(tablets.length > 0) && <FormFieldset category="Tablets" inventory={tablets}/>}
            </div>
       </form>
    )
}