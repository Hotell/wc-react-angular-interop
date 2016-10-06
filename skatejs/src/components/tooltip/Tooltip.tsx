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
  private _root: HTMLDivElement;
  private _slottedContent: HTMLElement;

  static get is() { return 'paper-tooltip' }

  static get props() {
    return {
      label: prop.string(),
      large: prop.boolean(),
      position: prop.string(),
    }
  }

  static created(elem: Tooltip){
    console.info('Tooltip created')
  }

  static attached(elem: Tooltip){
    console.info('Tooltip attached');
    elem.upgradeMDL(elem._root);
  }
  static detached(elem: Tooltip){
    elem.downgradeMDL(elem._root);
    elem._root = null;
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
      <div>
        <span id={id}><slot /></span>
        <span
          ref={( _ref ) => { elem._root = _ref; }}
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



