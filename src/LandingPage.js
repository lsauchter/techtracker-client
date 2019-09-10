import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import ContextInventory from './ContextInventory';
import './LandingPage.css';

export default function LandingPage() {
    const {confirmation} = useContext(ContextInventory)
    return (
        <>
        <div className="pageLinks">
            <Link to="/checkin" className="checkLink"><button className="buttonLink">Check In</button></Link>
            <Link to="/checkout" className="checkLink"><button className="buttonLink">Check Out</button></Link>
        </div>
        <div className="info">
            <p>Thanks for using TechTracker! Click the links above to enter your name and select the items you're checking in or out. For testing, you can use the username "test" and password "test" to access the admin dashboard.
            </p>
        </div>
        <div>
            {confirmation}
        </div>
        </>
    )
}