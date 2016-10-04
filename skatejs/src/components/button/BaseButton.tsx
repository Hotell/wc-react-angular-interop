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

export const buttonStyle = require('./button.scss');

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
