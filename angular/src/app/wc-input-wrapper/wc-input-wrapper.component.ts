import { Component, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';

const noop = () => {};

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WcInputWrapperComponent),
  multi: true
};

@Component({
  selector:'wc-input-wrapper',
  providers:[INPUT_CONTROL_VALUE_ACCESSOR],
  template:(`
    <wc-input 
      [value]="_value" 
      (change)="handleChange($event)" 
      (blur)="handleBlur($event)" 
      (focus)="handleFocus($event)"
    ></wc-input>
  `)
})
export class WcInputWrapperComponent implements ControlValueAccessor {

  @Input() type: string = 'text';

  @Output('focus')
  get onFocus(): Observable<FocusEvent> {
    return this._focusEmitter.asObservable();
  }

  /** Callback registered via registerOnTouched (ControlValueAccessor) */
  private _onTouchedCallback: () => void = noop;
  /** Callback registered via registerOnChange (ControlValueAccessor) */
  private _onChangeCallback: (_: any) => void = noop;

  private _focused = false;
  private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  private _value: any = '';
  get value(): any { return this._value; };
  set value(v: any) {
    v = this._convertValueForInputType(v);
    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
    }
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  writeValue(value: any) {
    console.log( 'writeValue',value );
    this._value = value;
  }


  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnChange(fn: any) {
    console.log( 'registerOnChange',fn );
    this._onChangeCallback = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnTouched(fn: any) {
    console.log( 'registerOnTouched',fn );
    this._onTouchedCallback = fn;
  }

  private handleChange($event:CustomEvent){
    const newValue = $event.detail.value;
    console.log( 'handleChange',newValue );
    // this._value = newValue;
    this.value = newValue;
  }

  private handleBlur($event: FocusEvent) {
    this._focused = false;
    this._onTouchedCallback();
    this._blurEmitter.emit($event);
  }

  private handleFocus( $event ) {
    this._focused = true;
    this._focusEmitter.emit($event);
  }

  /**
   * Convert the value passed in to a value that is expected from the type of the md-input.
   * This is normally performed by the *_VALUE_ACCESSOR in forms, but since the type is bound
   * on our internal input it won't work locally.
   * @private
   */
  private _convertValueForInputType(v: any): any {
    switch (this.type) {
      case 'number': return parseFloat(v);
      default: return v;
    }
  }

}
