import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import './wc-input/input.component';

import { AppComponent } from './app.component';
import { FormCmpComponent } from './form-cmp/form-cmp.component';
import { FormRCmpComponent } from './form-r-cmp/form-r-cmp.component';
import { WcInputWrapperComponent } from './wc-input-wrapper/wc-input-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    FormCmpComponent,
    FormRCmpComponent,
    WcInputWrapperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
