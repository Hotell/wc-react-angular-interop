import { Component, define } from 'skatejs';
import React from './components/jsx';

export class App extends Component {
  static render() {
    return (
      <paper-card hello="World">
        <div slot="title">title Text Goes Here</div>
        <div slot="supporting-text">
          <p>Hello from Card!</p>
          <x-counter count="1"></x-counter>
        </div>
        <div slot="card-actions">
          <paper-button raised={true}>
            Click me!
          </paper-button>
          <a href="(URL or function)">Related Action</a>
        </div>
      </paper-card>
    )
  }
}

define( 'my-app', App );
