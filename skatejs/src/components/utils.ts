import { symbols } from 'skatejs';

export function getShadowRoot( elem ) {
  return elem[ symbols.shadowRoot ];
}
