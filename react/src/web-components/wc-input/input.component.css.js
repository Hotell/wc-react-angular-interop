const styles = `
*, :after, :before {
  box-sizing: inherit;
}
/*!v3.2.0*/
.o-field {
  position: relative
}

.o-field .c-field--success ~ .c-icon {
  color: #4caf50
}

.o-field .c-field--error ~ .c-icon {
  color: #f44336
}

.o-field .c-field:disabled ~ .c-icon {
  color: #96a8b2
}

.o-field .c-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #96a8b2
}

.o-field--icon-right .c-field + .c-icon {
  right: .5em
}

.o-field--icon-right .c-field {
  padding-right: 2em
}

.o-field--icon-left .c-icon:first-child {
  left: .5em
}

.o-field--icon-left .c-field {
  padding-left: 2em
}

.c-fieldset, .c-fieldset.c-list {
  display: block;
  width: 100%;
  margin: .5em 0;
  padding: 0;
  border: 0
}

.c-fieldset__legend {
  padding: 1em 0;
  padding: .25em 0
}

.c-fieldset__legend, .c-label {
  display: block;
  width: 100%;
  cursor: pointer
}

.c-label {
  padding: 1em 0
}

.c-field {
  display: block;
  width: 100%;
  margin: 0;
  padding: .5em;
  border: 1px solid #96a8b2;
  border-radius: 4px;
  outline: 0;
  background-color: #fff;
  font-family: inherit;
  font-size: 1em;
  font-weight: 400;
  resize: vertical;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none
}

.c-field:focus {
  border-color: #2196f3;
  box-shadow: inset 0 0 0 2px #4dabf5
}

select.c-field {
  cursor: pointer
}

select.c-field:not([multiple]) {
  padding-right: 1em;
  background: url("data:image/png;base64,R0lGODlhDwAUAIABAAAAAP///yH5BAEAAAEALAAAAAAPABQAAAIXjI+py+0Po5wH2HsXzmw//lHiSJZmUAAAOw==") no-repeat 99% 50%
}

.c-field input {
  margin-right: .125em;
  outline: 0;
  font-size: 1em
}

.c-field--label {
  margin: .5em 0 0
}

.c-field--error {
  border-color: #f44336;
  color: #f44336
}

.c-field--success {
  border-color: #4caf50;
  color: inherit
}

.c-field--choice {
  border: 0;
  border-radius: 0;
  background-color: transparent
}

.c-field--disabled, .c-field:disabled, .c-fieldset--disabled .c-field, .c-fieldset:disabled .c-field {
  color: #96a8b2;
  cursor: not-allowed;
  border-color: #96a8b2;
  background-color: #e5eaec
}

.c-field--disabled.c-field--choice, .c-field:disabled.c-field--choice, .c-fieldset--disabled .c-field.c-field--choice, .c-fieldset:disabled .c-field.c-field--choice {
  background-color: transparent
}

.c-field input:disabled {
  color: #96a8b2;
  cursor: not-allowed
}
`;

const hintsStyles = `
/*!v3.2.0*/
.c-hint {
  position: absolute;
  padding: 0 .5em;
  transform: scale(.8);
  transform-origin: top left;
  color: #7b929e;
  font-size: 1em;
  opacity: 0;
  pointer-events: none
}

.c-field:focus ~ .c-hint, .c-hint--static, .c-label__field:focus ~ .c-hint {
  transform: scale(.9);
  opacity: 1
}

.c-hint--success {
  color: #4caf50
}

.c-hint--error {
  color: #f44336
}
`

export default `${styles} ${hintsStyles}`
