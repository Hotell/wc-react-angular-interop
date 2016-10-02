import { prop, props } from 'skatejs';
import React from '../jsx';
import { omit } from '../utils';
import { BaseButton, BaseButtonProps, iconButtonStyle } from './BaseButton';
import { Button } from './';

interface IconButtonProps extends BaseButtonProps {
  icon: string
}

export class IconButton extends BaseButton implements IconButtonProps {
  icon: string;

  static get is() { return 'paper-icon-button'}

  static get props() {

    return Object.assign(
      {},
      // call super
      BaseButton.props,
      { icon: prop.string() }
    )
  }

  static render( elem: IconButton ) {
    const { className, icon } = elem;
    const otherProps = omit( props( elem ), [ 'iconBtn', 'icon', 'className' ] );
    const buttonClasses = `${className}`;

    return ([
      <style>{iconButtonStyle}</style>,
      <Button
        iconBtn
        className={buttonClasses}
        {...otherProps}
      >
        <i className="material-icons">{icon}</i>
      </Button>
    ])
  }
}
