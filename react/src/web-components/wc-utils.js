export function importTemplate(templateString){
  const wrapper = document.createElement('div');
  wrapper.innerHTML = templateString;
  const template = wrapper.querySelector('template');
  const clone = template.content.cloneNode(true);
  applyShadowDOMCss(template);
  return clone;
}

function applyShadowDOMCss(elementTemplate, elementName) {
  if ('ShadyCSS' in window) {
    console.info('applying ShadyCSS!');
    window.ShadyCSS.prepareTemplate(elementTemplate, elementName || elementTemplate.id);
  }
  
}