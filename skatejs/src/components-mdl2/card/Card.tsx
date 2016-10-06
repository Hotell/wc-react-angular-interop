import { Component, prop, define } from 'skatejs';
import React from '../../components/jsx';

const styles = require('./card.scss');

export class MDLCard extends Component {

  private actionsSlot: HTMLElement;

  static get is() { return 'mdl-card'}

  static attached(elem: MDLCard){
    elem.actionsSlot.addEventListener( 'slotchange', elem.onSlotChangeCb );
  }

  static detached(elem: MDLCard){
    elem.actionsSlot.removeEventListener( 'slotchange', elem.onSlotChangeCb );
  }

  static render(elem: MDLCard) {
      return [
        <style>{styles}</style>,
        <div class="mdl-card">
          <section class="mdl-card__primary">
            <h1 class="mdl-card__title mdl-card__title--large"><slot name="title"/></h1>
            <h2 class="mdl-card__subtitle"><slot name="subtitle"/></h2>
          </section>
          <section class="mdl-card__supporting-text">
            <slot name="supporting-text"/>
          </section>
          <section class="mdl-card__actions">
            <slot id="actionsSlot" name="actions" ref={_ref=>elem.actionsSlot=_ref}/>
          </section>
        </div>
      ]
  }

  private onSlotChangeCb( e ) {
    const nodes = e.target.assignedNodes();

    console.log( 'light dom children changed!' );
    console.log( nodes );

    Array.from<Element>(nodes)
      .forEach(mdlButton=>{
        mdlButton.classList.add('mdl-button--compact','mdl-card__action')
        // console.log( mdlButton );
        // mdlButton.compact = true;
      })
  }

}

define( MDLCard.is, MDLCard );
