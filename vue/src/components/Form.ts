import {component} from 'vue';
import * as Vue from 'vue';

export const MyForm = Vue.component('my-form',{
  props:{
    title:{
      type: String,
      default: 'Label'
    }
  },
  template: `
    <form novalidate>
      <fieldset>
        <legend>{{ title }}</legend>
        <slot/>
      </fieldset>
    </form>
  `
});

console.log(MyForm);

