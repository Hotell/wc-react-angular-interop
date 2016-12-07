import React, { Component } from 'react';

import { FlagIcon } from './web-components/flag-icon';
import logo from './logo.svg';
import './App.css';
import { Form } from './components/Form';

const If = ( { show, children } ) => {
  return show
    ? <div>{children}</div>
    : null;
};

class App extends Component {

  state = {
    country: 'Czechia',
    countries: [
      'Slovakia',
      'ngParty',
      'Czechia'
    ],
    show: {
      flagIcon: true,
      fancyTabs: true
    },
    childToParentWorks: false,
    childToParentData: undefined
  };

  flagIcon = null;
  fancyTabs = null;

  changeCountry() {
    const { countries } = this.state;
    this.setState( { country: countries[ Math.floor( Math.random() * 3 ) ] } );
  }

  changeAllCountries() {
    const { countries } = this.state;
    this.setState( { countries: [ ...countries.reverse(), countries[ Math.floor( Math.random() * 3 ) ] ] } );
  }

  toggleElement( name ) {
    console.log( name )
    this.setState( {
      show: Object.assign(
        {},
        this.state.show,
        { [name]: !this.state.show[ name ] }
      )
    } )
  }

  componentDidMount() {
    this.flagIcon.allCountries = this.state.countries.slice();
    this.flagIcon.addEventListener( FlagIcon.EVENTS.iconClicked, ( e ) => {
      this.setState( { childToParentWorks: true, childToParentData: e.detail.message } )
    } )
  }

  render() {

    return (
      <section>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <div>
            <button onClick={() => this.toggleElement( 'flagIcon' )}>Toggle Flag Icon</button>
            <button onClick={() => this.toggleElement( 'fancyTabs' )}>Toggle Fancy Tabs</button>
          </div>
          <p style={{ backgroundColor: 'gold' }}>{(
            this.state.childToParentWorks
              ? <b style={{ color: 'red' }}>{this.state.childToParentData}</b>
              : 'no custom event emited!'
          )}</p>
          <If show={this.state.show.flagIcon}>
            <button onClick={this.changeCountry.bind( this )}>change country</button>
            <button onClick={this.changeAllCountries.bind( this )}>change all countries</button>
            <flag-icon
              ref={( el ) => this.flagIcon = el}
              country={this.state.country}
              all-countries={this.state.countries}
            >
              <b>Oh HAI!</b>
            </flag-icon>
          </If>
          <If show={this.state.show.fancyTabs}>
            <fancy-tabs
              ref={( el ) => this.fancyTabs = el}
              background
              hello="World!"
            >
              <button slot="title">Tab 1</button>
              <button slot="title" selected>Tab 2</button>
              <button slot="title">Tab 3</button>
              <section>content panel 1</section>
              <section>content panel 2</section>
              <section>content panel 3</section>
            </fancy-tabs>
          </If>
        </div>
        <div className="o-container o-container--large"><Form/></div>
      </section>
    );
  }
}

export default App;
