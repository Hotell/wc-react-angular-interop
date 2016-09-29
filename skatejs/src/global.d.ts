declare namespace SkateJs {

  interface SkateJsStatic {
    Component: ComponentInstance,
    define: DefineFn,
    emit: EmitFn,
    h: H,
    link: LinkFn,
    prop: Prop,
    props: PropsFn,
    ready: ReadyFn,
    symbols: Symbols,
    vdom: VDOM
  }

  class Component {}
  interface ComponentInstance{
    new (): Component
  }

  type DefineFn = ( name: string, definition: CustomElementDefinition )=>void
  type EmitFn = ( elem: any, eventName: string, eventOptions?: CustomEvent )=>boolean
  type H = ( tag: string, attrs?: any, ...children: any[] )=>void
  type LinkFn = ( elem: any, target: string )=>void
  type Prop = {
    array( definition?: PropsConfig )
    boolean( definition?: PropsConfig )
    number( definition?: PropsConfig )
    string( definition?: PropsConfig )
    create( definition?: PropsConfig )
  }
  interface PropsFn {
    ( elem: any ): {[propName: string]: any}
    ( elem: any, newProps?: {[propName: string]: any} ): void
  }
  type ReadyFn = ( elem: any, callback: Function )=>void

  type VDOM = {
    attr()
    text()
    builder()
    element( tname, attrs )
    elementClose()
    elementOpen()
    elementOpenEnd()
    elementOpenStart()
    elementVoid( tag )
  }

  type Symbols = {
    name: string,
    shadowRoot: string
  }

  /////

  type CustomElementDefinition = {
    props?: {
      [name: string]: PropsConfig
    },
    created?( elem?: any ),
    updated?( elem?: any, prevProps?: {[key: string]: any} ): boolean,
    /**
     * Function that is called after the element has been inserted to the document. This corresponds to the native attachedCallback. This can be called several times, for example, if you were to remove the element and re-insert it.
     * @param elem
     */
    attached?( elem?: any )
    /**
     * is invoked to render an HTML structure to the component if it is not prevented by updated()
     * @param elem
     */
    render?( elem?: any )
    /**
     * is always invoked after render(), if it is not prevented by updated()
     */
    rendered?()
    /**
     * Function that is called after the element has been removed from the document. This corresponds to the native detachedCallback. This can be called several times, for example, if you were to remove the element, re-attach it and the remove it again.
     * @param elem
     */
    detached?( elem?: any )
    /**
     * is invoked whenever an attribute is changed
     * @param elem
     * @param data
     */
    attributeChanged?( elem?, data?: {name: string,newValue: any,oldValue: any} )
    observedAttributes?: string[],
    prototype: {[name: string]: any},
  }

  interface PropsConfig {
    attribute?: boolean | string,
    coerce?( value: any ): any,
    default?( elem: any, data: {[key: string]: any} ):any,
    default?: any,
    initial?( elem: any, data: {[key: string]: any} ):any,
    initial?: any,
    deserialize?( value: any ): any,
    serialize?( value: any ): any,
    get?( elem: any, data: {name: string,internalValue: any} ): any
    set?( elem: any, data: {name: string,newValue: any, oldValue: any} ): any
  }

  // type boo = boolean | ( elem: any, data: {[key: string]: any} )=>any

}

declare module "skatejs" {
  const skatejs: SkateJs.SkateJsStatic;
  export = skatejs;
}

// Polymer 2.0 specific
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

// extend Window
declare interface Window {
  customElements: CustomElementRegistry,
}

declare class CustomElementRegistry {
  define( tagName: string, definition: {prototype: any} ): void

  get( tagName: string ): HTMLElement | void

  whenDefined( tagName: string ): Promise<void>
}

declare interface HTMLElement {
  // custom elements API
  connectedCallback()
  disconnectedCallback()
  attributeChangedCallback( name?: string, oldValue?: any, newValue?: any ): void
  // shadow DOM API
  shadowRoot: DocumentFragment,
  attachShadow( { mode:string } ): HTMLElement,
  assignedNodes( { flatten }:{flatten?: boolean} ): NodeList,
  assignedSlot: string|void,
}

declare interface HTMLElementStatic {
  observedAttributes: string[]|void
}
