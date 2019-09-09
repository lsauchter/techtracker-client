import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import AdminUsers from './AdminUsers'
import AdminInventory from './AdminInventory'
import AdminViewItems from './AdminViewItems'
import './AdminDashboard.css';

export default function AdminDashboard() {

    return (
        <Accordion allowZeroExpanded="true">
            <AccordionItem>
                <AccordionItemHeading aria-level="2">
                    <AccordionItemButton>
                        Users
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <AdminUsers />
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading aria-level="2">
                    <AccordionItemButton>
                        Inventory
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <AdminInventory />
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading aria-level="2">
                    <AccordionItemButton>
                        View Checked Out Items
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <AdminViewItems />
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    )
}