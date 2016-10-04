import {Component} from 'skatejs';

export class MDLComponent extends Component {

  private button?: HTMLButtonElement;

  static attached( elem: MDLComponent ) {}

  static detached( elem: MDLComponent ) {
    // elem.unsetButton();
  }

  // protected setButton( ref: HTMLButtonElement ) {
  //   if(ref === this.button){
  //     this.downgradeMDL( ref );
  //   }
  //   this.button = ref;
  //   this.upgradeMDL( ref );
  // }
  //
  // protected unsetButton() {
  //   this.downgradeMDL( this.button );
  //   this.button = null;
  // }
  protected upgradeMDL( ref ) {
    if ( !ref ) { return }
    componentHandler.upgradeElement( ref );
  }

  protected downgradeMDL( ref ) {
    if ( !ref ) { return }
    componentHandler.downgradeElements( ref );
  }
  protected createClassNames( elem, baseClassName: string ) {
    return []
      .filter( className => Boolean( className.length ) )
      .join( ' ' );

  }
}
