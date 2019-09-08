import React, {useContext} from 'react';
import ContextInventory from './ContextInventory'
import './AdminDashboard.css';

export default function AdminDashboard() {
    const {users, inventory, addUser, deleteUser, addInventory, deleteInventory} = useContext(ContextInventory)

    const inventoryNames = inventory.map(item => {
        return <option key={item.id} value={item.name}>{item.name}</option>
    })

    const addUserSubmit = (e) => {
        e.preventDefault()
        const name = e.target.addUser.value
        addUser(name)
    }

    const deleteUserSubmit = (e) => {
        e.preventDefault()
        const name = e.target.deleteUser.value
        deleteUser(name)
    }

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

    const checkedOutList = users.map(user => {
        if(Object.keys(user.checkedOut).length > 0) {
            console.log(user.checkedOut)
            const ids = Object.keys(user.checkedOut)
            const itemList = ids.map(item => {
                const name = inventory.find(inv => inv.id === Number(item)).name
                return `${user.checkedOut[Number(item)]} ${name}`
            }).join(', ')
            
            return <div className="checkedOutItem" key={user.id}>
                <p>{user.name} has {itemList} checked out</p>
            </div>
        }
        return <></>
    })

    return (
        <div className="dashboard">
            <h2>Users</h2>
                <h3>Add User</h3>
                    <form onSubmit={addUserSubmit}>
                        <input
                            type="text"
                            name="addUser"
                            id="addUser"
                        />
                        <button type="submit" className="user">
                            Add User
                        </button>
                    </form>
                <h3>Remove User</h3>
                    <form onSubmit={deleteUserSubmit}>
                            <input
                                type="text"
                                name="deleteUser"
                                id="deleteUser"
                            />
                            <button type="submit" className="user">
                                Delete User
                            </button>
                        </form>
            <h2>Inventory</h2>
                <h3>Add Items</h3>
                    <form onSubmit={addInventorySubmit}>
                        <label htmlFor="name">
                            Name
                        </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                            />
                        <label htmlFor="quantity">
                            Quantity
                        </label>
                            <input
                                type="text"
                                name="quantity"
                                id="quantity"
                            />
                        <label htmlFor="category">Category</label>
                            <select id="category">
                                <option value="computer">Computer</option>
                                <option value="tablet">Tablet</option>
                            </select>
                        <label htmlFor="image">
                            Image URL
                        </label>
                            <input
                                type="text"
                                name="image"
                                id="image"
                            />
                        <button type="submit" className="item">
                            Add Item
                        </button>
                    </form>
                <h3>Remove Items</h3>
                    <form onSubmit={deleteInventorySubmit}>
                        <label htmlFor="item">Item</label>
                        <select id="item">
                            {inventoryNames}
                        </select>
                        <button type="submit" className="item">
                            Delete Item
                        </button>
                    </form>
                <h3>View Checked Out Items</h3>
                    {checkedOutList}
        </div>
    )
}