import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx';
import './index.css';
import GlobalReminder from './ui/GlobalReminder.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <GlobalReminder />
    </Provider>
  </React.StrictMode>
);
