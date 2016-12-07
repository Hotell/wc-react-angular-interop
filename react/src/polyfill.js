const supportsShadowDOMV1 = Boolean(HTMLElement.prototype.attachShadow);
const supportsCustomElementsV1 = ('customElement' in window);

const url = {
  customElements: 'https://cdn.rawgit.com/webcomponents/custom-elements/v1.0.0-alpha.3/custom-elements.min.js'
};

function loadScript(src) {
  return new Promise(function(resolve, reject) {
    const script = document.createElement('script');
    // script.async = true;
    script.src = src;
    script.onload = () => {
      console.log( 'loaded!' );
      resolve( 'script loaded!' );
    };
    script.onerror = () => {
      console.error( 'script load error!' );
      reject();
    };
    document.head.appendChild(script);
  });
}

const customElementsLoaded = supportsCustomElementsV1
  ? Promise.resolve()
  : loadCustomElementsPolyfill();
export const loadShadowDOMPolyfill = supportsShadowDOMV1
  ? customElementsLoaded
  : loadShadowDOMpolyfills( customElementsLoaded );

function loadCustomElementsPolyfill() {
  return loadScript(url.customElements)
    .then(e => console.info('CustomElements v1 polyfills loaded!') )
}
function loadShadowDOMpolyfills(promise) {
  return promise
    .then(e => loadScript('https://cdn.rawgit.com/webcomponents/shadydom/master/shadydom.min.js'))
    .then(e => loadScript('https://cdn.rawgit.com/webcomponents/shadycss/master/shadycss.min.js'))
    .then(e => console.log('shadow DOM v1 polyfills loaded!'));
}

window.polyfilsLoaded = loadShadowDOMPolyfill;
