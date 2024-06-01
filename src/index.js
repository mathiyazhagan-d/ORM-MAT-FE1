// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import { Provider } from 'react-redux'
// import store from './store'


// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

// Create a root
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
