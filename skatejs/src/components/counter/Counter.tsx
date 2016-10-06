import * as skate from 'skatejs';
import React from '../../shared/jsx';

const sym = Symbol();

export const Counter = skate.define('x-counter', {
  props: {
    // By declaring the property an attribute, we can now pass an initial value
    // for the count as part of the HTML.
    count: skate.prop.number({ attribute: true }),
    timesClicked: skate.prop.number()
  },
  attached(elem) {
    // We use a symbol so we don't pollute the element's namespace.
    elem[sym] = setInterval(() => ++elem.count, 1000);
  },
  detached(elem) {
    // If we didn't clean up after ourselves, we'd continue to render
    // unnecessarily.
    clearInterval(elem[sym]);
  },
  render(elem) {

    // By separating the strings (and not using template literals or string
    // concatenation) it ensures the strings are diffed indepenedently. If
    // you select "Count" with your mouse, it will not deselect whenr endered.
    // return skate.h('div', 'Count ', elem.count);
    return ([
      <style>
        {`
          b {
            font-size: 40px
          }
          .incrementor {
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        `}
      </style>,
      <div className="foo">
        <div onClick={ elem.handleClick.bind(elem) }>Count: {elem.count}</div>

        <div className="incrementor">
          <paper-button onClick={elem.handleIncrement.bind(elem)}>manually increment</paper-button>
          <b>{elem.timesClicked}</b>
        </div>
      </div>
    ])
  },
  prototype: {
    handleClick( e ){
      console.log( e );
    },
    handleIncrement(e){
      this.timesClicked++;
    }
  }
});
