import { define } from 'skatejs';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { FABButton } from './FABButton';

export { Button } from './Button';
export { IconButton } from './IconButton';
export { FABButton } from './FABButton';

define( Button.is, Button );
define( IconButton.is, IconButton );
define( FABButton.is, FABButton );
