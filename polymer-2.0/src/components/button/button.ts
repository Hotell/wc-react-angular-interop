import { Polymer, createTemplateFromString } from '../utils';

export class MyButton extends Polymer.Element {

  static get is() { return 'my-button' }

  static get template() {
    const content = `
      <template>
        <style>
          :host {
            display: inline-block;
            border: 1px solid black;
            padding: 1em;
            cursor: pointer;
            background-color: beige;
          }
          :host:active, :host:focus{
            border: 1px solid olive;
          }
        </style>
        <div>
          <slot>Hello button!</slot>
          <b>[[foo]]</b>
          <div>clicked <span>[[clicked]]</span> x</div>
        </div>
      </template>
    `;
    return createTemplateFromString(content);
  }
  static get config() {
    return {
      properties:{
        // oh look at this duplicity
        // @TODO decorators needed
        foo: {
          type: String,
          reflectToAttribute: true,
          observer: '_onFooChange'
        },
        clicked: Number
      }/* properties, observers meta data */ }
  }

  foo: string;
  clicked: number = 0;

  constructor(){
    super();
  }

  connectedCallback(){
    super.connectedCallback();
    this.addEventListener( 'click', ( e ) => this.handleClick( e ) )
  }

  ready(){
    // Polymer bug! in docs it's stated tahat ensureAttribute exist but it doesn't
    this._ensureAttribute( 'type', 'button' );
    this._ensureAttribute( 'role', 'button' );
    this._ensureAttribute( 'tabindex', 0 );
    super.ready();
  }

  handleClick( e: Event ) {
    console.log( e.type );
    this.clicked++;
  }

  private _onFooChange() {
    console.log( `foo changed!`, this.foo )
  }
}
