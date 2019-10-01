import React, {useContext} from 'react'
import ContextInventory from '../ContextInventory'
import {findInventory} from '../helper'
import './AdminViewItems.css'

export default function AdminViewItems() {
    const {users, inventory} = useContext(ContextInventory)

    const checkedOutList = users.map(user => {
        if(Object.keys(user.checkedOut).length > 0) {
            const ids = Object.keys(user.checkedOut)
            const itemList = ids.map(item => {
                const name = findInventory(inventory, item).name
                return <li key={item}>{user.checkedOut[Number(item)]} {name}</li>
            })
            
            return <div className="checkedOutItem" key={user.id}>
                <p className="viewListUser">{user.name} has checked out</p>
                <ul className="viewList">{itemList}</ul>
            </div>
        }
        return true
    })

    return (
        <>
        {checkedOutList}
        </>
    )
}