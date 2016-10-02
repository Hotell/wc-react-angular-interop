import React from '../jsx';
import { Component, prop } from 'skatejs';


export class Icon extends Component {

  icon: string;

  static get is() { return 'iron-icon' }

  static get props() {
    return {
      icon: prop.string()
    }
  }

  static render( elem: Icon ) {
    const { icon, classList } = elem;
    const classes = `material-icons ${classList.toString()}`;

    return ([
      <style>{iconStyle}</style>,
      <i className={classes}>{icon}</i>
    ])
  }

}

export const iconStyle = `
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
