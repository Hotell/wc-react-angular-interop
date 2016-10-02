import {Component,prop} from 'skatejs';
import React from '../jsx';


export interface BaseButtonProps {
  raised: boolean,
  ripple: boolean,
  colored: boolean,
  primary: boolean,
  accent: boolean,
  fab: boolean,
  fabMini: boolean,
  iconBtn: boolean,
  disabled: boolean,
  href: string,
}

export const ButtonRenderer = (props, children) => {
  const {href} = props;
  return href
    ? (<a {...props}>{children}</a>)
    : (<button {...props}>{children}</button>);
};
// other option how to render ( programatically )
// React.createElement(
//   (href ? 'a' : 'button'),
//   {
//     ref:elem.setButton.bind(elem),
//     className:buttonClasses,
//     href,
//     disabled
//   },
//   React.createElement('slot',{})
// )

export class BaseButton extends Component implements BaseButtonProps{
  raised: boolean;
  ripple: boolean;
  colored: boolean;
  primary: boolean;
  accent: boolean;
  fab: boolean;
  fabMini: boolean;
  iconBtn: boolean;
  disabled: boolean;
  href: string;
  private button?: HTMLButtonElement;

  static get props() {
    return {
      raised: prop.boolean( { default: false } ),
      ripple: prop.boolean( { default: true } ),
      colored: prop.boolean(),
      primary: prop.boolean(),
      accent: prop.boolean(),
      fab: prop.boolean(),
      fabMini: prop.boolean(),
      iconBtn: prop.boolean(),
      href: prop.string(),
      disabled: prop.boolean( { attribute: true } ),
      className: prop.string( {
        get( elem, data ){
          return data.internalValue || elem.classList.toString()
        }
      } ),
    }
  };

  static attached( elem: BaseButton ) {}

  static detached( elem: BaseButton ) {
    elem.unsetButton();
  }

  protected setButton( ref: HTMLButtonElement ) {
    if(ref === this.button){
      this.downgradeMDL( ref );
    }
    this.button = ref;
    this.upgradeMDL( ref );
  }

  protected unsetButton() {
    this.downgradeMDL( this.button );
    this.button = null;
  }
  protected upgradeMDL( ref ) {
    if ( !ref ) { return }
    componentHandler.upgradeElement( ref );
  }

  protected downgradeMDL( ref ) {
    if ( !ref ) { return }
    componentHandler.downgradeElements( ref );
  }
  protected createClassNames( elem ) {
    const baseClassName = 'mdl-button mdl-js-button';

    const raisedClassName = elem.raised
      ? 'mdl-button--raised'
      : '';
    const rippleClassName = elem.ripple
      ? 'mdl-js-ripple-effect'
      : '';
    const coloredClassName = elem.colored
      ? 'mdl-button--colored'
      : '';
    const primaryClassName = elem.primary
      ? 'mdl-button--primary'
      : '';
    const accentClassName = elem.accent
      ? 'mdl-button--accent'
      : '';
    const fabClassName = elem.fab
      ? 'mdl-button--fab'
      : '';
    const fabMiniClassName = elem.fabMini
      ? 'mdl-button--mini-fab'
      : '';
    const iconBtnClassName = elem.iconBtn
      ? 'mdl-button--icon'
      : '';

    return [
      baseClassName,
      rippleClassName,
      raisedClassName,
      coloredClassName,
      primaryClassName,
      accentClassName,
      fabClassName,
      fabMiniClassName,
      iconBtnClassName,
      elem.className
    ]
      .filter( className => Boolean( className.length ) )
      .join( ' ' );

  }
}


export const buttonStyle = `
  .mdl-button {
  background: 0 0;
  border: none;
  border-radius: 2px;
  color: #000;
  position: relative;
  height: 36px;
  margin: 0;
  min-width: 64px;
  padding: 0 16px;
  display: inline-block;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0;
  overflow: hidden;
  will-change: box-shadow;
  transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
  outline: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 36px;
  vertical-align: middle
}

.mdl-button::-moz-focus-inner {
  border: 0
}

.mdl-button:hover {
  background-color: rgba(158,158,158,.2)
}

.mdl-button:focus:not(:active) {
  background-color: rgba(0,0,0,.12)
}

.mdl-button:active {
  background-color: rgba(158,158,158,.4)
}

.mdl-button.mdl-button--colored {
  color: rgb(63,81,181)
}

.mdl-button.mdl-button--colored:focus:not(:active) {
  background-color: rgba(0,0,0,.12)
}

input.mdl-button[type="submit"] {
  -webkit-appearance: none
}

.mdl-button--raised {
  background: rgba(158,158,158,.2);
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)
}

.mdl-button--raised:active {
  box-shadow: 0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);
  background-color: rgba(158,158,158,.4)
}

.mdl-button--raised:focus:not(:active) {
  box-shadow: 0 0 8px rgba(0,0,0,.18),0 8px 16px rgba(0,0,0,.36);
  background-color: rgba(158,158,158,.4)
}

.mdl-button--raised.mdl-button--colored {
  background: rgb(63,81,181);
  color: rgb(255,255,255)
}

.mdl-button--raised.mdl-button--colored:hover {
  background-color: rgb(63,81,181)
}

.mdl-button--raised.mdl-button--colored:active {
  background-color: rgb(63,81,181)
}

.mdl-button--raised.mdl-button--colored:focus:not(:active) {
  background-color: rgb(63,81,181)
}

.mdl-button--raised.mdl-button--colored .mdl-ripple {
  background: rgb(255,255,255)
}

.mdl-button--fab {
  border-radius: 50%;
  font-size: 24px;
  height: 56px;
  margin: auto;
  min-width: 56px;
  width: 56px;
  padding: 0;
  overflow: hidden;
  background: rgba(158,158,158,.2);
  box-shadow: 0 1px 1.5px 0 rgba(0,0,0,.12),0 1px 1px 0 rgba(0,0,0,.24);
  position: relative;
  line-height: normal
}

.mdl-button--fab .material-icons {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-12px,-12px);
  transform: translate(-12px,-12px);
  line-height: 24px;
  width: 24px
}

.mdl-button--fab.mdl-button--mini-fab {
  height: 40px;
  min-width: 40px;
  width: 40px
}

.mdl-button--fab .mdl-button__ripple-container {
  border-radius: 50%;
  -webkit-mask-image: -webkit-radial-gradient(circle,#fff,#000)
}

.mdl-button--fab:active {
  box-shadow: 0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);
  background-color: rgba(158,158,158,.4)
}

.mdl-button--fab:focus:not(:active) {
  box-shadow: 0 0 8px rgba(0,0,0,.18),0 8px 16px rgba(0,0,0,.36);
  background-color: rgba(158,158,158,.4)
}

.mdl-button--fab.mdl-button--colored {
  background: rgb(255,64,129);
  color: rgb(255,255,255)
}

.mdl-button--fab.mdl-button--colored:hover {
  background-color: rgb(255,64,129)
}

.mdl-button--fab.mdl-button--colored:focus:not(:active) {
  background-color: rgb(255,64,129)
}

.mdl-button--fab.mdl-button--colored:active {
  background-color: rgb(255,64,129)
}

.mdl-button--fab.mdl-button--colored .mdl-ripple {
  background: rgb(255,255,255)
}

.mdl-button--icon {
  border-radius: 50%;
  font-size: 24px;
  height: 32px;
  margin-left: 0;
  margin-right: 0;
  min-width: 32px;
  width: 32px;
  padding: 0;
  overflow: hidden;
  color: inherit;
  line-height: normal
}

.mdl-button--icon .material-icons {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-12px,-12px);
  transform: translate(-12px,-12px);
  line-height: 24px;
  width: 24px
}

.mdl-button--icon.mdl-button--mini-icon {
  height: 24px;
  min-width: 24px;
  width: 24px
}

.mdl-button--icon.mdl-button--mini-icon .material-icons {
  top: 0;
  left: 0
}

.mdl-button--icon .mdl-button__ripple-container {
  border-radius: 50%;
  -webkit-mask-image: -webkit-radial-gradient(circle,#fff,#000)
}

.mdl-button__ripple-container {
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
  overflow: hidden
}

.mdl-button[disabled] .mdl-button__ripple-container .mdl-ripple,.mdl-button.mdl-button--disabled .mdl-button__ripple-container .mdl-ripple {
  background-color: transparent
}

.mdl-button--primary.mdl-button--primary {
  color: rgb(63,81,181)
}

.mdl-button--primary.mdl-button--primary .mdl-ripple {
  background: rgb(255,255,255)
}

.mdl-button--primary.mdl-button--primary.mdl-button--raised,.mdl-button--primary.mdl-button--primary.mdl-button--fab {
  color: rgb(255,255,255);
  background-color: rgb(63,81,181)
}

.mdl-button--accent.mdl-button--accent {
  color: rgb(255,64,129)
}

.mdl-button--accent.mdl-button--accent .mdl-ripple {
  background: rgb(255,255,255)
}

.mdl-button--accent.mdl-button--accent.mdl-button--raised,.mdl-button--accent.mdl-button--accent.mdl-button--fab {
  color: rgb(255,255,255);
  background-color: rgb(255,64,129)
}

.mdl-button[disabled][disabled],.mdl-button.mdl-button--disabled.mdl-button--disabled {
  color: rgba(0,0,0,.26);
  cursor: default;
  background-color: transparent
}

.mdl-button--fab[disabled][disabled],.mdl-button--fab.mdl-button--disabled.mdl-button--disabled {
  background-color: rgba(0,0,0,.12);
  color: rgba(0,0,0,.26)
}

.mdl-button--raised[disabled][disabled],.mdl-button--raised.mdl-button--disabled.mdl-button--disabled {
  background-color: rgba(0,0,0,.12);
  color: rgba(0,0,0,.26);
  box-shadow: none
}

.mdl-button--colored[disabled][disabled],.mdl-button--colored.mdl-button--disabled.mdl-button--disabled {
  color: rgba(0,0,0,.26)
}

.mdl-button .material-icons {
  vertical-align: middle
}

.mdl-ripple {
background: #000;
border-radius: 50%;
height: 50px;
left: 0;
opacity: 0;
pointer-events: none;
position: absolute;
top: 0;
-webkit-transform: translate(-50%,-50%);
transform: translate(-50%,-50%);
width: 50px;
overflow: hidden
}

.mdl-ripple.is-animating {
transition: transform .3s cubic-bezier(0,0,.2,1),width .3s cubic-bezier(0,0,.2,1),height .3s cubic-bezier(0,0,.2,1),opacity .6s cubic-bezier(0,0,.2,1);
transition: transform .3s cubic-bezier(0,0,.2,1),width .3s cubic-bezier(0,0,.2,1),height .3s cubic-bezier(0,0,.2,1),opacity .6s cubic-bezier(0,0,.2,1),-webkit-transform .3s cubic-bezier(0,0,.2,1)
}

.mdl-ripple.is-visible {
opacity: .3
}`;


export const iconButtonStyle = `
  .material-icons {
    font-family: 'Material Icons';
    font-weight: 400;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    word-wrap: normal;
    -moz-font-feature-settings: 'liga';
    font-feature-settings: 'liga';
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased
  }
`;
