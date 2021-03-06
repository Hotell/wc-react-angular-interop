import { importTemplate } from '../wc-utils';
const template = `
<template id="flag-icon">
  <style>
    :host{
      display:block;
      background-color: tomato;
      padding: 1rem;
    }
    button{
      padding: 1.5rem;
    }
  </style>
  <i>Icon</i>
  <slot></slot>
  <div id="renderer"></div>
  <button type="button" id="clicker">click me to trigger custom event</button>
</template>
`;

export class FlagIcon extends HTMLElement {

  _countryCode = null;
  _allCountries = [];

  _renderer = null;
  _eventListeners = [];

  static get is() {return 'flag-icon'}
  static EVENTS = {
    iconClicked: 'icon-clicked'
  };

  constructor() {
    super();

    // Create shadow DOM for the component.
    const template = importTemplate( template );
    const shadowRoot = this.attachShadow( { mode: 'open' } );
    shadowRoot.appendChild( template );

    this._renderer = this.shadowRoot.querySelector( '#renderer' );
    this._eventListeners.push(
      this.shadowRoot.querySelector( '#clicker' ).addEventListener( 'click', ( e ) => {
        this.onClickHandler();
      } )
    );

  }

  onClickHandler() {
    this.shadowRoot.dispatchEvent( new CustomEvent( FlagIcon.EVENTS.iconClicked, {
      bubbles: true,
      composed: true,
      detail: { message: 'ICON CLICKED!' }
    } ) );
  }

  static get observedAttributes() {
    return [
      'country',
      'all-countries'
    ];
  }

  attributeChangedCallback( name, oldValue, newValue ) {
    console.group( 'attributeChangedCallback' );
    console.log( name )
    // name will always be "country" due to observedAttributes
    if ( name === 'country' ) {
      this._countryCode = newValue;
    }
    if ( name === 'all-countries' ) {
      this._allCountries = newValue;
    }
    console.groupEnd();
    this._updateRendering();
  }

  connectedCallback() {
    console.info('Attached!')
    this._updateRendering();
  }

  disconnectedCallback() {
    console.info('Detached!')
    this._renderer = null;
    this._eventListeners.forEach( unmountEvent => this.shadowRoot.removeEventListener( 'click', unmountEvent ) );
    console.log( 'bye!' );
  }

  set allCountries( v ) {
    console.log( 'allCountries setter', v )
    this._allCountries = v;
    this.setAttribute( "all-countries", v );
  }

  get allCountries() {
    return this._allCountries;
  }

  get country() {
    return this._countryCode;
  }

  set country( v ) {
    console.log( 'country setter', v );
    this.setAttribute( "country", v );
  }

  _updateRendering() {
    // Left as an exercise for the reader. But, you'll probably want to
    // check this.ownerDocument.defaultView to see if we've been
    // inserted into a document with a browsing context, and avoid
    // doing any work if not.
    console.log( 'called!' )
    this._renderer.innerHTML = `<p>
      hello from: <b>${this.country}</b>
      countries available: ${this.allCountries}
    </p>`;

  }
}
