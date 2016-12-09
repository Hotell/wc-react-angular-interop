if ( 'customElements' in window ) {
  customElements.forcePolyfill = true
}

import '@webcomponents/custom-elements/src/native-shim';
import '@webcomponents/custom-elements';
import '@webcomponents/shadydom';
