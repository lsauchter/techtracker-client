import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
    return (
        <>
        <div className="pageLinks">
            <Link to="/checkin"><button className="buttonLink">Check In</button></Link>
            <Link to="/checkout"><button className="buttonLink">Check Out</button></Link>
        </div>
        <div className="info">
            <p>Thanks for using TechTracker! Click the links above to enter your name and select the items you're checking in or out.
            </p>
        </div>
        </>
    )
}