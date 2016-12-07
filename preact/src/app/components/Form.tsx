import { Component, h } from 'preact';

interface Props{}
interface State{
  form?:{
    houseno: string,
    nickname: string
  },
  errors?: {
    [fieldName:string]:any
  },
}
export default class Form extends Component<Props,State> {
  state = {
    form: {
      houseno: '',
      nickname: '',
    },
    errors: {}
  };

  handleSubmit = (event) => {
    const {form} = this.state;
    event.preventDefault();
    console.log( form );
  };
  handleChange = ( event ) => {
    const { value, name, required } = event.target;
    const { form, errors } = this.state;
    console.log( { value, name } );
    if ( !(name in form) ) {
      throw new Error( `"${name}" field is not registered within form` )
    }
    const newFormValue = Object.assign( {}, form, { [name]: value } );
    this.setState( { form: newFormValue }, () => {
      this.validate( name, Boolean( required ) )
    } )
  };

  validate( fieldName: string, required: boolean ) {
    const { form, errors } = this.state;
    const field = form[ fieldName ];

    const newErrorsState = (required && field.length === 0 )
      ? { [fieldName]: 'this field is required' }
      : { [fieldName]: '' };

    this.setState( { errors: newErrorsState } )

  }
  render(props,state){
    const {form,errors} = state;
    return (
       <form noValidate onSubmit={this.handleSubmit}>
        <fieldset className="o-fieldset">
          <legend className="o-fieldset__legend">And all together now!</legend>

          <div className="o-form-element">
            <label className="c-label" for="houseno">
              Address line 1:
              <Badge>native input</Badge>
            </label>
            <input
              name="houseno"
              id="houseno"
              placeholder="House name or number"
              className="c-field"
              onInput={this.handleChange}
              value={form.houseno}
              required
            />
            {errors.houseno && <div className="c-hint c-hint--static c-hint--error">{errors.houseno}</div>}
          </div>
          <div className="o-form-element">
            <label className="c-label" for="nickname">
              Nickname:
              <Badge>web-component</Badge>
            </label>
            <wc-input
              name="nickname"
              id="nickname"
              placeholder="your nickanem pls"
              error-msg={errors.nickname}
              required
              value={form.nickname}
              onChange={this.handleChange}
            />
          </div>
        </fieldset>
        <button className="c-button">Submit</button>
        <hr/>
        <h5 className="c-heading">Form value:</h5>
        <pre className="c-code c-code--multiline">
          {JSON.stringify(form,null,2)}
        </pre>
      </form>
    )
  }
  componentDidMount(){}
}


const Badge = ({children}:{children?:JSX.Element}) => (
  <span className="c-badge c-badge--ghost c-badge--rounded c-badge--info">{children}</span>
);
