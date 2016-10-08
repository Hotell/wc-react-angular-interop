import { define } from 'skatejs';
import { Checkbox } from './Checkbox';
import { overrideMDLCheckbox } from './mdl-override';

overrideMDLCheckbox( window.MaterialCheckbox );
define( Checkbox.is, Checkbox );

export { Checkbox };
