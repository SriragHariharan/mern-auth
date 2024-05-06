import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
// import Popper from 'popper.js';
import { Provider } from 'react-redux'
import { store } from './redux-tk/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
              <App />
        </Provider>
  );
