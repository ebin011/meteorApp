
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin()

export default createContainer(() => {
  console.log("working fine");
  return {


  };
}, App);


class App extends React.Component {


  render() {
    return (
      <MuiThemeProvider >
      <div className="container">
        <header>
          <h1>Chat</h1>
        </header>

        <ul>
           <div className="admin">{this.props.children}</div>
        </ul>
      </div>
      </MuiThemeProvider>
    );
  }
}
