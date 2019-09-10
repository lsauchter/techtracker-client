import React, {useContext} from 'react'
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
        console.log(item, 'added')
    }

    const deleteInventorySubmit = e => {
        e.preventDefault()
        const item = e.target.item.value
        console.log(item)
        deleteInventory(item)
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
                                    <select id="category">
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
                        <select id="item">
                            {inventoryNames}
                        </select>
                        <button type="submit" className="item">
                            Delete Item
                        </button>
                    </form>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    )
}