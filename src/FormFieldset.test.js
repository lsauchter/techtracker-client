import React from 'react';
import ReactDOM from 'react-dom';
import FormFieldset from './FormFieldset';

it('renders without crashing', () => {
  const computers = [{
        id: 1,
        name: 'Purple Mac',
        quantity: 6,
        quantityAvailable: 4,
        category: 'computer',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51et4LzjJxL._SL1000_.jpg'
        },
        {
        id: 2,
        name: 'Red Mac',
        quantity: 6,
        quantityAvailable: 4,
        category: 'computer',
        image: 'https://images-na.ssl-images-amazon.com/images/I/515I48-ZKKL._SL1000_.jpg'
        }]
  const div = document.createElement('div');
  ReactDOM.render(<FormFieldset category="Computers" inventory={computers}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
