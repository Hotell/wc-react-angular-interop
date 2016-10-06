import { Component,prop,define } from 'skatejs';
import React from '../../shared/jsx';
import MDLRipple, { MDLRippleFoundation } from 'mdl-ripple';

const styles = require('./button.scss');
const rippleStyles = require('../ripple/ripple.scss');
export class MDLButton extends Component {

  raised?: boolean;
  ripple?: boolean;
  colored?: boolean;
  primary?: boolean;
  accent?: boolean;
  dense?: boolean;
  compact?: boolean;

  disabled?: boolean;

  private ripple_: MDLRipple;
  private button: HTMLButtonElement;

  static get is(){ return 'mdl-button'}
  static get props() {
    return {
      raised: prop.boolean( { default: false } ),
      ripple: prop.boolean( { default: false } ),
      colored: prop.boolean(),
      primary: prop.boolean(),
      accent: prop.boolean(),
      dense: prop.boolean(),
      compact: prop.boolean( {
        attribute: true,
        set( elem, data ){
          console.log( data );
        }
      } ),
      disabled: prop.boolean( { attribute: true } )
    }
  }

  static created() {

  }

  static attached( elem: MDLButton ) {
    setTimeout(()=>{
      if ( elem.ripple ) {
        elem.ripple_ = MDLRipple.attachTo(elem.button);
      }
    })
  }

  static detached( elem: MDLButton ) {
    elem.ripple_ && elem.ripple_.destroy();
  }

  static render(elem:MDLButton) {
    const buttonClasses = elem.createClassNames();
    const {disabled} = elem;
    return [
      <style>{styles}{rippleStyles}</style>,
      <button
        ref={_ref=>elem.button=_ref}
        class={buttonClasses}
        disabled={disabled}
      >
        <slot/>
      </button>
    ]
  }

  protected createClassNames() {
    const elem = this;
    const baseClassName = 'mdl-button';

    const raisedClassName = elem.raised
      ? 'mdl-button--raised'
      : '';
    const denseClassName = elem.dense
      ? 'mdl-button--dense'
      : '';
    const compactClassName = elem.compact
      ? 'mdl-button--compact'
      : '';
    const rippleClassName = elem.ripple
      ? 'mdl-ripple-surface'
      : '';
    // const coloredClassName = elem.colored
    //   ? 'mdl-button--colored'
    //   : '';
    const primaryClassName = elem.primary
      ? 'mdl-button--primary'
      : '';
    const accentClassName = elem.accent
      ? 'mdl-button--accent'
      : '';
    // const fabClassName = elem.fab
    //   ? 'mdl-button--fab'
    //   : '';
    // const fabMiniClassName = elem.fabMini
    //   ? 'mdl-button--mini-fab'
    //   : '';
    // const iconBtnClassName = elem.iconBtn
    //   ? 'mdl-button--icon'
    //   : '';

    return [
      baseClassName,
      denseClassName,
      compactClassName,
      rippleClassName,
      raisedClassName,
      // coloredClassName,
      primaryClassName,
      accentClassName,
      // fabClassName,
      // fabMiniClassName,
      // iconBtnClassName,
      elem.className
    ]
      .filter( className => Boolean( className.length ) )
      .join( ' ' );

  }
}

define(MDLButton.is,MDLButton);
