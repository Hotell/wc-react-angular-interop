// import {loadShadowDOMPolyfill} from './polyfill';
// import {registerWC} from './web-components';

if('customElements' in window){
  customElements.forcePolyfill = true
}

import '@webcomponents/custom-elements/src/native-shim';
import '@webcomponents/custom-elements';
import '@webcomponents/shadydom';
import 'blaze';
import 'blaze/dist/blaze.colors.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import './web-components';
import App from './App';
import './index.css';

// loadShadowDOMPolyfill.then( () => {
//   registerWC();
// } );
ReactDOM.render(
  <App />,
  document.getElementById( 'root' )
);

