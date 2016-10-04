import React from '../jsx';
import { Component, prop } from 'skatejs';


export const iconStyle = require('./icon.scss');

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
