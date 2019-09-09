import React, {useContext} from 'react'
import ContextInventory from './ContextInventory'
import './AdminViewItems.css'

export default function AdminViewItems() {
    const {users, inventory} = useContext(ContextInventory)

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
        <>
        {checkedOutList}
        </>
    )
}