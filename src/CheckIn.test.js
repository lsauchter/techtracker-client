import React from 'react';
import ReactDOM from 'react-dom';
import CheckIn from './CheckIn';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CheckIn />, div);
  ReactDOM.unmountComponentAtNode(div);
});
