import { prop, props } from 'skatejs';
import React from '../jsx';
import { BaseButton } from './BaseButton';
import { Button } from './Button';
import { omit } from '../utils';

export class FABButton extends BaseButton {

  mini?: boolean;

  static get is() { return 'paper-fab' }

  static get props() {
    return Object.assign(
      {},
      BaseButton.props,
      { mini: prop.boolean() }
    )
  }

  static render( elem: FABButton){
    const { className, mini } = elem;
    const otherProps = omit( props( elem ), [ 'fab','fabMini','mini', 'className' ] );
    const buttonClasses = `${className}`;

    return (
      <Button
        fab
        fabMini={mini}
        className={buttonClasses}
        {...otherProps}
      >
        <slot/>
      </Button>
    )
  }
}
