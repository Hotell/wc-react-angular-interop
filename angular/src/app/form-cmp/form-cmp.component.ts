import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component( {
  selector: 'app-form-cmp',
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
          [value]="secondValue"
          (change)="handleChange($event)"
          [errorMsg]="'Oh no panic!'"
        ></wc-input>
        <i>{{ secondValue }}</i>
      </div>
    
      <button class="c-button" type="submit" [disabled]="!myForm.valid">Submit</button>
    </form>
  `),
} )
export class FormCmpComponent implements OnInit {

  myForm: FormGroup;
  firstValue = 'Hello'
  secondValue = 'World'

  constructor() { }

  ngOnInit() {
  }

  handleChange( event ) {
    this.secondValue = event.detail.value
  }

  handleSubmit( form: FormGroup ) {
    console.log( form.value )
  }

}
