import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component( {
  selector: 'app-form-r-cmp',
  template: (`
    <h3>MODEL DRIVEN FORM</h3>
    <form novalidate [formGroup]="myForm" #f="ngForm">
      <pre>{{ f.value | json }}</pre>
      <div>
        <label>Firstname:</label>
        <input type="text" formControlName="firstname">
      </div>
      <div>
        <label>Lastname:</label>
        <input type="text" formControlName="lastname"/>
        <!--<wc-input type="text" formControlName="lastname"></wc-input>-->
      </div>     
    </form> 
     <section>
       <div>     
          <label for="">wc single control</label>
          <input [formControl]="wcControl">
          <!--THIS DOESNT WORK BECAUSE NG2 PROPRIETARY NG_MODEL IMPLEMENTAION WOOOOOO:-->
          <!--<wc-input formControl="wcControl"></wc-input>-->
          <i>{{ wcControl.value | json }}</i>
       </div>
       <div>
          <label for="">wc single control</label>
          <wc-input [value]="wcControl.value" (change)="handleWcChange($event)"></wc-input>
          <i>{{ wcControl.value | json }}</i>
        </div>
     </section>
  `)
} )
export class FormRCmpComponent implements OnInit {

  myForm: FormGroup;

  wcControl = new FormControl();


  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    this.myForm = new FormGroup( {
      firstname: new FormControl(),
      lastname: new FormControl(),
    } );

    this.wcControl.valueChanges.subscribe(value => {
      // do something with value here
      console.log( value );
    });
  }

  handleWcChange($event){
    const newValue = $event.detail.value;
    console.log( 'newValue', newValue );
    this.wcControl.setValue( newValue )
  }


}
