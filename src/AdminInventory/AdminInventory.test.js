import React from 'react';
import ReactDOM from 'react-dom';
import AdminInventory from './AdminInventory';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminInventory />, div);
  ReactDOM.unmountComponentAtNode(div);
});
