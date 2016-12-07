import { FlagIcon } from './flag-icon';

export default function register() {
  window.customElements.define( FlagIcon.is, FlagIcon );
}

export { FlagIcon };
