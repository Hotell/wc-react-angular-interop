import { Component, prop, props, emit, define } from 'skatejs';

import React from '../../shared/jsx';
import { MDLComponent, CssClasses } from '../core/MDLComponent';

export const checkboxStyle = require('./checkbox.scss');

export class Checkbox extends MDLComponent {

  static get is() { return 'paper-checkbox'}
  static get events(){
    return {
      change: 'change'
    }
  }
  static get props(){
    return {
      checked: prop.boolean({
        attribute:true,
        set( elem: Checkbox, data ){
          const { newValue, oldValue } = data;
          if ( newValue !== oldValue ) {
            const fName = newValue
              ? 'check'
              : 'uncheck';
            (elem.root as any).MaterialCheckbox[ fName ]()
          }
        }
      }),
      disabled: prop.boolean( {
        attribute: true,
        set( elem: Checkbox, data ){
          const { newValue, oldValue } = data;
          if ( newValue !== oldValue ) {
            const fName = newValue
              ? 'disable'
              : 'enable';
            (elem.root as any).MaterialCheckbox[ fName ]()
          }
        }
      } ),
      label: prop.string(),
      class: prop.string(),
      onChange: { default: () => {} },
      ripple: prop.boolean( { default: true } )
    }
  }

  checked: boolean;
  class: string;
  disabled: boolean;
  label: string;
  ripple: boolean;

  static updated( elem: Checkbox, prevProps ) {

    console.log( props(elem),prevProps );
    return Component.updated( elem, prevProps );

  }

  static render( elem: Checkbox){

    const { checked, label, ripple } = props(elem);
    const checkboxClasses = `mdl-checkbox mdl-js-checkbox ${ripple
      ? 'mdl-js-ripple-effect'
      : ''}`;

    return [
      <style>{checkboxStyle}</style>,
      <label ref={elem.setRoot} className={checkboxClasses}>
        <input
          type="checkbox"
          class="mdl-checkbox__input"
          checked={checked}
        />
        <span class="mdl-checkbox__label">
          {label ? label : <slot/>}
        </span>
        <span class={`${CssClasses.skipRoot}`} skip/>
      </label>
    ]
  }

}
