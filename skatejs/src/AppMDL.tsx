import { Component, define, symbols } from 'skatejs';
import React from './shared/jsx';
import { MDLCard } from './components-mdl2/card/Card';
import { MDLCheckbox } from './components-mdl2/checkbox/Checkbox';
import { MDLButton } from './components-mdl2/button/Button';
import { styles as rippleStyles, MDLRipple } from './components-mdl2/ripple/Ripple';

const styles = `
  ${rippleStyles}
  .my-surface {
            width: 200px;
            height: 200px;
            background: grey; /* Google Blue 500 :) */
            border-radius: 2px;
            }
  .demo-surface {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 200px;
            height: 100px;
            padding: 1rem;
            cursor: pointer;
            user-select: none;
            -webkit-user-select: none;
          }

          .demo-surface[data-mdl-ripple-is-unbounded] {
            width: 40px;
            height: 40px;
            padding: 0;
            border-radius: 50%;
          }
  `;

export class AppMDL extends Component {

  static get is() { return 'my-app-mdl' }

  private checkbox: MDLCheckbox;
  private changeEventCount: number;
  private indeterminate: boolean;
  private checked: boolean;

  static created( elem: AppMDL ) {
    elem.changeEventCount = 0;
    elem.indeterminate = false;
    elem.checked = false;
  }

  static attached( elem: AppMDL ) {
    let shadowRoot = elem[ symbols.shadowRoot ];
    const ripples = shadowRoot.querySelectorAll( '.mdl-ripple-surface' );
    Array.from<HTMLElement>( ripples ).forEach( ( surface ) => {
      MDLRipple.attachTo( surface );
    } );

    const surface = shadowRoot.querySelector( '.surface' );
    const ripple = MDLRipple.attachTo( surface );
  }

  static render( elem: AppMDL ) {
    return [
      <style>{styles}</style>,
      <div>
        <h3>MDL 2.0</h3>
        <fieldset>
          <legend>Buttons</legend>
          <MDLButton>Default</MDLButton>
          <MDLButton ripple>Default with ripple</MDLButton>
          <MDLButton raised>Raised</MDLButton>
          <MDLButton raised ripple>Raised with ripple</MDLButton>
          <MDLButton dense>Dense Default</MDLButton>
          <MDLButton dense raised>Dense Raised</MDLButton>
          <MDLButton compact>Compact</MDLButton>
          <MDLButton compact raised>Compact Raised</MDLButton>
          <MDLButton primary>Default with Primary</MDLButton>
          <MDLButton primary raised>Raised with Primary</MDLButton>
          <MDLButton accent>Default with Accent</MDLButton>
          <MDLButton accent raised>Raised with Accent</MDLButton>
        </fieldset>
        <fieldset>
          <legend>Disabled Buttons</legend>
          <MDLButton disabled>Default</MDLButton>
          <MDLButton disabled raised>Raised</MDLButton>
          <MDLButton disabled dense>Dense Default</MDLButton>
          <MDLButton disabled dense raised>Dense Raised</MDLButton>
          <MDLButton disabled compact>Compact</MDLButton>
          <MDLButton disabled compact raised>Compact Raised</MDLButton>
          <MDLButton disabled primary>Default with Primary</MDLButton>
          <MDLButton disabled primary raised>Raised with Primary</MDLButton>
          <MDLButton disabled accent>Default with Accent</MDLButton>
          <MDLButton disabled accent raised>Raised with Accent</MDLButton>
        </fieldset>

        <fieldset>
          <legend>Ripple</legend>
          <div>
            <div class="mdl-ripple-surface my-surface" tabindex="0">Ripples FTW!</div>
            <div class="mdl-ripple-surface mdl-ripple-surface--primary my-surface" tabindex="0">
              Surface with a primary-colored ripple.
            </div>
            <div class="mdl-ripple-surface mdl-ripple-surface--accent my-surface" tabindex="0">
              Surface with an accent-colored ripple.
            </div>
            <h2>Bounded</h2>
            <div class="mdl-ripple surface demo-surface mdl-elevation--z4" tabindex="0">
              Interact with me!
            </div>
            <div class="mdl-ripple-surface demo-surface mdl-elevation--z2" tabindex="0">
              Interact with me!
            </div>
          </div>
          <div>
            <h2>Unbounded</h2>
            <div
              class="mdl-ripple-surface demo-surface material-icons"
              data-mdl-ripple-is-unbounded
              aria-label="Favorite" tabindex="0"
            >
              favorite
            </div>
            <div>
              <h2>Applied to <code>{'<button>'}</code> element</h2>
              <button type="button" class="mdl-ripple-surface mdl-elevation--z2 demo-surface">button</button>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <h3>Card</h3>
          <MDLCard>
            <span slot="title">Hello</span>
            <span slot="subtitle">Subhead</span>
            <p slot="supporting-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.
            </p>
            <div slot="actions">
              <MDLButton primary>Ok</MDLButton>
              <MDLButton>Cancel</MDLButton>
            </div>
          </MDLCard>
        </fieldset>

        <fieldset>
          <div>
            <div>
              {elem.changeEventCount} change events so far
            </div>
            <button onClick={() => (elem.indeterminate = true)}>Make Indeterminate</button>
          </div>
          <legend>Checkbox</legend>
          <MDLCheckbox
            ref={_ref=>elem.checkbox=_ref}
            id="my-checkbox"
            labelId="basic-checkbox-label"
            indeterminate={elem.indeterminate}
            checked={elem.checked}
            onChange={(evt)=>{
              const mdlCheckbox = evt.target;
              const {checked,checkedInternal,indeterminate,indeterminateInternal} = mdlCheckbox;
              elem.changeEventCount++;
              elem.indeterminate = false;
              elem.checked = checkedInternal
            }}
          >
            This is my checkbox. The checkbox is currently {elem.status()}
          </MDLCheckbox>

        </fieldset>

      </div>
    ]
  }

  status() {
    if ( this.indeterminate ) {
      return 'indeterminate';
    }
    return this.checked
      ? 'checked'
      : 'unchecked';
  }
}

define( AppMDL.is, AppMDL );
