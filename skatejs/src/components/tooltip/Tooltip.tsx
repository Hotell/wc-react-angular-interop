import { prop, props, ready } from 'skatejs';

import React from '../../shared/jsx';
import { MDLComponent } from '../core/MDLComponent';
import { omit } from '../../shared/utils';

export const tooltipStyle = require( './tooltip.scss' );

const Label = ( props: {label: string|Element} ) => {
  const otherProps = omit( props, [ 'label' ] );
  const Root = (typeof props.label === 'string')
    ? <span {...otherProps}>{props.label}</span>
    : props.label;

  return <Root {...otherProps}/>
};

export class Tooltip extends MDLComponent {

  label: string|Element;
  large?: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
  private _slottedContent: HTMLElement;

  static get is() { return 'paper-tooltip' }

  static get props() {
    return {
      label: prop.string( { attribute: true } ),
      large: prop.boolean( { attribute: true } ),
      position: prop.string( { attribute: true } ),
    }
  }

  static created(elem: Tooltip){
    MDLComponent.created( elem );
    console.info('Tooltip created');
  }

  static attached(elem: Tooltip){
    MDLComponent.attached( elem );
    console.info('Tooltip attached');
  }
  static detached(elem: Tooltip){
    MDLComponent.detached( elem );
    console.info('Tooltip detached');
  }
  static render( elem: Tooltip ) {
    console.info('Tooltip render');
    const { label, large, position/*, ...otherProps*/ } = props( elem );
    const id = Math.random().toString( 36 ).substr( 2 );
    const tooltipClasses = elem.getClassName();

    // let element;
    // if (typeof _slottedContent === 'string') {
    //   element = <span>{_slottedContent}</span>;
    // } else {
    //   element = React.Children.only(_slottedContent);
    // }
    return ([
      <style>{tooltipStyle}</style>,
      <div style={{display: 'inline-block'}}>
        <span id={id}><slot /></span>
        <span
          ref={elem.setRoot}
          for={id}
          className={tooltipClasses}
        >
          {label}
        </span>
      </div>
    ])
  }

  private getClassName() {
    const baseTooltip = 'mdl-tooltip';
    const largeTooltip = this.large
      ? 'mdl-tooltip--large'
      : '';
    const positionTooltip = this.position
      ? `mdl-tooltip-${this.position}`
      : '';
    return [
      baseTooltip,
      largeTooltip,
      positionTooltip
    ]
      .filter( className => Boolean( className.length ) )
      .join( ' ' )
  }
}



