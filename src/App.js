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
  const [confirmation, updateConfirmation] = useState('')

  /* handle check in and out form submission */
  const checkForm = (user, data, checkMethod) => {
    if(checkMethod === 'checked out') {
      checkOutUser(user, data)
      checkOutInventory(data)
      confirmationText(user, data, checkMethod)
    }
    if(checkMethod === 'checked in') {
      checkInUser(user, data)
      checkInInventory(data)
      confirmationText(user, data, checkMethod)
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

  function confirmationText(user, data, checkMethod) {
    const itemList = Object.keys(data).map(Number)
    const items = itemList.map(listItem => {
      const itemData = inventory.find(item => item.id === listItem)
      return `${data[listItem]} ${itemData.name}`
      }).join(', ')
    const name = users.find(person => person.id === user).name
    updateConfirmation(() => {
    return (<p className="confirmation" role='alert'>
      {name} {checkMethod} {items}</p>
    )}
    )
    setTimeout(() => {updateConfirmation('')}, 5000);
  }

  /* handle Admin actions */
  function addUser(name) {
    const newId = users[users.length - 1].id + 1
    const newUser = {
      id: newId,
      name,
      checkedOut: {}
    }
    updateUsers(() => {
      const newUsers = [...users, newUser]
      return newUsers
    })
  }

  function deleteUser(name) {
    updateUsers(() => {
      const newUsers = users.filter(person => person.name !== name)
      return newUsers
    })
  }

  function addInventory(item) {
    const newId = inventory[inventory.length - 1].id + 1
    const {name, quantity, category, image} = item
    const newItem = {
      id: newId,
      name,
      quantity,
      quantityAvailable: quantity,
      category,
      image
    }
    updateInventory(() => {
      const newItems = [...inventory, newItem]
      return newItems
    })
  }

  function deleteInventory(name) {
    updateInventory(() => {
      const newItems = inventory.filter(item => item.name !== name)
      return newItems
    })
  }

  const contextValue = {
    users,
    inventory,
    checkForm,
    confirmation,
    addUser,
    deleteUser,
    addInventory,
    deleteInventory
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
        <h1 className="title_header">
          <Link to="/" className="title">TechTracker</Link>
        </h1>
        <Link to="/admin/login" className="adminLink">
            <button className="admin">Admin</button>
        </Link>
      </header>
      <main className="App_main">
        {renderRoutes()}
      </main>
    </div>
    </ContextInventory.Provider>
  );
}

export default App;
