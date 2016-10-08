import { Component,symbols } from 'skatejs';
import React from '../../shared/jsx';

export const CssClasses = {
  skipRoot: 'mdl-vdom-skip'
};

export class MDLComponent extends Component {

  get root() { return this._root }
  private _root: Element;

  static created(elem: MDLComponent){
    console.info( 'MDLComponent created' );
    elem._root = null;
    elem.setRoot = elem.setRoot.bind(elem);
  }
  static attached( elem: MDLComponent ) {
    console.info( 'MDLComponent attached' );
    elem.upgradeMDL( elem._root )
  }
  static detached( elem: MDLComponent ) {
    console.info( 'MDLComponent detached' );
    elem.downgradeMDL(elem._root);
    elem._root = null;
  }

  protected setRoot(ref:Element){
    this._root = ref;
  }

  protected upgradeMDL( ref ) {
    if ( !ref ) { return }
    console.info('upgrading MDL');
    componentHandler.upgradeElement( ref );
  }

  protected downgradeMDL( ref ) {
    if ( !ref ) { return }
    console.info('downgrading MDL');
    componentHandler.downgradeElements( ref );
  }
  protected createClassNames( elem, baseClassName: string ) {
    return []
      .filter( className => Boolean( className.length ) )
      .join( ' ' );

  }
}
