import {importTemplate} from '../wc-utils';

export class FlagIcon extends HTMLElement {

  _countryCode = null;
  _allCountries = [];

  _renderer = null;

  constructor() {
    super();

    // Create shadow DOM for the component.
    const template = importTemplate(require('./flag-icon.html'));
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(template);

    this._renderer = this.shadowRoot.querySelector('#renderer');
  }

  static get observedAttributes() { 
    return [
      'country',
      'all-countries'
    ]; 
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.group('attributeChangedCallback');
    console.log(name)
    // name will always be "country" due to observedAttributes
    if(name==='country'){
      this._countryCode = newValue;
    }
    if(name==='all-countries'){
      this._allCountries = newValue;
    }
    console.groupEnd();
    this._updateRendering();
  }
  connectedCallback() {    
    this._updateRendering();    
  }
  disconnectedCallback(){
    this._renderer = null;
    console.log('bye!');
  }

  set allCountries(v){
    console.log('allCountries setter', v)
    this._allCountries = v;
    this.setAttribute("all-countries", v);
  }
  get allCountries(){
    return this._allCountries;
  }

  get country() {
    return this._countryCode;
  }
  set country(v) {
    console.log('country setter', v);
    this.setAttribute("country", v);
  }

  _updateRendering() {
    // Left as an exercise for the reader. But, you'll probably want to
    // check this.ownerDocument.defaultView to see if we've been
    // inserted into a document with a browsing context, and avoid
    // doing any work if not.
    console.log('called!')
    this._renderer.innerHTML = `<p>
      hello from: <b>${this.country}</b>
      countries available: ${this.allCountries}
    </p>`;
    
  }
}