import React, { useContext } from 'react';
import TechContext from './TechContext';
import './CheckOut.css';

export default function CheckOut() {
    const {users, inventory} = useContext(TechContext)

    const names = users.map(user => {
        return <option key={user.id}>{user.name}</option>
    })

    const computers = inventory.map(item => {
        if (item.category === 'computer') {
            return <li key={item.id}>
                <input 
                    type="checkbox"
                    name={item.id}
                    id={item.id}
                />
                <label
                    className="checkbox"
                    htmlFor={item.id}
                >
                    {item.name}
                    <img src={item.image} />
                </label>
            </li>
        }
    })
    
    
    return (
        <>
        <form className="checkForm">
            <label htmlFor="name">Name:</label>
            <select id="name">
                {names}
            </select>
            <fieldset className="computers">
                <legend>computers</legend>
                <ul className="flex">
                    {computers}
                </ul>
            </fieldset>
        </form>
        </>
    )
}