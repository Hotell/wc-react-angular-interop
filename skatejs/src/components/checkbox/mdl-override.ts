
import { CssClasses } from '../core/MDLComponent';

export function overrideMDLCheckbox( cTor ): void {
  if ( typeof cTor !== "function" ) { return }
  const proto = cTor.prototype;
  const origInitFn = proto.init;
  const newInit = function () {
    if ( this.element_ ) {
      this._buildDom = this.element_.querySelector( `.${CssClasses.skipRoot}` );
      this.inputElement_ = this.element_.querySelector( '.' +
        this.CssClasses_.INPUT );

      var boxOutline = document.createElement( 'span' );
      boxOutline.classList.add( this.CssClasses_.BOX_OUTLINE );

      var tickContainer = document.createElement( 'span' );
      tickContainer.classList.add( this.CssClasses_.FOCUS_HELPER );

      var tickOutline = document.createElement( 'span' );
      tickOutline.classList.add( this.CssClasses_.TICK_OUTLINE );

      boxOutline.appendChild( tickOutline );

      // this.element_.appendChild(tickContainer);
      this._buildDom.appendChild( tickContainer );
      // this.element_.appendChild(boxOutline);
      this._buildDom.appendChild( boxOutline );

      if ( this.element_.classList.contains( this.CssClasses_.RIPPLE_EFFECT ) ) {
        this.element_.classList.add( this.CssClasses_.RIPPLE_IGNORE_EVENTS );
        this.rippleContainerElement_ = document.createElement( 'span' );
        this.rippleContainerElement_.classList.add( this.CssClasses_.RIPPLE_CONTAINER );
        this.rippleContainerElement_.classList.add( this.CssClasses_.RIPPLE_EFFECT );
        this.rippleContainerElement_.classList.add( this.CssClasses_.RIPPLE_CENTER );
        this.boundRippleMouseUp = this.onMouseUp_.bind( this );
        this.rippleContainerElement_.addEventListener( 'mouseup', this.boundRippleMouseUp );

        var ripple = document.createElement( 'span' );
        ripple.classList.add( this.CssClasses_.RIPPLE );

        this.rippleContainerElement_.appendChild( ripple );
        this._buildDom.appendChild( this.rippleContainerElement_ );
        componentHandler.upgradeElement( this.rippleContainerElement_ )
      }
      this.boundInputOnChange = this.onChange_.bind( this );
      this.boundInputOnFocus = this.onFocus_.bind( this );
      this.boundInputOnBlur = this.onBlur_.bind( this );
      this.boundElementMouseUp = this.onMouseUp_.bind( this );
      this.inputElement_.addEventListener( 'change', this.boundInputOnChange );
      this.inputElement_.addEventListener( 'focus', this.boundInputOnFocus );
      this.inputElement_.addEventListener( 'blur', this.boundInputOnBlur );
      this.element_.addEventListener( 'mouseup', this.boundElementMouseUp );

      this.updateClasses_();
      this.element_.classList.add( this.CssClasses_.IS_UPGRADED );
    }
  };

  proto.init = newInit;
}
