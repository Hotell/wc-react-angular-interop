export const Polymer = window.Polymer;
export function createTemplateFromString( content: string ) {
  const wrapper = document.createElement( 'div' );
  wrapper.innerHTML = content;
  const template = wrapper.firstElementChild.cloneNode(true);
  wrapper.remove();
  return template;
}
