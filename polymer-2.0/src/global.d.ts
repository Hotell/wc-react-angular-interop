declare interface Polymer {
  Element: PolymerElementInstance,
  DomModule: PolymerDomModule
}

type PropConstructorType = StringConstructor|ObjectConstructor|BooleanConstructor|NumberConstructor|DateConstructor|ArrayConstructor;

interface PropObjectType {
  type: PropConstructorType;
  value?: boolean | number | string | Function | Object;
  reflectToAttribute?: boolean;
  readOnly?: boolean;
  notify?: boolean;
  computed?: string;
  observer?: string;
}

declare class PolymerElement extends HTMLElement {

  static config: {
    properties?: {[name: string]: PropObjectType | PropConstructorType},
    observers?: string[]
  }

  static template:HTMLTemplateElement

  ready(): void

  ensureAttribute( name?: string, value?: any ): void
  _ensureAttribute( name?: string, value?: any ): void
}
declare interface PolymerElementInstance {
  new(): PolymerElement
}

declare class PolymerDomModule {
  static modules: {[id: string]: HTMLElement}

  /**
   * Registers the dom-module at a given id. This method should only be called
   * when a dom-module is imperatively created. For
   * example, `document.createElement('dom-module').register('foo')`.
   * @param id
   */
  register( id: string ): void

  /**
   *  Retrieves the dom specified by `selector` in the module specified by
   * `id`. For example, this.import('foo', 'img');
   * @param id
   * @param selector
   */
  import( id: string, selector: string ): HTMLElement
}

// extend Window
declare interface Window {
  Polymer: Polymer,
  customElements: CustomElementRegistry,
}

declare class CustomElementRegistry {
  define( tagName: string, definition: {prototype: any} ): void
  get( tagName: string ): HTMLElement | void
  whenDefined(tagName: string): Promise<void>
}

declare interface HTMLElement {
  // custom elements API
  connectedCallback()
  disconnectedCallback()
  attributeChangedCallback(name?: string, oldValue?: any, newValue?: any): void
  // shadow DOM API
  shadowRoot: DocumentFragment,
  attachShadow( { mode:string } ): HTMLElement,
  assignedNodes( { flatten }:{flatten?: boolean} ): NodeList,
  assignedSlot: string|void,
}

declare interface HTMLElementStatic {
  observedAttributes: string[]|void
}
