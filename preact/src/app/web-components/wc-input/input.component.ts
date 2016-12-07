import style from './input.component.css';
import hintStyle from './hint.css';

export class Input extends HTMLElement {
  static get is() { return 'wc-input'}

  static get style() {
    return `
      .error-msg{}
      ${style}
      ${hintStyle}
    `
  }

  static template( css: string ) {
    return (`
      <style>${css}</style>
      <input type="text" class="c-field">
      <div class="error-msg c-hint c-hint--static c-hint--error"></div>
    `)
  }

  static get events() {
    return {
      change: 'change',
      focus: 'focus',
      blur: 'blur',
    }
  }

  static get observedAttributes() {
    return [
      'name',
      'placeholder',
      'error-msg',
      'required'
    ]
  }


  private bindings: {input:HTMLInputElement,errors:HTMLDivElement} = {
    input: null,
    errors: null,
  };

  private _required = false;
  get required() { return this._required }
  set required( val ) {
    this._required = Boolean(val);
    const isRequired = this.hasAttribute( 'required' );
    if ( isRequired ) {
      this._required = true;
    }
    if(this._required === false){
      this.removeAttribute( 'required' )
    }
  }

  private _name = '';
  get name() { return this._name }

  set name( val ) {
    this._name = val
  }

  private _value = '';
  get value() { return this._value }

  set value( val ) {
    this._value = val
    this.render();
  }

  private _errorMsg = '';
  get errorMsg() { return this._errorMsg }

  set errorMsg( val ) {
    this._errorMsg = val
    this.render();
  }

  private _placeholder = '';
  get placeholder() { return this._placeholder }
  set placeholder( val ) {
    this._placeholder = val;
    this.render();
  }

  constructor() {
    super();
    this.attachShadow( { mode: 'open' } );
    this.shadowRoot.innerHTML = Input.template( Input.style );
    this.bindings = {
      input: this.shadowRoot.querySelector( 'input' ),
      errors: this.shadowRoot.querySelector( '.error-msg' ) as HTMLDivElement,
    }

    this.registerListeners();
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback( attrName: string, oldValue: any, newValue: any ) {
    console.log( { attrName, oldValue, newValue } );
    switch ( attrName ) {
      case 'name':
        if ( oldValue === newValue ) return;
        this[ attrName ] = newValue;
        break;
      case 'placeholder':
        if ( oldValue === newValue ) return;
        this[ attrName ] = newValue;
        break;
      case 'error-msg':
        if ( oldValue === newValue ) return;
        this.errorMsg = newValue;
        break;
      case 'required':
        if ( oldValue === newValue ) return;
        this.required = newValue;
        break;
      default:
        break;
    }
  }

  private fire( evtName: string, payload: Object = null ) {
    this.dispatchEvent( new CustomEvent( evtName, { detail: payload } ) );
  }

  private render() {
    const { input, errors }  = this.bindings;
    console.info( 'RENDER!', { value: input.value, errors } );

    // input
    if ( input.value !== this.value ) {
      input.value = this.value;
    }
    if ( input.placeholder !== this.placeholder ) {
      input.placeholder = this.placeholder;
    }

    // errors
    if ( errors.textContent !== this.errorMsg ) {
      errors.textContent = this.errorMsg;
    }

  }

  private registerListeners() {
    this.bindings.input.addEventListener( 'input', ( evt: KeyboardEvent ) => {
      const value = (evt.target as HTMLInputElement).value;
      this.value = value;
      this.fire( Input.events.change, { value } );
    } );
    this.bindings.input.addEventListener( 'focus', ( evt ) => {
      this.fire( Input.events.focus )
    } )
    this.bindings.input.addEventListener( 'blur', ( evt ) => {
      this.fire( Input.events.blur )
    } )
  }
}


customElements.define( Input.is, Input );
