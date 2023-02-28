import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DataLayer } from './config/dataLayer';
import { reducer , initialState } from './config/reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DataLayer initialState={initialState} reducer={reducer} >
      <React.StrictMode>
        <App />
      </React.StrictMode> 
  </DataLayer>
);

