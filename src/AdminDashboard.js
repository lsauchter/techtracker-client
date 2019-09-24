import React, {useState} from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AdminUsers from './AdminUsers'
import AdminInventory from './AdminInventory'
import AdminViewItems from './AdminViewItems'
import './AdminDashboard.css';

export default function AdminDashboard() {
    const [userIcon, updateUserIcon] = useState('')
    const [inventoryIcon, updateInventoryIcon] = useState('')
    const [viewIcon, updateViewIcon] = useState('')

    function handleClick(uuid) {
        if (uuid[0] === "User") {
            updateInventoryIcon('rotateDown')
            updateViewIcon('rotateDown')
            return updateUserIcon('rotateUp')
        }
        if (uuid[0] === "Inventory") {
            updateUserIcon('rotateDown')
            updateViewIcon('rotateDown')
            return updateInventoryIcon('rotateUp')
        }
        if (uuid[0] === "View") {
            updateUserIcon('rotateDown')
            updateInventoryIcon('rotateDown')
            return updateViewIcon('rotateUp')
        }
        else {
            updateUserIcon('rotateDown')
            updateInventoryIcon('rotateDown')
            updateViewIcon('rotateDown')
        }
    }

    return (
        <Accordion allowZeroExpanded="true" onChange={(uuid) => handleClick(uuid)}>
            <AccordionItem uuid="User">
                <AccordionItemHeading aria-level="2" className="dashboard_heading">
                    <AccordionItemButton>
                        Users
                        <FontAwesomeIcon icon={'angle-down'} id={userIcon} className="angleIcon"/>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <AdminUsers />
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem uuid="Inventory">
                <AccordionItemHeading aria-level="2" className="dashboard_heading">
                    <AccordionItemButton>
                        Inventory
                        <FontAwesomeIcon icon={'angle-down'} id={inventoryIcon} className="angleIcon"/>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <AdminInventory />
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem uuid="View">
                <AccordionItemHeading aria-level="2" className="dashboard_heading">
                    <AccordionItemButton>
                        View Checked Out Items
                        <FontAwesomeIcon icon={'angle-down'} id={viewIcon} className="angleIcon"/>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="viewItems">
                    <AdminViewItems />
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    )
}