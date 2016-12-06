export class Input extends HTMLElement {
  static get is(){ return 'wc-input'}
  static get style(){
    return (`
    .c-label {
      padding: 1em 0
    }

    .c-field {
      display: block;
      margin: 0;
      padding: .5em;
      border: 1px solid #96a8b2;
      border-radius: 4px;
      outline: 0;
      background-color: #fff;
      font-family: inherit;
      font-size: 1em;
      font-weight: 400;
      resize: vertical;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none
    }
    .error-msg{
      color:tomato;
      font-style: italic;
    }
    `)
  }
  static template(css:string){
    return (`
      <style>${css}</style>
      <input type="text" class="c-field">
      <p class="error-msg"></p>
    `)
  }
  static get events(){
    return {
      change:'change',
      focus: 'focus',
      blur: 'blur',
    }
  }
  private bindings: {
    input:HTMLInputElement,
    errors: HTMLParagraphElement,
  };

  private _value: string;
  get value(){ return this._value }
  set value(val:string){
    this._value = val
    this.render();
  }

  private _errorMsg: string;
  get errorMsg(){ return this._errorMsg }
  set errorMsg(val:string){
    this._errorMsg = val
    this.render();
  }

  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = Input.template(Input.style);
    this.bindings = {
      input: this.shadowRoot.querySelector('input'),
      errors: this.shadowRoot.querySelector('p'),
    }

    this.registerListeners();
  }
  connectedCallback(){
    this.render();
  }
  private fire(evtName: string, payload = null) {
    this.dispatchEvent(new CustomEvent(evtName, {detail: payload}));
  }

  private render() {
    console.info('REDNER',this.bindings.input.value,this.bindings.errors)
    if ( this.bindings.input.value !== this.value ) {
      this.bindings.input.value = this.value;
    }
    if ( this.bindings.errors.textContent !== this.errorMsg ) {
      this.bindings.errors.textContent = this.errorMsg;
    }
  }
  private registerListeners(){
    this.bindings.input.addEventListener('input', (evt:KeyboardEvent) => {
      const value = (evt.target as HTMLInputElement).value;
      this.value = value;
      this.fire(Input.events.change,{value});
    });
    this.bindings.input.addEventListener('focus',(evt) => {
      this.fire(Input.events.focus)
    })
    this.bindings.input.addEventListener('blur',(evt) => {
      this.fire(Input.events.blur)
    })
  }
}


customElements.define(Input.is,Input);
