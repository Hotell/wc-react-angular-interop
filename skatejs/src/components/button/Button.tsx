import React from '../jsx';
import { BaseButton, buttonStyle, ButtonRenderer } from './BaseButton';

export interface ButtonProps {
  raised: boolean,
  ripple: boolean,
  colored: boolean,
  primary: boolean,
  accent: boolean,
  fab: boolean,
  fabMini: boolean,
  disabled: boolean,
  href: string,
  className?: string,
}

export class Button extends BaseButton {

  static get is() { return 'paper-button'}

  static render( elem: Button ) {
    const { href, disabled } = elem;
    const buttonClasses = elem.createClassNames(elem);

    return ([
      <style>
        {buttonStyle}
      </style>,
      <ButtonRenderer
        ref={elem.setButton.bind(elem)}
        className={buttonClasses}
        href={href}
        disabled={disabled}
      >
        <slot/>
      </ButtonRenderer>
    ])
  }

}
