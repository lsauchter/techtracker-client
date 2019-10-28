import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import ContextMenu from "../ContextMenu";
import "./NavBar.css";

export default function NavBar() {
  const { isMenuOpen, handleStateChange, closeMenu } = useContext(ContextMenu);

  return (
    <nav role="navigation">
      <Menu
        disableAutoFocus
        isOpen={isMenuOpen}
        onStateChange={state => handleStateChange(state)}
      >
        <Link to="/" onClick={() => closeMenu()}>
          Home
        </Link>
        <Link to="/checkout" onClick={() => closeMenu()}>
          Check Out
        </Link>
        <Link to="/checkin" onClick={() => closeMenu()}>
          Check In
        </Link>
        <Link to="/admin" onClick={() => closeMenu()}>
          Admin Dashboard
        </Link>
      </Menu>
      <Link to="/admin" className="adminLink">
        <button className="admin">Admin</button>
      </Link>
    </nav>
  );
}
