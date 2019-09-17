import React, { useState, useEffect } from 'react';
import {Route, Link} from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import LandingPage from './LandingPage';
import ContextInventory from './ContextInventory';
import { findUser, findInventory } from './helper';
import './App.css';

function App() {
  const [users, updateUsers] = useState([]);
  const [inventory, updateInventory] = useState([]);
  const [confirmation, updateConfirmation] = useState('')

  /* initial data fetch */
  useEffect(() => {
    const userURL = 'https://boiling-bayou-06844.herokuapp.com/api/users'
    const inventoryURL = 'https://boiling-bayou-06844.herokuapp.com/api/inventory'
    const checkoutURL = 'https://boiling-bayou-06844.herokuapp.com/api/users/checkout'
    Promise.all([fetch(userURL), fetch(inventoryURL), fetch(checkoutURL)])
      .then(([userRes, inventoryRes, checkoutRes]) => {
        if (!userRes) {
          return userRes.json().then(error => Promise.reject(error))
        }
        if (!inventoryRes) {
          return inventoryRes.json().then(error => Promise.reject(error))
        }
        if (!checkoutRes) {
          return inventoryRes.json().then(error => Promise.reject(error))
        }
        return Promise.all([userRes.json(), inventoryRes.json(), checkoutRes.json()])
      })
      .then(([userRes, inventoryRes, checkoutRes]) => {
        /* formatting checkout data to a more useable structure */
        const completeUsers = userRes.map(user => {
          const checkoutData = checkoutRes.filter(item => item.user_id === user.id)
          let formattedData = {}
          checkoutData.forEach(data => {
            formattedData = {
            ...formattedData,
            [data.inventory_id]: data.quantity
            }
          })
          const updatedUser = {
            ...user,
            checkedOut: {
              ...formattedData
            }
          }
          return updatedUser
        })
        updateUsers(completeUsers)
        updateInventory(inventoryRes)
      })
  }, [])

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
    const userToUpdate = findUser(users, user)
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
      const itemToUpdate = findInventory(inventory, item)
      const currentNum = itemToUpdate.quantityAvailable
      updateInventory(() => {
        itemToUpdate.quantityAvailable = (currentNum - data[item])
        return inventory
      })
    })
  }

  function checkInUser(user, data) {
    const userToUpdate = findUser(users, user)
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
      const itemToUpdate = findInventory(inventory, item)
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
      const itemData = findInventory(inventory, listItem)
      return `${data[listItem]} ${itemData.name}`
      }).join(', ')
    const name = findUser(users, user).name
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
