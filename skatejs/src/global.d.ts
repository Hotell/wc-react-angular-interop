declare namespace SkateJs {

  interface SkateJsStatic {
    Component: ComponentInstance,
    define: DefineFn,
    emit: EmitFn,
    h: H,
    link: LinkFn,
    /**
     * Skate has some built-in property definitions to help you with defining consistent property behaviour within your components. All built-in properties are functions that return a property definition.
     */
    prop: Prop,
    /**
     * The props function is a getter or setter depending on if you specify the second argument. If you do not provide props, then the current state of the component is returned. If you pass props, then the current state of the component is set. When you set state, the component will re-render synchronously only if it needs to be re-rendered.
     */
    props: PropsFn,
    /**
     * The skate.ready() function allows you to define a callback that is fired when the specified element is has been upgraded. This is useful when you want to ensure an element has been upgraded before doing anything with it. For more information regarding why an element may not be upgraded right away, read the following section.
     */
    ready: ReadyFn,
    symbols: Symbols,
    vdom: VDOM
  }

  class Component extends HTMLElement{}
  interface ComponentInstance {
    new (): Component,
    extend( definition: CustomElementDefinition ),
  }

  type DefineFn = ( name: string, definition: CustomElementDefinition )=>ComponentInstance
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
    /**
     * Custom properties that should be defined on the element. These are set up after the created lifecycle callback is called.
     *
     * Custom properties, when set, queue a render(). This happens after a setTimeout() so that you only trigger a single render for a series of property sets.
     */
    props?: {
      [name: string]: PropsConfig
    },
    /**
     * Function that is called when the element is created. This corresponds to the native createdCallback (v0) or constructor (v1).
     * We don't use constructor here because Skate does a lot of automation in it and thus offers this as a way to hook into that part of the lifecycle.
     * It is the first lifecycle callback that is called and is called after the prototype is set up.
     * @param elem  The only argument passed to created is component element.
     */
    created?( elem?: any ): void,
    /**
     * Called before render() after props are updated. If it returns falsy, render() is not called. If it returns truthy, render() is called.
     * @param elem
     * @param prevProps
     */
    updated?( elem?: any, prevProps?: {[key: string]: any} ): boolean,
    /**
     * Function that is called after the element has been inserted to the document. This corresponds to the native attachedCallback. This can be called several times, for example, if you were to remove the element and re-insert it.
     * @param elem
     */
    attached?( elem?: any ): void
    /**
     * is invoked to render an HTML structure to the component if it is not prevented by updated()
     * @param elem
     */
    render?( elem?: any ): any
    /**
     * is always invoked after render(), if it is not prevented by updated()
     */
    rendered?( elem?: any ): void
    /**
     * Function that is called after the element has been removed from the document. This corresponds to the native detachedCallback. This can be called several times, for example, if you were to remove the element, re-attach it and the remove it again.
     * @param elem
     */
    detached?( elem?: any )
    /**
     * is invoked whenever an attribute is changed
     * Function that is called whenever an attribute is added, updated or removed.
     * This corresponds to the native attributeChangedCallback (both v0 and v1).
     * Generally, you'll probably end up using props that have linked attributes instead of this callback, but there are still use cases where this could come in handy.
     * @param elem
     * @param data
     */
    attributeChanged?( elem?, data?: {name: string,newValue: any,oldValue: any} )
    observedAttributes?: string[],
    /**
     * The element's prototype. This is the first thing that happens in the element's lifecycle.
     */
    prototype?: {[name: string]: any},
  }

  interface PropsConfig {
    /**
     * Whether or not to link the property to an attribute. This can be either a Boolean or String
     *
     * - If it's false, it's not linked to an attribute. This is the default.
     * - If it's true, the property name is dash-cased and used as the attribute name it should be linked to.
     * - If it's a String, the value is used as the attribute name it should be linked to.
     *
     * When you declare a linked attribute, it automatically adds this attribute to the list of observedAttributes.
     */
    attribute?: boolean | string,
    /**
     * A function that coerces the incoming property value and returns the coerced value.
     * This value is used as the internal value of the property.
     * @param value the value that should be coerced
     */
    coerce?( value: any ): any,
    /**
     * Specifies the default value of the property. If the property is ever set to null or undefined, instead of being empty, the default value will be used instead.
     * @param elem  the component element
     * @param data  an object containing information about the property
     */
    default?( elem?: any, data?: {[key: string]: any, name:string} ):any,
    default?: any,
    /**
     * The initial value the property should have. This is different from default in the sense that it is only ever invoked once to set the initial value.
     * If this is not specified, then default is used in its place.
     * @param elem  the component element
     * @param data  an object containing information about the property
     */
    initial?( elem?: any, data?: {[key: string]: any, name:string} ):any,
    initial?: any,
    /**
     * A function that converts the linked attribute value to the linked property value.
     * @param value the property value that needs to be coerced to the attribute value.
     */
    deserialize?( value: any ): any,
    /**
     * A function that converts the linked property value to the linked attribute value.
     * @param value  the attribute value that needs to be coerced to the property value.
     */
    serialize?( value: any ): any,
    /**
     * A function that is used to return the value of the property. If this is not specified, the internal property value is returned.
     * @param elem  the component element
     * @param data  an object containing information about the property
     */
    get?( elem: any, data: {name: string,internalValue: any} ): any
    /**
     * A function that is called whenever the property is set. This is also called when the property is first initialised.
     *
     * When the property is initialised, oldValue will always be undefined and newValue will correspond to the initial value.
     * If the property is set to null or undefined, the value is normalised to be undefined for consistency.
     * @param elem  the component element
     * @param data  an object containing information about the property
     */
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
