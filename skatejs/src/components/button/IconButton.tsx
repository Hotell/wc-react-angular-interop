import { Component, prop, props } from 'skatejs';
import React from '../jsx';
import { ButtonProps } from './Button';
import { omit } from '../utils';

interface IconButtonProps extends ButtonProps {
  icon: string
}
export class IconButton extends Component implements IconButtonProps {
  icon: string;
  raised: boolean;
  ripple: boolean;
  colored: boolean;
  primary: boolean;
  accent: boolean;
  fab: boolean;
  fabMini: boolean;
  disabled: boolean;

  static get is() { return 'paper-icon-button'}

  static get props() {
    return {
      icon: prop.string(),
      raised: prop.boolean( { default: false } ),
      ripple: prop.boolean( { default: true } ),
      colored: prop.boolean(),
      primary: prop.boolean(),
      accent: prop.boolean(),
      fab: prop.boolean(),
      fabMini: prop.boolean(),
      disabled: prop.boolean( { attribute: true } ),
      className: prop.string({
        get(elem, data){
          return data.internalValue || elem.classList.toString()
        }
      }),
    }
  }

  static render( elem: IconButton ) {
    const { className, icon } = elem;
    const otherProps = omit( props( elem ), [ 'icon', 'className' ] );
    const classes = `mdl-button--icon ${className}`;

    return ([
      <style>{iconButtonStyle}</style>,
      <paper-button className={classes} {...otherProps}>
        <i className="material-icons">{icon}</i>
      </paper-button>
    ])
  }
}

const iconButtonStyle = `
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
