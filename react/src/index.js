import {registerWC} from './web-components';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

window.polyfilsLoaded.then( () => {
  registerWC();
  ReactDOM.render(
    <App />,
    document.getElementById( 'root' )
  );
} );

