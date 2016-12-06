import { forwardRef, Directive, Renderer, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WcInputAccessorDirective),
  multi: true
};

@Directive({
  selector: 'wc-input',
  // TODO: vsavkin replace the above selector with the one below it once
  // https://github.com/angular/angular/issues/3011 is implemented
  // selector: '[ngControl],[ngModel],[ngFormControl]',
  host: {'(change)': 'onChange($event.detail.value)', '(blur)': 'onTouched()'},

  providers:[INPUT_CONTROL_VALUE_ACCESSOR],
})
export class WcInputAccessorDirective implements ControlValueAccessor {

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private _renderer: Renderer, private _elementRef: ElementRef) {}

  writeValue(value: any): void {
    const normalizedValue = value == null ? '' : value;
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

}
