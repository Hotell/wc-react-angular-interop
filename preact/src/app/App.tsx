import {h, Component} from 'preact';

import './web-components';
import {Form} from './components';

interface State{}
interface Props{}

export default class App extends Component<Props,State> {
  render() {
    return (
      <div>
        <h1>Hello preact</h1>
        <Form/>
      </div>
    )
  }
}
