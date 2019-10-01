import React from 'react';
import ReactDOM from 'react-dom';
import AdminViewItems from './AdminViewItems';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminViewItems />, div);
  ReactDOM.unmountComponentAtNode(div);
});
