import { Component, OnInit, forwardRef } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
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
          (change)="handleChangeSecond($event,myForm)"
          [errorMsg]="erroMsgSecond"
        ></wc-input>
        <i>{{ secondValue }}</i>
      </div>
      
      <div>
        <p>Im registered to ngForm via wrapper</p>
        <label>Say my name:</label>
        <wc-input-wrapper
          required
          name="secondViaWrapper"
          [(ngModel)]="secondValueViaWrapper"        
        ></wc-input-wrapper>
        <i>{{ secondValueViaWrapper }}</i>
      </div>
      <div>
        <p>Im registered to ngForm via ControlValueAccessor override</p>
        <label>Say my value:</label>
        <wc-input
          minlength="5"
          name="third"
          [ngModel]="thirdValue"
          (ngModelChange)="handleThirdChange($event,myForm)"
          [errorMsg]="erroMsgThird"
        ></wc-input>       
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
  secondValueViaWrapper = 'OH NO'
  thirdValue = 'WOT'
  private erroMsgSecond = '';
  private erroMsgThird = '';

  constructor() { }

  ngOnInit() {
  }

  handleChangeSecond( event, form: FormGroup ) {
    this.secondValue = event.detail.value;
    // this wont do anything because custom element is not registered :)
    // this.erroMsgSecond = ((form.controls as any).second as FormControl).errors ? 'Oh no panic!' : ''
  }
  handleThirdChange(event:string, form: FormGroup){
    console.log( event, form );
    this.thirdValue = event;
    this.erroMsgThird = ((form.controls as any).third as FormControl).errors ? 'Oh no panic!' : ''
  }

  handleSubmit( form: FormGroup ) {
    console.log( form.value )
  }

}
