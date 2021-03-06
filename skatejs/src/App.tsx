import 'material-design-lite/material.js';
import { Component, define, prop, props } from 'skatejs';

import './components';
import React from './shared/jsx';

type BtnConfig = {
  raised: boolean,
  colored: boolean,
  primary: boolean,
  accent: boolean,
  fab: boolean,
  fabMini: boolean
};


const ButtonConfigurator = ( { elem } ) => {
  return (
    <div>
      <h4>button configurator</h4>
      <form>
        <label>
          <input type="checkbox" onChange={()=>elem.toggleButtonType('raised')}/>
          Raised
        </label>
        <label>
          <input type="checkbox" onChange={()=>elem.toggleButtonType('colored')}/>
          Colored
        </label>
        <label>
          <input type="checkbox" onChange={()=>elem.toggleButtonType('primary')}/>
          Primary
        </label>
        <label>
          <input type="checkbox" onChange={()=>elem.toggleButtonType('accent')}/>
          Accent
        </label>
        <label>
          <input type="checkbox" onChange={()=>elem.toggleButtonType('fab')}/>
          Fab
        </label>
        <label>
          <input type="checkbox" onChange={()=>elem.toggleButtonType('fabMini')}/>
          Mini Fab(needs to has fab active)
        </label>
        <label>
          <input type="checkbox" onChange={()=>elem.toggleButtonType('disabled')}/>
          Disabled
        </label>
      </form>
      <paper-button {...elem.buttonConfig}>Configure me!</paper-button>
    </div>)};
export class App extends Component {

  private buttonConfig: BtnConfig;
  private isRaised: boolean;

  static get is() { return 'my-app' }

  static props = {
    isRaised: prop.boolean( { default: false } ),
    buttonConfig: {
      default: {
        raised: false,
        colored: false,
        primary: false,
        accent: false,
        fab: false,
        miniFab: false
      }
    },
  };

  static attached(elem: App){}

  static render( elem: App ) {

    return ([
      <style>{`
        fieldset{
          padding:1rem
        }
      `}</style>,
      <section>

        <fieldset>
          <legend>Card</legend>
          <paper-card hello="World">
            <div slot="title">title Text Goes Here</div>
            <div slot="supporting-text">
              <p>Hello from Card!</p>
              <x-counter count="1"></x-counter>
            </div>
            <div slot="card-actions">
              <paper-button onClick={elem.toggleRaised.bind( elem )}>Toggle Raised</paper-button>
              <paper-button raised={elem.isRaised}>
                Click me!
              </paper-button>
              <iron-icon icon="mood"></iron-icon>
              <a href="(URL or function)">Related Action</a>
            </div>
          </paper-card>
        </fieldset>

        <fieldset>
          <legend>Button</legend>
          <section>
            <paper-button href="http://google.com" raised>go Google it!</paper-button>
            <paper-button colored>Hello</paper-button>
            <paper-button primary raised>Hello</paper-button>
            <paper-button accent>Hello</paper-button>
            <paper-fab>Fab</paper-fab>
            <paper-fab mini>+</paper-fab>
            <paper-icon-button icon="mood" raised colored></paper-icon-button>
          </section>
        </fieldset>
        <fieldset>
          <legend>Tooltip</legend>
          <paper-tooltip label="Follow">
            <iron-icon icon="add"></iron-icon>
          </paper-tooltip>
          <paper-tooltip label="Follow large" large>
            <iron-icon icon="print"></iron-icon>
        </paper-tooltip>
        </fieldset>

        <fieldset>
          <legend>Checkbox</legend>
          <paper-checkbox checked>hello?</paper-checkbox>
          <paper-checkbox disabled>Im disabled :(</paper-checkbox>
        </fieldset>

        <ButtonConfigurator elem={elem}/>

      </section>
    ])
  }


  toggleButtonType( type: string ) {
    const value = this.buttonConfig[ type ];

    props( this, {
      buttonConfig: Object.assign( {}, this.buttonConfig, { [type]: !value } )
    } );
  }

  toggleRaised() {
    this.isRaised = !this.isRaised;
  }
}

define( App.is, App );
