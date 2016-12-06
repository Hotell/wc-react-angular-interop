import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-cmp',
  templateUrl: './form-cmp.component.html',
  styleUrls: ['./form-cmp.component.css']
})
export class FormCmpComponent implements OnInit {

  myForm: any;
  firstValue = 'Hello'
  secondValue = 'World'
  constructor() { }

  ngOnInit() {
  }

  handleChange(event){
    this.secondValue = event.detail.value
  }

  handleSubmit(form:FormControl){
    console.log(form.value)
}

}
