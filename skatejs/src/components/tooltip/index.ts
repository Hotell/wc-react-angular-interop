import { define } from 'skatejs';
import { Tooltip } from './Tooltip';
import { overrideMDLTooltip } from './mdl-override';

export { Tooltip } from './Tooltip';

overrideMDLTooltip( window.MaterialTooltip );
define( Tooltip.is, Tooltip );
