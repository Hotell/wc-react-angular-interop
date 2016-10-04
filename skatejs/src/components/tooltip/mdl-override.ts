export function overrideMDLTooltip( mdlTooltipCtor ) {
  const proto = mdlTooltipCtor.prototype;
  const origInitFn = proto.init;
  const newInitFn = function () {
    if ( this.element_ ) {
      const forElId = this.element_.getAttribute( 'for' ) || this.element_.getAttribute( 'data-mdl-for' );
      if ( forElId ) {
        this.forElement_ = document.getElementById( forElId ) || this.element_.previousElementSibling;
      }
    }
    if ( this.forElement_ ) {
      // It's left here because it prevents accidental text selection on Android
      if ( !this.forElement_.hasAttribute( 'tabindex' ) ) {
        this.forElement_.setAttribute( 'tabindex', '0' );
      }
      this.boundMouseEnterHandler = this.handleMouseEnter_.bind( this );
      this.boundMouseLeaveAndScrollHandler = this.hideTooltip_.bind( this );
      this.forElement_.addEventListener( 'mouseenter', this.boundMouseEnterHandler, false );
      this.forElement_.addEventListener( 'touchend', this.boundMouseEnterHandler, false );
      this.forElement_.addEventListener( 'mouseleave', this.boundMouseLeaveAndScrollHandler, false );
      window.addEventListener( 'scroll', this.boundMouseLeaveAndScrollHandler, true );
      window.addEventListener( 'touchstart', this.boundMouseLeaveAndScrollHandler );
    }
  };
  mdlTooltipCtor.prototype.init = newInitFn;
}
