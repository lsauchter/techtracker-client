import React, {useContext} from 'react';
import ContextForm from './ContextForm';
import './FormFieldset.css';

export default function FormFieldset(props) {
    const {category, inventory} = props
    const {inventoryNumber} = useContext(ContextForm)

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
                    name={item.category}
                    id={item.category + item.id}
                    value={item.id}
                />
                <label
                    className="checkbox"
                    htmlFor={item.category + item.id}
                >
                    {item.name}
                    <img src={item.image} alt={"image of " + item.name}/>
                </label>
                <div className="quantity">
                    <label
                        className="quantityLabel" 
                        htmlFor={'quantity' + item.id}
                    >
                        Quantity
                    </label>
                    <select 
                        id={'quantity' + item.id}
                        name={item.category + 'Quantity'}
                    >
                        {options(quantity)}
                    </select>

                </div>
            </li>
        })
        return items
    }

    return (
        <fieldset className={category}>
            <legend>{category}</legend>
            <ul className="flex">
                {items(inventory)}
            </ul>
        </fieldset>

    )

}