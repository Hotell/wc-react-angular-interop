import { Component, OnInit, forwardRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule} from '@angular/forms';
import { Input as WcInput } from '../wc-input/input.component';

export const MD_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WcInput),
  multi: true
};

@Component( {
  selector: 'app-form-cmp',
  // providers: [MD_INPUT_CONTROL_VALUE_ACCESSOR],
  template: (`
      <h3>TEMPLATE DRIVEN FORM</h3>
      <form #myForm="ngForm" novalidate (ngSubmit)="handleSubmit(myForm)">
      <pre>{{ myForm.value | json }}</pre>
      <pre>{{ myForm.valid | json }}</pre>
      <div>
        <label for="">ng2 name:</label>
        <input
          type="text"
          placeholder="name"
          name="first"
          required
          [(ngModel)]="firstValue"
        >
        <i>{{ firstValue }}</i>
      </div>
      
      <div>
        <p>Im not registered to ngForm pipeline</p>
        <label>Say my name:</label>
        <wc-input
          required
          name="second"
          [value]="secondValue"
          (change)="handleChange($event)"
          [errorMsg]="'Oh no panic!'"
        ></wc-input>
        <i>{{ secondValue }}</i>
      </div>
      
      <div>
        <p>Im registered to ngForm via wrapper</p>
        <label>Say my value:</label>
        <wc-input-wrapper
          minlength="5"
          [ngModel]="thirdValue" 
          name="third"
        ></wc-input-wrapper>       
        <i>{{ thirdValue }}</i>
      </div>
    
      <button class="c-button" type="submit" [disabled]="!myForm.valid">Submit</button>
    </form>
  `),
} )
export class FormCmpComponent implements OnInit {

  myForm: FormGroup;
  firstValue = 'Hello'
  secondValue = 'World'
  thirdValue = 'WOT'

  constructor() { }

  ngOnInit() {
  }

  handleChange( event ) {
    this.secondValue = event.detail.value
    this.thirdValue = event.detail.value
  }

  handleSubmit( form: FormGroup ) {
    console.log( form.value )
  }

}
