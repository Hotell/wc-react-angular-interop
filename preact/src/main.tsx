if ( 'customElements' in window ) {
  customElements.forcePolyfill = true
}

import '@webcomponents/custom-elements/src/native-shim';
import '@webcomponents/custom-elements';
import '@webcomponents/shadydom';

import './style.css'

import { render, h } from 'preact';

import App from './app/App';


const mountPoint = document.getElementById( 'app' );

render( <App/>, mountPoint );

