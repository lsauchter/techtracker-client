import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import ContextForm from '../ContextForm';
import FormFieldset from '../FormFieldset/FormFieldset';
import './Form.css';

export default function Form() {
    const {users, inventory, setUser} = useContext(ContextForm)
    const [touched, updateTouch] = useState(false)
    const computers = inventory.filter(item => item.category === 'computer')
    const tablets = inventory.filter(item => item.category === 'tablet')
    const [compClass, updateCompClass] = useState('')
    const [tabClass, updateTabClass] = useState('')
    
    const names = users.map(user => {
        return <option key={user.id}>{user.name}</option>
    })

    useEffect(() => {
        if (computers.length === 0) {
            updateTabClass('flexOne')
        }
        if (tablets.length === 0) {
            updateCompClass('flexOne')
        }
        if (computers.length > 0) {
            updateTabClass('')
        }
        if (tablets.length > 0) {
            updateCompClass('')
        }
    }, [computers, tablets])
    

    const EmptyForm = () => { 
        return (<div className="emptyForm">
            <p>Nothing checked out</p>
            <Link to="/checkout">
                <button className="checkOutLink">
                    Go to Check Out
                </button>
            </Link>
            </div>)
        }

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className="checkForm" id="checkForm">
            <fieldset className="namesFieldset">
                <legend>Name</legend>
                <select
                    id="name"
                    onChange={e => setUser(e.target.value)}
                    onFocus={() => {updateTouch(() => true)}}
                    className="names"
                    defaultValue=''
                    required
                    >
                    <option value='' disabled>Select name...</option>
                    {names}
                </select>
            </fieldset>
            <div className="fieldsetFlex">
            {(touched) && (computers.length > 0) && <FormFieldset category="Computers" inventory={computers} flexOne={compClass}/>}
            {(touched) && (tablets.length > 0) && <FormFieldset category="Tablets" inventory={tablets} flexOne={tabClass}/>}
            {(touched) && (computers.length === 0) && (tablets.length === 0) && <EmptyForm />}
            </div>
       </form>
    )
}