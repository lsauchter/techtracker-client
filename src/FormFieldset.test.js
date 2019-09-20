import React from 'react';
import ReactDOM from 'react-dom';
import FormFieldset from './FormFieldset';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FormFieldset />, div);
  ReactDOM.unmountComponentAtNode(div);
});
