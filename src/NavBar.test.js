import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import ContextMenu from './ContextMenu';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><ContextMenu.Provider value={{isMenuOpen: false}}><NavBar isMenuOpen={false}/></ContextMenu.Provider></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
