declare module '*.html';
declare module '*.scss';
declare module '*.css';

// Skate
declare module 'skatejs-web-components';
declare module 'core-js';


// Custom Elements
// declare const customElements: CustomElementRegistry;

interface CustomElementRegistry {
  define(
      name: string, constructor: Function,
      options?: ElementDefinitionOptions): void;
  get(name: string): any;
  whenDefined(name: string): Promise<void>;
}

interface ElementDefinitionOptions {
  extends: string;
}

interface ElementCreationOptions {
  is: string;
}

interface Window {
  customElements: CustomElementRegistry;
}

interface Document {
  createElement(name: string, options: ElementCreationOptions): HTMLElement;
}

interface HTMLElement extends OnConnectedCallback, OnDisconnectedCallback, OnAdoptedCallback, OnAttributeChangedCallback {
//   // shadow DOM API
  // shadowRoot: HTMLElement,
  // attachShadow( { mode: string } ): HTMLElement,
  // assignedNodes( { flatten }?:{flatten?: boolean} ): NodeList,
  // assignedSlot: string|void,
}

interface HasAttributes {
  readonly observedAttributes: string[]|void;
}

interface OnConnectedCallback {
  connectedCallback(): void;
}

interface OnDisconnectedCallback {
  disconnectedCallback(): void;
}

interface OnAdoptedCallback {
  adoptedCallback(oldDocument: any, newDocument: any): void;
}

interface OnAttributeChangedCallback {
  attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
}

// ShadowDom

interface DocumentOrShadowRoot {
  getSelection(): Selection;
  elementFromPoint(x: number, y: number): Element | null;
  elementsFromPoint(x: number, y: number): Element[];
  caretPositionFromPoint(x: number, y: number): CaretPosition | null;
  readonly activeElement: Element | null;
  readonly styleSheets: StyleSheetList | null;
}

interface Document extends DocumentOrShadowRoot {}
interface ShadowRoot extends DocumentOrShadowRoot {}

interface CaretPosition {}

interface ShadowRoot extends DocumentFragment {
  readonly host: Element;
  innerHTML: string;
}

interface Element {
  attachShadow(shadowRootInitDict: ShadowRootInit): ShadowRoot;
  readonly assignedSlot: HTMLSlotElement | null;
  slot: string;
  readonly shadowRoot: ShadowRoot | null;
}

interface ShadowRootInit {
  mode: ShadowRootMode;
  delegatesFocus?: boolean;  // default false
}

type ShadowRootMode = "open" | "closed";

interface Text {
  readonly assignedSlot: HTMLSlotElement | null;
}

interface HTMLSlotElement extends HTMLElement {
  name: string;
  assignedNodes(options?: AssignedNodesOptions): Node[];
}

interface AssignedNodesOptions {
  flatten?: boolean;  // default false
}

interface EventInit {
  scoped?: boolean;  // default false
}

interface Event {
  deepPath(): EventTarget[];
  readonly scoped: boolean;
}

interface Document {
  createElement(tagName: "slot"): HTMLSlotElement;
}

declare var ShadyCSS: ShadyCSSStatic;
interface ShadyCSSStatic {
  prepareTemplate( template: HTMLTemplateElement, name: string ): void,
  applyStyle(instance:HTMLElement): void,
}


interface HTMLElementTagNameMap {
  "bl-button": BlButton,
}

declare module '*.html';
declare module '*.scss';
declare module '*.css';

// Skate
declare module 'skatejs-web-components';
declare module 'core-js';


// Custom Elements
declare var customElements: CustomElementRegistry;

interface CustomElementRegistry {
  define(
      name: string, constructor: Function,
      options?: ElementDefinitionOptions): void;
  get(name: string): any;
  whenDefined(name: string): Promise<void>;
  forcePolyfill?: boolean
}

interface ElementDefinitionOptions {
  extends: string;
}

interface ElementCreationOptions {
  is: string;
}

interface Window {
  customElements: CustomElementRegistry;
}

interface Document {
  createElement(name: string, options: ElementCreationOptions): HTMLElement;
}

// interface HTMLElement extends OnConnectedCallback, OnDisconnectedCallback, OnAdoptedCallback, OnAttributeChangedCallback {
//   // shadow DOM API
//   shadowRoot: HTMLElement,
//   attachShadow( { mode:string } ): HTMLElement,
//   assignedNodes( { flatten }?:{flatten?: boolean} ): NodeList,
//   assignedSlot: string|void,
// }

interface HasAttributes {
  readonly observedAttributes: string[]|void;
}

interface OnConnectedCallback {
  connectedCallback(): void;
}

interface OnDisconnectedCallback {
  disconnectedCallback(): void;
}

interface OnAdoptedCallback {
  adoptedCallback(oldDocument: any, newDocument: any): void;
}

interface OnAttributeChangedCallback {
  attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
}

// ShadowDom

interface DocumentOrShadowRoot {
  getSelection(): Selection;
  elementFromPoint(x: number, y: number): Element | null;
  elementsFromPoint(x: number, y: number): Element[];
  caretPositionFromPoint(x: number, y: number): CaretPosition | null;
  readonly activeElement: Element | null;
  readonly styleSheets: StyleSheetList | null;
}

interface Document extends DocumentOrShadowRoot {}
interface ShadowRoot extends DocumentOrShadowRoot {}

interface CaretPosition {}

interface ShadowRoot extends DocumentFragment {
  readonly host: Element;
  innerHTML: string;
}

interface Element {
  attachShadow(shadowRootInitDict: ShadowRootInit): ShadowRoot;
  readonly assignedSlot: HTMLSlotElement | null;
  slot: string;
  readonly shadowRoot: ShadowRoot | null;
}


interface Text {
  readonly assignedSlot: HTMLSlotElement | null;
}

interface HTMLSlotElement extends HTMLElement {
  name: string;
  assignedNodes(options?: AssignedNodesOptions): Node[];
}

interface AssignedNodesOptions {
  flatten?: boolean;  // default false
}

interface EventInit {
  scoped?: boolean;  // default false
}

interface Event {
  deepPath(): EventTarget[];
  readonly scoped: boolean;
}

interface Document {
  createElement(tagName: "slot"): HTMLSlotElement;
}
////


interface HTMLElementTagNameMap {
  "bl-button": BlButton,
}

declare class BlButton extends HTMLElement {
  readonly foo: string
}
