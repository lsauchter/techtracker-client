import React, { useState } from 'react';
import {Route, Link} from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import LandingPage from './LandingPage';
import './App.css';

function App() {
  const [users, updateUsers] = useState([]);
  const [inventory, updateInventory] = useState([]);

  function renderRoutes() {
    return (
      <>
        <Route
          exact path="/"
          component={LandingPage}
        />
        <Route
          path="/admin/login"
          component={AdminLogin}
        />
        <Route
          path="/admin/dashboard"
          component={AdminDashboard}
        />
        <Route
          path="/checkin"
          component={CheckIn}
        />
        <Route
          path="/checkout"
          component={CheckOut}
        />
      </>
    )
  }

  return (
    <div className="App">
      <header className="App_header">
        <h1>
          <Link to="/">TechTracker</Link>
        </h1>
        <div className="admin">
          <Link to="/admin/login">Admin</Link>
        </div>
      </header>
      <main className="App_main">
        {renderRoutes()}
      </main>
    </div>
  );
}

export default App;
