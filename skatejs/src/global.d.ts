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
    symbols: SkateSymbols,
    vdom: VDOM
  }

  type Ctor<T> = { new (...args: any[]): T };

  class Component extends HTMLElement {}
  interface ComponentInstance extends CustomElementDefinition {
    new (): Component,
    extend( definition: CustomElementDefinition ),
    // updated?<E extends Component>( elem?: E, prevProps?: {[key: string]: any} ): boolean,
  }

  type DefineFn = ( name: string, definition: CustomElementDefinition )=>ComponentInstance
  type EmitFn = ( elem: any, eventName: string, eventOptions?: CustomEvent )=>boolean
  type H = ( tag: string | Component, attrs?: {[name: string]: any}, ...children: any[] )=>void
  type LinkFn = ( elem: any, target: string )=>void
  type Prop = {
    array( definition?: PropsOptions ): any[]
    boolean( definition?: PropsOptions ): boolean
    number( definition?: PropsOptions ): number
    string( definition?: PropsOptions ): string
    create( definition?: PropsOptions ): any,
    <T>(definition: PropsOptions): T,
  }

  type PropData = {[propName: string]: any};
  interface PropsFn {
    ( elem: any ): PropData
    ( elem: any, newProps?: PropData ): void
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

  type SkateSymbols = {
    name: string | symbol,
    shadowRoot: string | symbol
  }

  /////

  interface CustomElementDefinition {
    /**
     * Custom properties that should be defined on the element. These are set up after the created lifecycle callback is called.
     *
     * Custom properties, when set, queue a render(). This happens after a setTimeout() so that you only trigger a single render for a series of property sets.
     */
    props?: {
      [name: string]: PropsOptions | Prop
    },
    /**
     * Function that is called when the element is created. This corresponds to the native createdCallback (v0) or constructor (v1).
     * We don't use constructor here because Skate does a lot of automation in it and thus offers this as a way to hook into that part of the lifecycle.
     * It is the first lifecycle callback that is called and is called after the prototype is set up.
     * @param elem  The only argument passed to created is component element.
     */
    created?<E extends Component>( elem?: E ): void,
    /**
     * Called before render() after props are updated. If it returns falsy, render() is not called. If it returns truthy, render() is called.
     * @param elem
     * @param prevProps
     */
    updated?<E extends Component>( elem?: E, prevProps?: {[key: string]: any} ): boolean,
    /**
     * Function that is called after the element has been inserted to the document. This corresponds to the native attachedCallback. This can be called several times, for example, if you were to remove the element and re-insert it.
     * @param elem
     */
    attached?<E extends Component>( elem?: E ): void
    /**
     * is invoked to render an HTML structure to the component if it is not prevented by updated()
     * @param elem
     */
    render?<E extends Component>( elem?: E ): any
    /**
     * is always invoked after render(), if it is not prevented by updated()
     */
    rendered?<E extends Component>( elem?: E ): void
    /**
     * Function that is called after the element has been removed from the document. This corresponds to the native detachedCallback. This can be called several times, for example, if you were to remove the element, re-attach it and the remove it again.
     * @param elem
     */
    detached?<E extends Component>( elem?: E )
    /**
     * is invoked whenever an attribute is changed
     * Function that is called whenever an attribute is added, updated or removed.
     * This corresponds to the native attributeChangedCallback (both v0 and v1).
     * Generally, you'll probably end up using props that have linked attributes instead of this callback, but there are still use cases where this could come in handy.
     * @param elem
     * @param data
     */
    attributeChanged?<E extends Component>( elem?: E, data?: {name: string,newValue: any,oldValue: any} )
    observedAttributes?: string[],
    /**
     * The element's prototype. This is the first thing that happens in the element's lifecycle.
     */
    prototype?: {[name: string]: any},
  }

  type PropsOptions = {
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
    default?: any | (( elem?: any, data?: {[key: string]: any, name:string} )=>any),
    /**
     * The initial value the property should have. This is different from default in the sense that it is only ever invoked once to set the initial value.
     * If this is not specified, then default is used in its place.
     * @param elem  the component element
     * @param data  an object containing information about the property
     */
    initial?: any | (( elem?: any, data?: {[key: string]: any, name: string} )=>any),
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
  MaterialTooltip: MaterialDesignLite.MaterialTooltip
  MaterialCheckbox: MaterialDesignLite.MaterialCheckbox
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
  assignedNodes( { flatten }?:{flatten?: boolean} ): NodeList,
  assignedSlot: string|void,
}

declare interface HTMLElementStatic {
  observedAttributes: string[]|void
}


// MDL
// 1.x
declare module MaterialDesignLite {
  class MaterialTooltip {}
  class MaterialCheckbox {}
}


// 2.x
declare module 'mdl-ripple' {

  interface Adapter extends MDLBase.Adapter {
    browserSupportsCssVars: () => /* boolean - cached */ {},
    isUnbounded: () => /* boolean */ {},
    isSurfaceActive: () => /* boolean */ {},
    addClass: (/* className: string */) => {},
    removeClass: (/* className: string */) => {},
    registerInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
    deregisterInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
    registerResizeHandler: (/* handler: EventListener */) => {},
    deregisterResizeHandler: (/* handler: EventListener */) => {},
    updateCssVariable: (/* varName: string, value: string */) => {},
    computeBoundingRect: () => /* ClientRect */ {},
    getWindowPageOffset: () => /* {x: number, y: number} */ {}
  }
  type Numbers = {
    FG_TRANSFORM_DELAY_MS: 80,
    OPACITY_DURATION_DIVISOR: 3,
    ACTIVE_OPACITY_DURATION_MS: 110,
    MIN_OPACITY_DURATION_MS: 200,
    UNBOUNDED_TRANSFORM_DURATION_MS: 200
  };
  type Strings = {
    VAR_SURFACE_WIDTH: string
    VAR_SURFACE_HEIGHT: string
    VAR_FG_SIZE: string
    VAR_FG_UNBOUNDED_OPACITY_DURATION: string
    VAR_FG_UNBOUNDED_TRANSFORM_DURATION: string
    VAR_LEFT: string
    VAR_TOP: string
    VAR_XF_ORIGIN_X: string
    VAR_XF_ORIGIN_Y: string
    VAR_FG_APPROX_XF: string
    ANIMATION_END_EVENT: string
    TRANSITION_END_EVENT: string
  }
  type CssClasses = {
    ROOT: string
    UNBOUNDED: string
    BG_ACTIVE: string
    BG_BOUNDED_ACTIVE_FILL: string
    FG_BOUNDED_ACTIVE_FILL: string
    FG_UNBOUNDED_ACTIVATION: string
    FG_UNBOUNDED_DEACTIVATION: string
  }

  export default class MDLRipple extends MDLBase.MDLComponent {
    unbounded: boolean;
    constructor(root: Element)
    static attachTo( root: Element, {isUnbounded}?:{isUnbounded:boolean} ): MDLRipple
    static createAdapter( instance: any ): Adapter

    getDefaultFoundation(): MDLRippleFoundation
    initialSyncWithDOM(): void
  }

  export class MDLRippleFoundation extends MDLBase.MDLFoundation {

    static defaultAdapter: Adapter;
    static cssClasses: CssClasses;
    static strings: Strings;
    static numbers: Numbers;

    init()
    destroy()
    layout(): void
  }
}

declare module 'mdl-checkbox' {
  interface Adapter extends MDLBase.Adapter {
    addClass: (/* className: string */) => {},
    removeClass: (/* className: string */) => {},
    registerAnimationEndHandler: (/* handler: EventListener */) => {},
    deregisterAnimationEndHandler: (/* handler: EventListener */) => {},
    registerChangeHandler: (/* handler: EventListener */) => {},
    deregisterChangeHandler: (/* handler: EventListener */) => {},
    getNativeControl: () => /* HTMLInputElement */ {},
    forceLayout: () => {},
    isAttachedToDOM: () => /* boolean */ {}
  }
  type Numbers = {
    ANIM_END_LATCH_MS: number
  }
  type Strings = {
    ANIM_END_EVENT_NAME: string,
    NATIVE_CONTROL_SELECTOR: string,
    TRANSITION_STATE_INIT: string,
    TRANSITION_STATE_CHECKED: string,
    TRANSITION_STATE_UNCHECKED: string,
    TRANSITION_STATE_INDETERMINATE: string,
  }
  type CssClasses = {
    ROOT: string,
    CHECKED: string
    INDETERMINATE: string
    ANIM_UNCHECKED_CHECKED: string
    ANIM_UNCHECKED_INDETERMINATE: string
    ANIM_CHECKED_UNCHECKED: string
    ANIM_CHECKED_INDETERMINATE: string
    ANIM_INDETERMINATE_CHECKED: string
    ANIM_INDETERMINATE_UNCHECKED: string
  }

  export default class MDLCheckbox extends MDLBase.MDLComponent {
    static attachTo( root: Element ): MDLCheckbox

    getDefaultFoundation(): MDLCheckboxFoundation
  }
  export class MDLCheckboxFoundation extends MDLBase.MDLFoundation {
    static defaultAdapter: Adapter;
    static cssClasses: CssClasses;
    static strings: Strings;
    static numbers: Numbers;
  }
}

declare module 'mdl-base' {
  export = MDLBase
}
declare namespace MDLBase {
  class MDLComponent {
    static attachTo(root:Element): MDLComponent

    root_: Element;
    foundation_: MDLFoundation;
    constructor(root: Element, foundation?: any)

    /**
     * Subclasses must override this method to return a properly configured foundation class for the component.
     */
    getDefaultFoundation()
    /**
    // Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
     */
    initialSyncWithDOM()

    /**
     * Subclasses may implement this method to release any resources / deregister any listeners they have attached.
     * An example of this might be deregistering a resize event from the window object.
     */
    destroy()
  }
  class MDLFoundation {
    static cssClasses: {[key:string]:string};
    static strings: {[key:string]:string};
    static numbers: {[key:string]:number};
    static defaultAdapter: any;

    constructor( adapter?: Adapter )
    init(): void
    destroy(): void
  }
  interface Adapter {
    [key: string]: Function
  }
}
