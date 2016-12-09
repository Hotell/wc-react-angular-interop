import {component, Component} from 'vue';
import * as Vue from 'vue';

type Refs = {
  input: HTMLInputElement
}
type Props = Vue & {
  value?: string,
  label?: string
}
export const MyInput = Vue.component('my-input',{
  props:{
      value:{
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: ''
      }
  },
  mounted(){

  },
  methods: {
    selectAll(event:Event){
      // Workaround for Safari bug
      // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
      setTimeout(function () {
      	(event.target as HTMLInputElement).select()
      }, 0)
    },
    formatValue(this:Props){
      (this.$refs as Refs).input.value = `BOOM ${this.value}`;
    },
    updateValue(value:string){
      this.$emit('input', value)
    },
  },

  template: `
    <div>
      <label v-if="label">{{ label }}</label>
      <input
        type="text"
        ref="input"
        :value="value"
        @input="updateValue($event.target.value)"
        @focus="selectAll"
        @blur="formatValue"
      />
    </div>
  `
});
