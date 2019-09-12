import React, {useState, useContext} from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import ContextInventory from './ContextInventory'
import './AdminInventory.css'

export default function AdminInventory() {
    const {inventory, addInventory, deleteInventory} = useContext(ContextInventory)
    const [confirmation, updateConfirmation] = useState({})
    const [confirmationForm, updateConfirmationForm] = useState('')

    const inventoryNames = inventory.map(item => {
        return <option key={item.id} value={item.name}>{item.name}</option>
    })

    const addInventorySubmit = (e) => {
        e.preventDefault()
        const {name, quantity, category, image} = e.target
        const item = {
            name: name.value,
            quantity: Number(quantity.value),
            category: category.value,
            image: image.value
        }
        addInventory(item)
        confirmationText('addItem', {name: item.name, method: 'added'})
        e.target.reset();
    }

    const deleteInventorySubmit = e => {
        e.preventDefault()
        const item = e.target.item.value
        deleteInventory(item)
        confirmationText('removeItem', {name: item, method: 'removed'})
        e.target.reset();
    }

    function confirmationText(form, data) {
        updateConfirmationForm(form)
        updateConfirmation(() => {
            return (<p className="confirmation" role='alert'>
              {data.name} {data.method}</p>
            )}
            )
        setTimeout(() => {updateConfirmation('')}, 5000);
    }

    return (
        <Accordion allowZeroExpanded="true" className="inventoryAccordion">
            <AccordionItem>
                <AccordionItemHeading className="accordion2">
                    <AccordionItemButton>
                        Add Items
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <form onSubmit={addInventorySubmit} className="addFormContainer">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="name">
                                        Name
                                    </label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="quantity">
                                        Quantity
                                    </label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="quantity"
                                        id="quantity"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="category">
                                        Category
                                    </label>
                                </td>
                                <td className="left">
                                    <select
                                        id="category"
                                        defaultValue=""
                                        required
                                        >
                                        <option value="" disabled>Select...</option>
                                        <option value="computer">Computer</option>
                                        <option value="tablet">Tablet</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="image">
                                        Image URL
                                    </label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="image"
                                        id="image"
                                    />
                                </td>
                            </tr>
                        </tbody>
                        </table>
                        <button type="submit" className="item">
                            Add Item
                        </button>
                    </form>
                    {(confirmationForm === 'addItem') && confirmation}
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading className="accordion2">
                    <AccordionItemButton>
                        Remove Items
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <form onSubmit={deleteInventorySubmit}>
                        <select
                            id="item"
                            defaultValue=""
                            required
                            >
                            <option value="" disabled>Select item</option>
                            {inventoryNames}
                        </select>
                        <button type="submit" className="item">
                            Delete Item
                        </button>
                    </form>
                    {(confirmationForm === 'removeItem') && confirmation}
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    )
}