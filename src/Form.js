import React from 'react';
import './Form.css';

export default function Form(props) {
    const {users, inventory, inventoryNumber, buttonName} = props.formProps
    const computers = inventory.filter(item => item.category === 'computer')
    const tablets = inventory.filter(item => item.category === 'tablet')
    
    const names = users.map(user => {
        return <option key={user.id}>{user.name}</option>
    })

    function options(quantity) {
        const optionList = quantity.map(num => {
            return <option key={num + 'qo'}>{num}</option>
        })
        return optionList
    }

    function items(tech) {
        const items = tech.map(item => {
            const itemNumber = inventoryNumber[item.id]
            const quantity = []
            for (let i = 1; i <= itemNumber; i++) {
                quantity.push(i)
            }

            return <li key={item.id}>
                <input 
                    type="checkbox"
                    name={item.category + '[item.id][itemId]'}
                    id={item.id}
                />
                <label
                    className="checkbox"
                    htmlFor={item.id}
                >
                    {item.name}
                    <img src={item.image} alt={"image of " + item.name}/>
                </label>
                <div className="quantity">
                    <label
                        className="quantityLabel" 
                        htmlFor={item.id + 'quantity'}
                    >
                        Quantity
                    </label>
                    <select 
                        id={item.id + 'quantity'}
                        name={item.category + '[item.id][quantity]'}
                    >
                        {options(quantity)}
                    </select>

                </div>
            </li>
        })
        return items
    }

    function computerList() {
        if(computers) {
            return (
                <fieldset className="computers">
                    <legend>Computers</legend>
                    <ul className="flex">
                        {items(computers)}
                    </ul>
                </fieldset>
            )
        }
        else {
            return (<></>)
        }
    }

    function tabletList() {
        if(tablets) {
            return (<fieldset className="tablets">
                    <legend>Tablets</legend>
                    <ul className="flex">
                        {items(tablets)}
                    </ul>
                </fieldset>
            )
        }
        else {
            return (<></>)
        }
    }


    return (
        <form className="checkForm">
            <label htmlFor="name">Name:</label>
            <select
                id="name"
                onChange={e => props.setUser(e.target.value)}>
                {names}
            </select>
            {computerList()}
            {tabletList()}
            <button type="submit">
                {buttonName}
            </button>
        </form>
    )
}