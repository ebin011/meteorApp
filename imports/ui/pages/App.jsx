import React from 'react';
import { Meteor } from 'meteor/meteor';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Tasks } from '../../api/tasks/tasks.js';

import Task from './Task.jsx';
injectTapEventPlugin();
// App component - represents the whole app
export default  class App extends React.Component {


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
