import { Component } from 'skatejs';
import React from '../../shared/jsx';

const cardStyle = require('./card.scss');

export class Card extends Component {

  static get is(){ return 'paper-card'}

  static render(elem: Card){

    return ([
      <style>
        {cardStyle}
      </style>,
      <div className="mdl-card mdl-shadow--2dp">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">
            <slot name="title"/>
          </h2>
        </div>
        <div className="mdl-card__media">
          <slot name="media"/>
        </div>
        <div className="mdl-card__supporting-text">
          <slot name="supporting-text"/>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <slot name="card-actions"/>
        </div>
      </div>
    ])
  }

}
