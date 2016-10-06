import React from '../../components/jsx';
import { Component, define, prop, props, emit } from 'skatejs';
import MDLCheckboxComponent, {MDLCheckboxFoundation} from 'mdl-checkbox';

const styles = require( './checkbox.scss' );

const { ANIM_END_EVENT_NAME } = MDLCheckboxFoundation.strings;

const CheckboxWrapper = ( props, children ) => {
  return (
    <div className="mdl-checkbox-wrapper">
      <div className="mdl-checkbox-wrapper__layout">
        {children}
      </div>
    </div>
  );
};
const CheckboxLabel = ( props, children ) => {
  const { id, for:controlId } = props;
  // const controlId = props['for'];
  return (
    <label className="mdl-checkbox-label" id={id} for={controlId}>{children}</label>
  );
};
const CheckboxSvgBackground = () => (
  <div class="mdl-checkbox__background">
    <svg version="1.1"
         class="mdl-checkbox__checkmark"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24">
      <path class="mdl-checkbox__checkmark__path"
            fill="none"
            stroke="white"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
    </svg>
    <div class="mdl-checkbox__mixedmark"></div>
  </div>
);

export class MDLCheckbox extends Component {

  id: string;
  labelId: string;
  indeterminate: boolean;
  checked: boolean;

  private _nativeCb: HTMLInputElement;
  private _root: HTMLDivElement;
  private _controlId: string;
  private _indeterminateInternal: boolean;
  private _checkedInternal: boolean;
  private _mdlStateClasses: string[];

  // Here we initialize a foundation class, passing it an adapter which tells it how to
  // work with the React component in an idiomatic way.
  private _foundation: MDLCheckboxFoundation;

  static get is() { return 'mdl-checkbox'}

  static get props() {
    return {
      controlId: prop.string( { attribute: 'id' } ),
      labelId: prop.string(),
      indeterminate: prop.boolean( {
        attribute: true,
        set(elem,data){
          elem._indeterminateInternal = data.newValue
        },
        get(elem,data){
          return elem._indeterminateInternal
        }
      } ),
      checked: prop.boolean( {
        attribute: true,
        set(elem,data){
          elem._checkedInternal = data.newValue
        },
        get(elem,data){
          return elem._checkedInternal
        }
      } )
    }
  }

  static created( elem: MDLCheckbox){
    elem._nativeCb = null;
    elem._root = null;
    elem._mdlStateClasses = [];
    elem._foundation = new MDLCheckboxFoundation({
      addClass: (className: string) => {
        console.log( elem._mdlStateClasses );
        elem._mdlStateClasses.push(className)
      },
      removeClass: className => elem._mdlStateClasses = elem._mdlStateClasses.filter(cName=>cName!==className),
      registerAnimationEndHandler: handler => {
        if (elem._root) {
          elem._root.addEventListener(ANIM_END_EVENT_NAME, handler);
        }
      },
      deregisterAnimationEndHandler: handler => {
        if (elem._root) {
          elem._root.removeEventListener(ANIM_END_EVENT_NAME, handler);
        }
      },
      registerChangeHandler: handler => {
        // Note that this could also be handled outside of using the native DOM API.
        // For example, onChange within render could delegate to a function which calls
        // the handler passed here, as well as performs the other business logic. The point
        // being our foundations are designed to be adaptable enough to fit the needs of the host
        // platform.
        if (elem._nativeCb) {
          elem._nativeCb.addEventListener('change', handler);
        }
      },
      deregisterChangeHandler: handler => {
        if (elem._nativeCb) {
          elem._nativeCb.removeEventListener('change', handler);
        }
      },
      getNativeControl: () => {
        if (!elem._nativeCb) {
          throw new Error('Invalid state for operation');
        }
        return elem._nativeCb;
      },
      forceLayout: () => {
        if (elem._nativeCb) {
          elem._nativeCb.offsetWidth;
        }
      },
      isAttachedToDOM: () => Boolean(elem._nativeCb)
    })
  }

  static attached( elem: MDLCheckbox ) {
    elem._foundation.init();
  }
  static detached( elem: MDLCheckbox ){
    elem._foundation.destroy();
  }

  static render( elem: MDLCheckbox ) {
    const { labelId, controlId, checked, indeterminate } = props( elem );
    console.log( props( elem ) );
    return [
      <style>{styles}</style>,
      <CheckboxWrapper>
        <div ref={_ref=>elem._root=_ref} class={`mdl-checkbox ${elem._mdlStateClasses.join(' ')}`}>
          <input
            ref={_ref=>elem._nativeCb=_ref}
            type="checkbox"
            id={controlId}
            class="mdl-checkbox__native-control"
            aria-labelledby={labelId}
            checked={checked}
            indeterminate={indeterminate}
            onChange={evt => {
               props(elem,{
                 checked: elem._nativeCb.checked,
                 indeterminate: false,
               });
               emit(elem,'change');
             }}
          />
          <CheckboxSvgBackground/>
        </div>
        <CheckboxLabel for={controlId} id={labelId}>
          <slot/>
        </CheckboxLabel>
      </CheckboxWrapper>
    ]
  }
}

define( MDLCheckbox.is, MDLCheckbox );
