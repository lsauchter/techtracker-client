import React, { useState } from 'react';
import {Route, Link} from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import LandingPage from './LandingPage';
import ContextInventory from './ContextInventory';
import STORE from './store';
import './App.css';

function App() {
  const [users, updateUsers] = useState(STORE.users);
  const [inventory, updateInventory] = useState(STORE.inventory);

  /* handle check in and out form submission */
  const checkForm = (user, data, checkMethod) => {
    if(checkMethod === 'checkOut') {
      checkOutUser(user, data)
      checkOutInventory(data)
    }
    if(checkMethod === 'checkIn') {
      checkInUser(user, data)
      checkInInventory(data)
    }
  }

  function checkOutUser(user, data) {
    const userToUpdate = users.find(person => person.id === user)
    updateUsers(() => {
      userToUpdate.checkedOut = {
        ...userToUpdate.checkedOut,
        ...data
      }
      return users
    })
  }

  function checkOutInventory(data) {
    const items = Object.keys(data).map(Number)
    items.forEach(item => {
      const itemToUpdate = inventory.find(tech => tech.id === item)
      const currentNum = itemToUpdate.quantityAvailable
      updateInventory(() => {
        itemToUpdate.quantityAvailable = (currentNum - data[item])
        return inventory
      })
    })
  }

  function checkInUser(user, data) {
    const userToUpdate = users.find(person => person.id === user)
    const items = Object.keys(data).map(Number)
    items.forEach(item => {
      const currentNum = userToUpdate.checkedOut[item]
      updateUsers(() => {
        userToUpdate.checkedOut[item] = (currentNum - data[item])
        if (userToUpdate.checkedOut[item] === 0) {
          delete userToUpdate.checkedOut[item]
        }
        return users
      })
    })
  }

  function checkInInventory(data) {
    const items = Object.keys(data).map(Number)
    items.forEach(item => {
      const itemToUpdate = inventory.find(tech => tech.id === item)
      const currentNum = itemToUpdate.quantityAvailable
      updateInventory(() => {
        itemToUpdate.quantityAvailable = (currentNum + data[item])
        return inventory
      })
    })
  }


  const contextValue = {
    users,
    inventory,
    checkForm
  }

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
    <ContextInventory.Provider value={contextValue}>
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
    </ContextInventory.Provider>
  );
}

export default App;
