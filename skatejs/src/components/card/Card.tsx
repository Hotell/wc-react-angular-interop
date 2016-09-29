import { Component } from 'skatejs';
import React from '../jsx';

export class Card extends Component {

  static created( elem ) {
    console.log( 'created!', elem );
  }

  static attached( elem ) {
    console.log( 'attached!', elem );
  }

  static detached( elem ) {}

  static render(elem){
    return (
      <div>
        <style>{`
        :host{}
        .mdl-shadow--2dp {
          box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)
        }

        .mdl-shadow--3dp {
          box-shadow: 0 3px 4px 0 rgba(0,0,0,.14),0 3px 3px -2px rgba(0,0,0,.2),0 1px 8px 0 rgba(0,0,0,.12)
        }

        .mdl-shadow--4dp {
          box-shadow: 0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2)
        }

        .mdl-shadow--6dp {
          box-shadow: 0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12),0 3px 5px -1px rgba(0,0,0,.2)
        }

        .mdl-shadow--8dp {
          box-shadow: 0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12),0 5px 5px -3px rgba(0,0,0,.2)
        }

        .mdl-shadow--16dp {
          box-shadow: 0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2)
        }

        .mdl-shadow--24dp {
          box-shadow: 0 9px 46px 8px rgba(0,0,0,.14),0 11px 15px -7px rgba(0,0,0,.12),0 24px 38px 3px rgba(0,0,0,.2)
        }
        .mdl-card {
          display: flex;
          flex-direction: column;
          /*font-size: @var(--card-font-size);*/
          font-size: 16px;
          font-weight: 400;
          min-height: 200px;
          overflow: hidden;
          width: 330px;
          z-index: 1;
          position: relative;
          background: #fff;
          border-radius: 2px;
          box-sizing: border-box;
        }

        .mdl-card__media {
          background-color: rgb(255,64,129);
          background-repeat: repeat;
          background-position: 50% 50%;
          background-size: cover;
          background-origin: padding-box;
          background-attachment: scroll;
          box-sizing: border-box;
        }

        .mdl-card__title {
          align-items: center;
          color: #000;
          display: block;
          display: flex;
          justify-content: stretch;
          line-height: normal;
          padding: 16px;
          perspective-origin: 165px 56px;
          transform-origin: 165px 56px;
          box-sizing: border-box;
        }
        .mdl-card__title.mdl-card--border {
          border-bottom: 1px solid rgba(0,0,0,.1)
        }
        .mdl-card__title-text {
          align-self: flex-end;
          color: inherit;
          display: block;
          display: flex;
          font-size: 24px;
          font-weight: 300;
          line-height: normal;
          overflow: hidden;
          transform-origin: 149px 48px;
          margin: 0;
        }

        .mdl-card__subtitle-text {
          font-size: 14px;
          color: rgba(0,0,0,.54);
          margin: 0;
        }

        .mdl-card__supporting-text {
          color: rgba(0,0,0,.54);
          font-size: 1rem;
          line-height: 18px;
          overflow: hidden;
          padding: 16px;
          width: 90%;
        }

        .mdl-card__actions {
          font-size: 16px;
          line-height: normal;
          width: 100%;
          background-color: rgba(0,0,0,0);
          padding: 8px;
          box-sizing: border-box;
        }
        .mdl-card__actions.mdl-card--border{
          border-top: 1px solid rgba(0,0,0,.1)
        }

        .mdl-card--expand {
          flex-grow: 1;
        }


        .mdl-card__menu {
          position: absolute;
          right: 16px;
          top: 16px;
        }
      `}</style>
      <div className="mdl-card mdl-shadow--2dp">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">
            <slot name="title"></slot>
          </h2>
        </div>
        <div className="mdl-card__media">
          <slot name="media"></slot>
        </div>
        <div className="mdl-card__supporting-text">
          <slot name="supporting-text"></slot>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <slot name="card-actions"></slot>
        </div>
      </div>
      </div>
    )
  }

}
