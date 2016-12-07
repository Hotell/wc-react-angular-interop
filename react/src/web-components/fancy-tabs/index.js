import { FancyTabs } from './fancy-tabs';

export default function register(){
  window.customElements.define(FancyTabs.is, FancyTabs);
}
