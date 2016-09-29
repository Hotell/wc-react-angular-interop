import { Component, prop } from 'skatejs';
import React from '../jsx';

export class Button extends Component {

  static props = {
    raised: prop.boolean({
      default: false
    })
  };
  static render( elem ) {

    console.log( elem );
    return ([
      <style>
        {`
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
}


        `}
      </style>,
      <button
        ref={(elem)=>componentHandler.upgradeElement(elem)}
        className={elem.createClassNames(elem)}
      >
        <slot>Button</slot>
      </button>
    ])
  }

  createClassNames(elem){
    return `mdl-button mdl-js-button ${elem.raised && 'mdl-button--raised'} mdl-js-ripple-effect mdl-button--accent`
  }
}
